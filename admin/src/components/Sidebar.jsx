import React, { useState, useContext } from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';
// ICONS
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { PiPackageThin } from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GoChecklist } from "react-icons/go";
import { CiLogout } from "react-icons/ci";
import { LiaUserSolid } from "react-icons/lia";
import Popup from './Popup.jsx';


const Sidebar = ({setToken}) => {
    const {selectButton, hadleSetSelectButton, popupOn, setPopupOn} = useContext(ShopContext);

    const handlePopUp = () => {
      setPopupOn(true);
    }
    
  return (
    <>
    <div className='sidebar-container'>
      <p className='sidebar-top'>AS</p>
      <div className='main-buttons'>
        <NavLink title='Dashboard Page' to='/' onClick={() => {hadleSetSelectButton('dashboard'); }} className={selectButton === 'dashboard' ? 'dashboard-on' : 'dashboard'}><MdOutlineDashboardCustomize className='dash-con'/></NavLink>
        <NavLink title='Order List Page' to='/orders' onClick={() => {hadleSetSelectButton('orders'); }} className={selectButton === 'orders' ? 'orders-on' : 'orders'}><PiPackageThin className='order-icon'/></NavLink>
        <NavLink title='Add Product Page' to='/add' onClick={() => {hadleSetSelectButton('add'); }} className={selectButton === 'add' ? 'add-on' : 'add'}><IoIosAddCircleOutline className='add-icon'/></NavLink>
        <NavLink title='List Products Page' to='/list' onClick={() => {hadleSetSelectButton('list'); }} className={selectButton === 'list' ? 'list-on' : 'list'}><GoChecklist/></NavLink>
        <NavLink title='User List Page' to='/users' onClick={() => {hadleSetSelectButton('users'); }} className={selectButton === 'users' ? 'users-on' : 'users'}><LiaUserSolid /></NavLink>
      </div>
      <button title='Log Out your Account' onClick={handlePopUp} className='logout-button'><CiLogout className='logoutcon'/></button>
    </div>
    {
      popupOn && <Popup setToken={setToken}/>
    }
    </>
  )
}

export default Sidebar
