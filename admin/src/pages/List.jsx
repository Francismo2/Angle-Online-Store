import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import {backendURL} from '../App.jsx'
import { ShopContext } from '../context/ShopContext.jsx';
import { toast } from 'react-toastify';
import Title from '../components/Title.jsx';
import './List.css'
const List = ({token}) => {
  const {toastSuccess, toastError, currency, navigate} = useContext(ShopContext)
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendURL + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products.reverse());
      }
      else {
        toast.error(response.data.message, toastError)
      }
      
      
    } catch (error) {
        console.log(error)
        toast.error(error.message, toastError)
    }
  }

  const removeProduct = async (product_id) => {
    try {
      const response = await axios.post(backendURL + "/api/product/remove", {product_id}, {headers:{token}})
      if (response.data.success) {
        toast.success(response.data.message, {...toastSuccess});
        await fetchList();
      } else {
        toast.error(response.data.message, {...toastError});
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message, toastError)
    }
  }

  const updateProduct = async (product_id) => {
    navigate(`/update/${product_id}`);
  }

  useEffect(() => {
    fetchList()
  }, [])
  return (
    <>
    <div className='title-container'>
      <Title setText={"ALL PRODUCT LIST"}/>
    </div>
    {
      list.length < 1 ? 
      <div className='empty-products-message'>
	      <p>No products found.</p>
      </div>:
      <div className='flex flex-col gap-2 mb-20 list-container'>
        {/* LIST TABLE TITLE */}
        <div className='md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1.2fr] items-center py-1 px-5 border bg-gray-100 text-sm hidethis'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Stk</b>
          <b className='text-center'>Select</b>
        </div>

        {/* PRODUCT LIST */}
        {
          list.map((item, index)=>(
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1.2fr] items-center gap-2 py-1 px-5 border text-sm' key={index}>
              <img className='list-main-img' src={item.images[0]} alt="" />
              <p>{item.product_name}</p>
              <p>{item.category_name}</p>
              <p>{currency}{item.price}</p>
              <p>{item.stock_quantity}</p>
              <div className='select-button'>
                <p onClick={()=> removeProduct(item.product_id)} className='etdte-btn del'>Delete</p>
                <p onClick={()=> updateProduct(item.product_id)} className='etdte-btn edt'>Edit</p>
              </div>
            </div>
          ))
        }
    </div>
    }
    </>
  )
}

export default List
