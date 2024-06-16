import React from 'react';
import '../Styles/Home.css';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate=useNavigate();
  return (
    <div>
      <div className='home-title'>
          <marquee behavior='scroll'
          scrollamount='8'
          width='100%'
          direction='left'
          height='100px'
          ><h1 className='home-text-shadow'><span>&#9827;</span> Sri Vigneswara Water Plant <span>&#9827;</span> </h1></marquee>
      </div>
      
      <div>
        <div className='empty-space'>
        <div className='btns center-box'>
          <button className='default btn-15' onClick={()=>navigate("/order")}>Order</button>
          <button className='default btn-15' onClick={()=>navigate("/returncan/:id")}>Return Can</button>
          <button className='default btn-15' onClick={()=>navigate("/report/:id")}>Report</button>
          <button className='default btn-15' onClick={()=>navigate("/pending")}>Pending</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
