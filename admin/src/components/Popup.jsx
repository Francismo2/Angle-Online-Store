import React, { useContext} from 'react'
import './Popup.css'
import { IoClose } from "react-icons/io5";
import { ShopContext } from '../context/ShopContext';

const Popup = ({setToken}) => {
  const {setYesButton, setPopupOn} = useContext(ShopContext);
  const handleClosePopup = () => {
    setYesButton(false);
    setPopupOn(false);p
  };
  const handleLogout = () => {
    setToken('');
    setPopupOn(false);
  };
  
  return (
    <div className='dim-bg'>
      <div className='popup-container'>
        <button onClick={handleClosePopup} className='close-btn'><IoClose /></button>
        <div className='popup-question'><p>ARE YOU SURE?</p></div>
          <div className='two-btn'>
            <button onClick={handleLogout} className='pop-btn'>Yes</button>
            <button onClick={handleClosePopup} className='pop-btn'>No</button>
          </div>
      </div>
    </div>
  )
}

export default Popup
