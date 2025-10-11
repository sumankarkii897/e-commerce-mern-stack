import React, { useState } from 'react'
import "../UserStyles/UserDashboard.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout, removeSuccess } from '../features/user/userSlice';
import { toast } from 'react-toastify';
function UserDashboard({user}) {
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const [menuVisible,setMenuVisible]=useState(false)
    function toggleMenu(){
        setMenuVisible(!menuVisible)
    }
    const options=[
        {name:"Orders",funName:orders},
        {name:"Account",funName:profile},
        {name:"Logout",funName:logoutUser},

    ]
    
    if(user.role==="admin"){
        options.unshift({
            name:"Admin Dashboard",funName:dashboard
        })
    }
    function dashboard(){
        navigate("/admin/dashboard")
    }
    function orders(){
navigate("/orders/user")
    }
    function profile(){
navigate("/profile")

    }
    
    function logoutUser(){
dispatch(logout())
.unwrap()
.then(()=>{
    toast.success("Logout Successful ",{
        position:'top-center',
        autoClose:3000
    })
    dispatch(removeSuccess(
        navigate("/login")
    ))
    
})
.catch((error)=>toast.error(error.message || "Logout failed",{
    position:'top-center',
    autoClose:3000
}))
    }
    
  return (
    <>
    <div className={`overlay ${menuVisible?'show':""}`}></div>
    <div className="dashboard-container" onClick={toggleMenu}>
        <div className="profile-header" onClick={toggleMenu}>
            <img src={user.avatar.url?user.avatar.url:"./images/profile.jpg"} alt="Profile picture" className='profile-avatar'/>
            <span className="profile-name">{user.name || "User"}</span>
        </div>
       { menuVisible && (<div className="menu-options">
          { options.map((item,index)=>( <button className="menu-option-btn"key={index} onClick={item.funName}>{item.name}</button>))}
        </div>)}
    </div>
    </>
  )
}

export default UserDashboard