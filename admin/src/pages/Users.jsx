import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import {backendURL} from '../App.jsx'
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import Title from '../components/Title.jsx';
import './Users.css'

const Users = ({token}) => {
  const {toastSuccess, toastError} = useContext(ShopContext)
  const [list, setList] = useState([]);

  const fetchUserList = async () => {
    if (!token) {
      return null
    }
    try {
      const response = await axios.get(backendURL + '/api/list-user/list', {headers: {token}});
      if (response.data.success) {
        setList(response.data.users);
      }
      else {
        toast.error(response.data.message, toastError)
      }
      
      
    } catch (error) {
        console.log(error)
        toast.error(error.message, toastError)
    }
  }

  const removeUser = async (customer_id) => {
    try {
      const response = await axios.post(backendURL + '/api/list-user/remove', {customer_id}, {headers:{token}})
      if (response.data.success) {
        toast.success(response.data.message, {...toastSuccess});
        await fetchUserList();
      } else {
        toast.error(response.data.message, {...toastError});
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message, toastError)
    }
  }

  useEffect(() => {
    fetchUserList()
  }, [token])


  return (
    <>
    <div className='title-container'>
      <Title setText={"USER LIST"}/>
    </div>
    {
      list.length < 1 ? 
      <div className='empty-userlist-message'>
        <p>There are currently no other client accounts.</p>
      </div> :
      
      <div className='flex flex-col gap-2 mb-20 list-container'>
        {/* LIST TABLE TITLE */}
        <div className='md:grid grid-cols-[1fr_1fr_1fr_1fr] items-center py-5 px-4 border bg-gray-100 text-sm hidethis'>
          <b>Username</b>
          <b>Email</b>
          <b>Date Created</b>
          <b className='text-center'>Select</b>
        </div>

        {/* PRODUCT LIST */}

        {
          list.map((item, index)=>(
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr] items-center gap-2 py-5 px-4 border text-base' key={index}>
              <p>{item.user_name}</p>
              <p>{item.email}</p>
              <p>{item.created_at}</p>
              <div className='select-button'>
                <p onClick={()=> removeUser(item.customer_id)} className='del'>Delete</p>
              </div>
            </div>
          ))
        }
    </div>
    }
    </>
  )
}

export default Users
