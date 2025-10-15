import React, { useEffect, useState } from 'react'
import "../UserStyles/Form.css"
import PageTitle from '../components/PageTitle'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeSuccess, resetPassword } from '../features/user/userSlice'
import { toast } from 'react-toastify'
import { removeErrors } from '../features/products/productSlice'
function ResetPassword() {
    const {loading,error,success}=useSelector(state=>state.user)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    // console.log(useParams());
    const {token}=useParams()
    
    const resetPasswordSubmit=(e)=>{
        e.preventDefault()
        const data={
           password,
            confirmPassword
        }
        // console.log(data);
        dispatch(resetPassword({token,userData:data}))
    }
    useEffect(()=>{
        if(error){
            toast.error(error,{
                position:'top-center',
                autoClose:3000
            })
            dispatch(removeErrors())
        }
    },[dispatch,error])
    useEffect(()=>{
if(success){
    toast.success("Password Reset Successful",{
        position: 'top-center',
        autoClose:3000
    }
    )
    dispatch(removeSuccess())
    navigate("/login")
}
    },[dispatch,success])
  return (
<>
<PageTitle title="Reset Password"/>
    <div className="form-container container">
<div className="form-content">
    <form action="" className='form' onSubmit={resetPasswordSubmit} >
    <h2>Reset Password</h2>
       
          
            <div className="input-group">
                <input type="password"  id="" placeholder='Enter your new Password'  value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="input-group">
                <input type="password"  id="" placeholder='Confirm Password' value={confirmPassword}  onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </div>
            <button className="authBtn">Reset Password</button>
            
    </form>
</div>

</div>
</>
  )
}

export default ResetPassword