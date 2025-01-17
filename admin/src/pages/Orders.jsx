import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios'
import { backendURL } from '../App';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import './Orders.css'
import Title from '../components/Title';

const Orders = ({token}) => {
  const [orders, setOrders] = useState([]);
  const {toastSuccess, toastError, currency} = useContext(ShopContext);
  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(backendURL + '/api/order/list', {}, {headers: {token}});
      if (response.data.success) {
        
        setOrders(response.data.orders.reverse())   
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async(event, orderID) => {
    try {
      const response = await axios.post(backendURL + "/api/order/status", {orderID, status:event.target.value}, {headers: {token}})
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
    }
  }

  const removeHandler = async (orderID) => {
    try {
      const response = await axios.post(backendURL + "/api/order/remove-adm", {orderID}, {headers: {token}})
      if (response.data.success) {
        toast.success(response.data.message, {...toastSuccess})
        setOrders((prevOrders) => prevOrders.filter(order => order.order_id !== orderID));
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
    }
  }

  useEffect(()=> {
    fetchAllOrders();
  }, [token])
  return (
    <div>
      <div className='title-container'>
        <Title setText={"ORDER PAGE"}/>
      </div>
      {
        orders.length < 1 ? 
        <div className='empty-orders-message'>
          <p>You have no orders yet.</p>
        </div> :
        <div className='order-container'>
          {
            
            orders.map((order, index)=>(
              <div className='grid grid-cols-1  sm:grid-cols-[0.5fr_2fr_2fr]  lg:grid-cols-[2fr_1fr_1fr_0.8fr] gap-3 items-start p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 child-container' key={index}>
                <div>
                  <div>
                    {
                      order.items.map((item, index) => {
                        if (index === order.items.length - 1) {
                          return (
                            <div key={index} className='order-item-container'>
                              <img className='w-20' src={item.images[0]} alt="" />
                              <p>{item.product_name} x {item.quantity} <span>{item.size}</span></p>
                            </div>
                          )
                        }
                        else {
                          return (
                            <div key={index} className='order-item-container'>
                              <img className='w-20' src={item.images[0]} alt="" />
                              <p>{item.product_name} x {item.quantity} <span>{item.size}</span></p>
                            </div>
                          )
                        }
                      })
                    }
                  </div>
                </div>
                <div className='two-row-container'>
                  <div>
                  <p className='mb-3 client-items'>Items: {order.items.length}</p>
                  <p>Payment Method: {order.payment_method}</p>
                  <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                  <p>Date: {new Date(order.order_date).toLocaleDateString()}</p>
                  </div>
                  <div className='loc-info'>
                    <p className='mb-3 client-name'>{order.address.firstName + " " + order.address.lastName}</p>
                    <p>{order.address.street + ","}</p>
                    <p>{order.address.barangay + ", " + order.address.city + ", " +  order.address.province + ", " + order.address.country + ", " + order.address.zip_code}</p>
                    <p>{order.address.phone}</p>
                    <p>{order.address.email}</p>
                </div>
                </div>
                
                <p className='price'>{currency}{order.total_amount}</p>
                <select onChange={(event)=> statusHandler(event, order.order_id)} value={order.status} className='p-2 font-semibold drop-down-status'>
                  <option value="Pending">Pending</option>
                  <option value="Packing">Packing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled Order">Cancelled Order</option>
                </select>
                {order.status === "Delivered" || order.status === "Cancelled Order" ? 
                  <button onClick={()=> removeHandler(order.order_id)} className='cls-order'>Remove</button> : ''
                }
              </div>
            ))
          }
      </div>
      }
      
    </div>
  )
}

export default Orders
