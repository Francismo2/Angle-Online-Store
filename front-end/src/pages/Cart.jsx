import React, {useContext, useState, useEffect} from 'react'
import { ShopContext } from '../context/ShopContext';
import MainTitle from '../components/MainTitle.jsx';
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import './Cart.css';
import OurPolicy from '../components/OurPolicy.jsx';
import Infos from '../components/Infos.jsx';
import Footer from '../components/Footer.jsx';
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify";

function Cart() {
  const {products, currency, cartItems, updateQuantity, showCartContent, setShowCartContent, totalProductPrice, getTotalProductPrice, navigate, token, toastError} = useContext(ShopContext)
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for(const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              product_id: items,
              size: item, 
              quantity: cartItems[items][item],
            })
            setShowCartContent(true);
          }
          else {
            setShowCartContent(false);
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  useEffect(() => {
    // CALCULATE TOTAL PRICE
    let price = 0;
    cartData.forEach(item => {
        const productData = products.find(product => product.product_id === item.product_id);
        price += productData.price * item.quantity;
    });
    getTotalProductPrice(price);
  }, [cartData, products]);


  // MINIMUM BUTTON
  const handleDecrease = (itemId, size, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, size, currentQuantity - 1);
    }
  };

  // MAXIMUM BUTTON
  const handleIncrease = (itemId, size, currentQuantity, maxStock) => {
    if (currentQuantity < maxStock) {
      updateQuantity(itemId, size, currentQuantity + 1);
    }
  };

  const hadleCheckout = async () => {
    if (token) {
      navigate('/place-order')
    }
    else {
      toast.error("You must log in to proceed with the checkout.", {...toastError});
      navigate('/login');
    }
  }

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <div className='pt-14'>
        <div className='text-2xl'>
          <MainTitle mtext1={'YOUR'} mtext2={'CART'}/>
        </div>
        {/* EMPTY CART */}
        {!showCartContent && (
          <div className='empty-cart-message'>
            <p>No items in your cart.</p>
          </div>
        )}
        {/* ACTIVE CART */}
        {showCartContent && (
          <>

            <div>
              {
                cartData.map((item, index) => {
                  const productData = products.find((product) => product.product_id === item.product_id);
                  if (!productData?.is_active) {
                    updateQuantity(item.product_id, item.size, 0);
                  }
                  return (
                    <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.1fr] sm:grid-cols-[4fr_0.1fr] gap-4 mb-2'>
                      <div className='flex items-start gap-6'>
                          <NavLink className='cursor-pointer' to={`/product/${item.product_id}`}>
                            <img className='cart-product-img' src={productData.images?.[0] || 'default-image.jpg'} alt={productData?.product_name || 'Product Image' }/>
                          </NavLink>
                          <div>
                            <p className='text-xs sm:text-base font-medium'>{productData.product_name}</p>
                            <div className='flex items-center gap-2'>
                              <p className='text-xs sm:text-sm font-light'>Size: {item.size}</p>
                            </div>
                            <div className='qd-container'>
                              <div className="quantity-controls-cart">
                                <button onClick={() => handleDecrease(item.product_id, item.size, item.quantity)} className="quantity-btn-cart"><FiMinus className='minus-cart'/></button>
                                <input
                                  onChange={(e) => {
                                    const value = Number(e.target.value);
                                    if (isNaN(value) || value <= 0) return;
                                    if (value > productData.stock_quantity) {
                                      updateQuantity(item.product_id, item.size, productData.stock_quantity);
                                    } else {
                                      updateQuantity(item.product_id, item.size, value);
                                    }
                                  }}
                                  type="number"
                                  value={item.quantity}
                                  className="quantity-input-cart"
                                  min={1}
                                  max={productData.stock_quantity}
                                />

                                <button onClick={() => handleIncrease(item.product_id, item.size, item.quantity, productData.stock_quantity)} className="quantity-btn-cart"><FiPlus className='plus-cart'/></button>
                              </div>
                              <RiDeleteBinLine onClick={() => updateQuantity(item.product_id, item.size, 0)} className='cart-delete'/>
                            </div>
                          </div>
                      </div>
                      <div className='cart-right-functions'>
                        <p className='cart-price'>Price: {currency}{productData.price}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </>
        )}
        <div className={`${showCartContent ? 'checkout-container' : 'hidden'}`}>
          <p className='checkout-total-price'>Total Price: {currency}{totalProductPrice.toFixed(2)}</p>
          <div className='checkout-buttons'>
            <button onClick={()=> hadleCheckout()} className='cart-button-checkout'>CHECKOUT</button>  
          </div>   
        </div>
      </div>
      <OurPolicy/>
      <Infos/>
      <Footer/>
    </div>
  )
}

export default Cart
