import Customer from "../models/customers.js"


// ADD PRODUCT TO USER CART
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        const userData = await Customer.findByPk(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; 

        

        // Update the cart data
        if (cartData[itemId] && cartData[itemId][size]) {
            cartData[itemId][size] += quantity;
        } else {
            if (!cartData[itemId]) {
                cartData[itemId] = {};
            }
            cartData[itemId][size] = quantity;
        }

        // Force Sequelize to recognize the change
        userData.cartData = cartData;
        userData.changed('cartData', true);

        await userData.save();
        res.json({ success: true, message: "Added to cart" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// UPDATE USER CART
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        const userData = await Customer.findByPk(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (quantity === 0) {
            delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        }
        else {
            cartData[itemId][size] = quantity;
        }

        // Update the user's cart data
        userData.cartData = cartData;
        userData.changed('cartData', true);

        await userData.save();
        res.json({ success: true, message: "Added to cart" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// GET USER CART
const getUserCart = async (req, res) => {
    try {
        const {userId} = req.body;
        const userData = await Customer.findByPk(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        res.json({success: true, cartData});

    } catch (error) {
        console.log(error);
        res.json({success: true, message: error.message});
    }
}

export {addToCart, updateCart, getUserCart}