import Order from "../models/orders.js";
import Customer from "../models/customers.js";
import Product from "../models/product.js";

// (USER) PLACING ORDER USING COD METHOD
const placeOrder = async (req, res) =>{

    try {
        const {userId, items, total_amount, address} = req.body;
        const orderData = {
            customer_id: userId,
            items,
            address,
            total_amount,
            payment_method: "COD",
            payment: false,
            order_date: Date.now()
        }
        const newOrder = await Order.create(orderData);
        await newOrder.save();

        // Update product stock
        for (const item of items) {
          const product = await Product.findByPk(item.product_id);

          if (!product) {
            throw new Error(`Product not found: ID ${item.product_id}`);
          }

          if (product.stock_quantity < item.quantity) {
            throw new Error(`Insufficient stock for product ID: ${item.product_name}`);
          }

          // Reduce stock quantity
          product.stock_quantity -= item.quantity;
          if(product.stock_quantity === 0) {
            product.is_active = false;
          }
          await product.save();
        }

        const userData = await Customer.findByPk(userId);
        if (userData) {
          userData.set("cartData", {}); // Clear cart
          await userData.save();
        }

        res.json({success: true, message: "Order Placed"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

// (USER) LIST OF ALL USER ORDERS
const userOrders = async (req, res) =>{
    try {
        const {userId} = req.body
        const orders = await Order.findAll({ where: { customer_id: userId } }); 
        res.json({success:true, orders})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

const userOrderInfo = async (req, res) => {
  try {
      const { userId } = req.body;
      const customer = await Customer.findOne({
        where: { customer_id: userId },
        attributes: ['email'],
      });
  
      const orders = await Order.findOne({
        where: { customer_id: userId },
        order: [['order_date', 'DESC']],
      });

      // If no customer is found
      if (!customer) {
        return res.json({ success: false, message: 'Customer not found' });
      }

      // If no orders are found
      if (!orders) {
        return res.json({ success: true, orders: null, email: customer.email });
      }

      // If both customer and orders are found
      return res.json({ success: true, orders, email: customer.email });
      
  } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
  }
};

const cancelOrder = async (req, res) => {
    try {
      const { orderId, productId, size} = req.body; // Ensure the data is properly received
  
      // Find the order by orderId
      const order = await Order.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
  
      // Parse the items if stored as a JSON string
      let items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
  
      // Filter and calculate canceled amount
      let canceledAmount = 0;
      const updatedItems = [];

      for (const item of items) {
        if (item.product_id === productId && item.size === size) {
            // Find the product and restore stock for the correct size
            const product = await Product.findByPk(productId);
            if (product) {
                // Check if the size exists in the product's available sizes
                const sizeIndex = product.sizes.findIndex(s => s === size);
                if (sizeIndex !== -1) {
                    // Update the stock based on the quantity for the specific size
                    const canceledQuantity = item.quantity;
                    product.stock_quantity += canceledQuantity;

                    // Reactivate the product if stock quantity is greater than zero
                    if (product.stock_quantity > 0) {
                        product.is_active = true;
                    }

                    // Save the updated product stock
                    await product.save();
                }
            }
            canceledAmount += item.price * item.quantity; // Add the price * quantity of the canceled item
        } else {
            updatedItems.push(item); // Keep the other items in the order
        }
    }
      
      // for (const item of items) {
      //   if (item.product_id === productId) {
      //       // Find the product and restore stock
      //       const product = await Product.findByPk(productId);
      //       if (product) {
      //           product.stock_quantity += item.quantity;
      //           if (product.stock_quantity > 0) {
      //               product.is_active = true; // Reactivate the product if stock becomes available
      //           }
      //           await product.save();
      //       }
      //       canceledAmount += item.price * item.quantity;
      //   } else {
      //       updatedItems.push(item);
      //   }
      // }
  
      if (updatedItems.length === items.length) {
        return res.status(400).json({ success: false, message: 'Product not found in order' });
      }
  
      // Update the total amount
      order.total_amount -= canceledAmount;
  
      // Check if no items remain, delete the order
      if (updatedItems.length === 0) {
        await order.destroy();
        return res.json({ success: true, message: 'Order canceled and deleted successfully' });
      }
  
      // Update the order's items field and save it
      order.items = updatedItems; // Save as JSON string if required
      await order.save();
  
      res.json({ success: true, message: 'Order item canceled successfully', updatedOrder: order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderId, productId } = req.body; 


    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }


    let items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;


    let canceledAmount = 0;
    const updatedItems = items.filter((item) => {
      if (item.product_id === productId) {
        canceledAmount += item.price * item.quantity;
        return false; 
      }
      return true; 
    });

    if (updatedItems.length === items.length) {
      return res.status(400).json({ success: false, message: 'Product not found in order' });
    }

    
    order.total_amount -= canceledAmount;


    if (updatedItems.length === 0) {
      await order.destroy();
      return res.json({ success: true, message: 'Order canceled and deleted successfully' });
    }


    order.items = updatedItems; 
    await order.save();

    res.json({ success: true, message: 'Order item canceled successfully', updatedOrder: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// (ADMIN) ALL ORDERS
const allOrders = async (req, res) =>{
    try {
        const orders = await Order.findAll({});
        res.json({success: true, orders})
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}


// (ADMIN) UPDATING ORDER STATUS
const updateStatus = async (req, res) =>{
    try {
        const {orderID, status} = req.body
        await Order.update(
            {status: status},
            {
              where: { order_id: orderID },
            }
        )
        res.json({success: true, message: 'Status Updated'})

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// (ADMIN) DELETE ORDER HISTORY
const admDeleteOrder = async (req, res) => {
  try {
    const { orderID } = req.body;
    // Ensure the order exists before attempting to delete
    const order = await Order.findByPk(orderID);

    if (!order) {
      return res.json({ success: false, message: 'Order not found' });
    }

    // Deleting the order
    await Order.destroy({
      where: { order_id: orderID }
    });

    res.json({ success: true, message: 'Order remove successfully' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export {placeOrder, allOrders, userOrders, updateStatus, cancelOrder, userOrderInfo, admDeleteOrder, deleteOrder}