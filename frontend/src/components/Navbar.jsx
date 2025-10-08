import React, { useState } from 'react'
import "../componentStyles/Navbar.css"
import { Link } from 'react-router-dom'
import SearchIcon from "@mui/icons-material/Search"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import CloseIcon from "@mui/icons-material/Close"
import MenuIcon from "@mui/icons-material/Menu"
import { ShoppingCart } from '@mui/icons-material'
function Navbar() {
    const [isMenuOpen,setIsMenuOpen]=useState(false);
    const toggleMenu=()=>setIsMenuOpen(!isMenuOpen);
    const isAuthenticated=true;
  return (
  <nav className="navbar">
    <div className="navbar-container">
        <div className="navbar-logo">
           <Link to="/" onClick={()=>setIsMenuOpen(false)}>ShopEasy</Link>
        </div>
        <div className={`navbar-links ${isMenuOpen?`active`:""}`}>
            <ul>
                <li onClick={()=>setIsMenuOpen(false)}><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/contact-us">Contact Us</Link></li>
            </ul>
        </div>
        <div className="navbar-icons">
            {/* <div className="search-container">
                <form className='search-form'>
                    <input type="text" 
                    className='search-input'
                    placeholder='Search products'
                    />
                    <button className='search-icon'>
                        <SearchIcon focusable="false"/>
                    </button>
                </form>
            </div> */}
            <div className="cart-container">
                <Link to="/cart">
                <ShoppingCart className='icon'/>
                <span className='cart-badge'>2</span></Link>
            </div>
            {!isAuthenticated && <Link to="/register" className='register-link'>
            <PersonAddIcon className="icon"/>
            </Link>}
            <div className="navbar-hamburger "onClick={toggleMenu}>
              {isMenuOpen?  <CloseIcon className='icon'/>:
              <MenuIcon className='icon'/>}
            </div>
        </div>
    </div>
  </nav>
  )
}

export default Navbar