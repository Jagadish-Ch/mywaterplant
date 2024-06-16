import React, { useState } from 'react'
import '../Styles/SearchBar.css'
import searchIcon from '../ImagesIcon/searchIcon.png';

const SearchBar = (props) => {
  const handleInput =(e)=>{
    props.setOption(e.target.value)
  }
  return (
    <div>
      <div className="searchBox">
        <select className='dropdown searchInput' value={props.Option} onChange={handleInput}>
          <option value='CanNo'>CanNo</option>
          <option value='Date'>Date</option>
          <option value='All'>All</option>
        </select>
        <input className="searchInput" type="text" name="" onChange={props.Filter} placeholder="Search"/>
        
        <button className="searchButton" href="#">
            <i className="material-icons">
            <img className='search-icon' src={searchIcon}></img>
            </i>
        </button>
        </div>
    </div>
  )
}

export default SearchBar
