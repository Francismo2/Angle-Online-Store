import React, {useContext} from 'react'
import './Dashboard.css'
import Title from '../components/Title'
import { NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx';
import Popup from '../components/Popup.jsx';
// ICONS
import { PiPackageThin } from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GoChecklist } from "react-icons/go";
import { CiLogout } from "react-icons/ci";
import { LiaUserSolid } from "react-icons/lia";
const Dashboard = ({setToken}) => {
    const {setSelectButton, popupOn, setPopupOn} = useContext(ShopContext);
    
    const handlePopUp = () => {
      setPopupOn(true);
    }

  return (
    <div className='dash-container'>
      <Title setText={'DASHBOARD'}/>
      <div className="dash-contents">
        <div className='OAL-container'>
          <div className="una">
          <NavLink onClick={() => {setSelectButton('orders'); }} to='/orders' className='redirect-con' title='Order List Page'>
            <div className='circle-con'><PiPackageThin/></div>
            <p className="button-text">Order List</p>
          </NavLink>
          <NavLink onClick={() => {setSelectButton('add'); }} to='add' className='redirect-con' title='Add Product Page'>
            <div className='circle-con'><IoIosAddCircleOutline/></div>
            <p className="button-text">Add Product</p>
          </NavLink>
          </div>
          <div className="pangalawa">
          <NavLink onClick={() => {setSelectButton('list'); }} to='/list' className='redirect-con' title='List Products Page'>
            <div className='circle-con'><GoChecklist/></div>
            <p className="button-text">List Products</p>
          </NavLink>
          <NavLink onClick={() => {setSelectButton('users'); }} to='/users' className='redirect-con' title='User List Page'>
              <div className='circle-con'><LiaUserSolid /></div>
              <p className="button-text">User List</p>
          </NavLink>
          </div>
        </div>
        <button onClick={handlePopUp} className='logout-but' title='Log Out your Account'><CiLogout className='log-con'/><p className="button-text">LOGOUT</p></button>
      </div>
      {
        popupOn && <Popup setToken={setToken}/>
      }
    </div>
  )
}

export default Dashboard
