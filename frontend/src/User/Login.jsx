import React, { useEffect, useState } from 'react'
import "../UserStyles/Form.css"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { removeErrors, removeSuccess } from '../features/user/userSlice';
import { login } from '../features/user/userSlice';
function Login() {
    const [loginEmail,setLoginEmail]=useState("");
    const [loginPassword,setLoginPassword]=useState("");
    const {error,loading,success,isAuthenticated}=useSelector(state=>state.user)
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const loginSubmit=(e)=>{
        e.preventDefault();
        console.log("hello");
        dispatch(login({email:loginEmail,password:loginPassword}))
        
    }
    useEffect(()=>{
        if(error){
            toast.error(error,{position:'top-center',autoClose:3000
                
            })
            dispatch(removeErrors())
        }
    },[dispatch,error])
    useEffect(()=>{
if(isAuthenticated){
    navigate("/")
}
    },[isAuthenticated])
    useEffect(()=>{
if(success){
    toast.success("Login Sucessful",{
        position: 'top-center',
        autoClose:3000
    })
    dispatch(removeSuccess())
}
    },[dispatch,success])
  return (
<div className="form-container container">
<div className="form-content">
    <form action="" className='form' onSubmit={loginSubmit}>
    <h2>Log In</h2>
        <div className="input-group">
                <input type="email" id="" placeholder='Email'  value={loginEmail} onChange={(e)=>{setLoginEmail(e.target.value)}}/>
            </div>
            <div className="input-group">
                <input type="password"  id="" placeholder='Password' value={loginPassword} onChange={(e)=>{setLoginPassword(e.target.value)}}/>
            </div>
            <button className="authBtn">Log In</button>
            <p className="form-links">Forgot your password ? <Link to="/password/forgot">Reset Here</Link></p>
            <p className="form-links">Don't Have an Accout  ? <Link to="/register">Singup Here</Link></p>
    </form>
</div>

</div>
  )
}

export default Login