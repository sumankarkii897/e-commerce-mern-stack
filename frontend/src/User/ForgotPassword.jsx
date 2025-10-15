import React, { useEffect, useState } from 'react'
import "../UserStyles/Form.css"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { toast } from 'react-toastify'
import { forgotPassword, removeErrors, removeSuccess } from '../features/user/userSlice'
import Loader from "../components/Loader"
function ForgotPassword() {
    const {loading,error,success,message}=useSelector(state=>state.user)
   const [email,setEmail]=useState("")
   const dispatch=useDispatch()
   const navigate=useNavigate()
   const forgotPasswordEmail=(e)=>{
    e.preventDefault()
    const myForm=new FormData()
    myForm.set("email",email)
    dispatch(forgotPassword(myForm))
    setEmail("")
   }
   useEffect(()=>{
if(error){
    toast.error(error,{
        position:"top-center",
        autoClose:3000
    })
    dispatch(removeErrors())
}
   },[dispatch,error])
   useEffect(()=>{
    if(success){
        toast.success(message,{
            position:"top-center",
            autoClose:3000
            
        })
        navigate("/")
        dispatch(removeSuccess())
    }
    
   },[dispatch,success])
  return (
    <>
    
    {loading ? (<Loader/>) :(  <>
      
      <Navbar/>
        <div className="form-container container">
   <div className="form-content">
       <form action="" className='form'  onSubmit={forgotPasswordEmail}>
       <h2>Forgot Password</h2>
       
          
               <div className="input-group">
                   <input type="email"  id="" placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
               </div>
             
              
               <button className="authBtn">Send</button>
               
       </form>
   </div>
   
   </div>
   <Footer/>
      </>)}
    </>
  )
}

export default ForgotPassword