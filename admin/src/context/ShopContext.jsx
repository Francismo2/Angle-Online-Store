import React, {createContext, useEffect, useState} from 'react';
export const ShopContext = createContext();
import { Bounce} from "react-toastify";
import { TbCurrencyPeso } from "react-icons/tb";
import './ShopContext.css'
import {useNavigate} from 'react-router-dom'
const ShopContextProvider = (props) => {
    const currency = <TbCurrencyPeso className="peso-sign"/>; 
    const [selectButton, setSelectButton] = useState(localStorage.getItem('selectButton') || 'dashboard');
    const [yesButton, setYesButton] = useState(false);
    const [popupOn, setPopupOn] = useState(false);
    const [productItem, setProductItem] = useState({});
    const navigate = useNavigate();
    
    const toastSuccess = { 
      position: "top-center", autoClose: 3000, hideProgressBar: true, closeOnClick: false, pauseOnHover: false, draggable: true, progress: 0, theme: "light", transition: Bounce
    }
    const toastError = {
      position: "top-center", autoClose: 3000, hideProgressBar: true, closeOnClick: false, pauseOnHover: false, draggable: true, progress: 0, theme: "light", transition: Bounce
    }

    const hadleSetSelectButton = (value) => {
      setSelectButton(value);
      localStorage.setItem('selectButton', value);
    };

    // SABABA KA PALAGI
    const value = {selectButton, hadleSetSelectButton, toastSuccess, toastError, yesButton, setYesButton, popupOn, setPopupOn, currency, productItem, setProductItem, navigate}
  return (
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
