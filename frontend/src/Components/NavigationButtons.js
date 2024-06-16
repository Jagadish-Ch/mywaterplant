import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../Styles/Styles.css'
import menubaricon from '../ImagesIcon/menubaricon.png'
import cansIcon from '../ImagesIcon/cansIcon.png'
import FinalReport from './FinalReport';


const NavigationButtons = () => {
  
  const [isDisplay, setIsDisplay] = useState('block');
  const openNavBtns =()=>{
    
    const menuBar=document.getElementById('menuBar');
    setTimeout(() => {
      menuBar.style.display=isDisplay;
    }, 240);
    
    if(isDisplay=='block'){
      setIsDisplay('none')
      
    }
    else{
      setIsDisplay('block')
    }
  }
  const navigate=useNavigate();
  return (  
    <div>
    <div className='nav-bar nav-menu'>
      <div className='logo'>
        <img className="cans-icon" src={cansIcon}/>
      </div>
      <div className='nav-bar-btns' id='menuBar'>
        <button className='custom-btn btn-16' onClick={()=>navigate("/Home")}>Home</button>
        <button className='custom-btn btn-16' onClick={()=>navigate("/order")}>Order</button>
        <button className='custom-btn btn-16' onClick={()=>navigate("/returncan/:id")}>Return Can</button>
        <button className='custom-btn btn-16' onClick={()=>navigate("/report/:id")}>Report</button>
        <button className='custom-btn btn-16' onClick={()=>navigate("/pending")}>Pending</button>
      </div>
      <div className='menu'>
        <button className='menu-btn'><img className="menu-icon" src={menubaricon} onClick={openNavBtns}/></button>
      </div>
      
    </div>
    <FinalReport/>
    </div>
  );
}

export default NavigationButtons;
