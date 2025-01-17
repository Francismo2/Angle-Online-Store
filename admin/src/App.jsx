import React, { useEffect, useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import './App.css'
import Dashboard from './pages/Dashboard.jsx'
import Add from './pages/Add.jsx'
import Orders from './pages/Orders.jsx'
import List from './pages/List.jsx'
import Login from './components/Login.jsx'
import Update from './pages/Update.jsx'
import { ToastContainer} from 'react-toastify';
import Users from './pages/Users.jsx'
export const backendURL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')

  useEffect(()=> {
    localStorage.setItem('token', token);
  }, [token])
  
  return (
    <div className='app-container'>
      <ToastContainer/>
      {
        token === "" ? <Login setToken={setToken}/> 
        : 
        <>
          <div className='flex w-full'>
            <Sidebar setToken={setToken}/>
          <div className='w-[100%] mx-auto ml-[max(5vw, 25px)] '>
            <Routes>
              <Route path="*" element={<Dashboard />} />
              <Route path='/' element={<Dashboard setToken={setToken}/>}/>
              <Route path='/orders' element={<Orders token={token}/>}/>
              <Route path='/add' element={<Add token={token}/>}/>
              <Route path='/list' element={<List token={token}/>}/>
              <Route path='/update/:product_id' element={<Update token={token}/>}/>
              <Route path='/users' element={<Users token={token}/>}/>
            </Routes>
          </div>
        </div>
        </>
      }
      
    </div>
  )
}

export default App

