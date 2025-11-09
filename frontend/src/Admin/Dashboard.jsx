import React from 'react'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import "../AdminStyles/Dashboard.css"
import { AddBox, Dashboard as DashboardIcon, Inventory } from '@mui/icons-material'
import { Link } from 'react-router-dom'
function Dashboard() {
  return (
    <>
    <PageTitle title="Admin Dashboard"/>
    <Navbar/>
    <div className="dashboard-container">
        <div className="sidebar">
            <div className="logo">
                <DashboardIcon className='logo-icon'/>
                Admin Dashboard
                 </div>
                <nav className="nav-menu">
                    <div className="nav-section">
                        <h3>Products</h3>
                        <Link to={"/admin/products"}><Inventory className='nav-icon'/>All Products</Link>
                        <Link to={"/admin/products/create"}><AddBox className='nav-icon'/>create Products</Link>
                    </div>
                </nav>
           
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Dashboard