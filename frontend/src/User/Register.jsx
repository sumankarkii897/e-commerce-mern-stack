import React, { useEffect, useState } from 'react'
import "../UserStyles/Form.css"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { removeErrors, removeSuccess } from '../features/user/userSlice'
import { register } from '../features/user/userSlice'
function Register() {
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:""
    })
    /* state for image */
    const [avatar,setAvatar]=useState("")
    const[avatarPreview,setAvatarPreview]=useState("./images/profile.jpg")
    const {name,email,password}=user;
    const {success,loading,error}=useSelector(state=>state.user)
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const registerDataChange=(e)=>{
if(e.target.name==="avatar"){
const reader=new FileReader();
reader.onload=()=>{
    if(reader.readyState===2){
        setAvatarPreview(reader.result)
        setAvatar(reader.result)
    }
}
reader.readAsDataURL(e.target.files[0])
}
else{
    setUser({
        ...user,[e.target.name]:e.target.value
    })
}
    }
    const registerSubmit=(e)=>{
        e.preventDefault();
        if(!name || !email || !password){
toast.error("Please fill out all the required filed",{
    position:'top-center',
    autoClose:3000
})
return;
        }
        /* used to store form data in key,value pairs */
      const myForm=  new FormData();
      myForm.set('name',name)
      myForm.set('email',email)
      myForm.set('password',password)
      myForm.set('avatar',avatar)
      console.log(myForm.entries());
      for(let pair of myForm.entries()){
        console.log(pair[0]+"-" +pair[1]);
        
      }
      dispatch(register(myForm))
    }
      useEffect(()=>{
            if(error){
              toast.error(error,{position:'top-center',autoClose:3000})
              dispatch(removeErrors())
            
            }
        },[dispatch,error])
      useEffect(()=>{
            if(success){
              toast.success("Registration Successful",{position:'top-center',autoClose:3000})
              dispatch(removeSuccess())
            navigate("/login")
            }
        },[dispatch,success])
  return (
   <div className="form-container container">
    <div className="form-content">
        <form className="form" onSubmit={registerSubmit} encType='multipart/form-data'>
            <h2>Sign Up</h2>
            <div className="input-group">
                <input type="text" name="name" id="" placeholder='Username' value={name} onChange={registerDataChange}/>
            </div>
            <div className="input-group">
                <input type="email" name="email" id="" placeholder='Email' value={email} onChange={registerDataChange}/>
            </div>
            <div className="input-group">
                <input type="password" name="password" id="" placeholder='Password' value={password} onChange={registerDataChange}/>
            </div>
            <div className="input-group avatar-group">
                <input type="file" name="avatar"  className='file-input' accept='image/' onChange={registerDataChange}/>
                <img src={avatarPreview} alt="Avatar Preview" className='avatar' />
            </div>
           <button className="authBtn">Sign Up</button>
           <p className="form-links">
            Already have an account ? <Link to="/login">Sing in here</Link>
           </p>
        </form>
    </div>
   </div>
  )
}

export default Register