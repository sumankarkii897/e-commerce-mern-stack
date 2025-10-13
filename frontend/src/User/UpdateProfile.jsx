import React, { useEffect, useState } from 'react'
import "../UserStyles/Form.css"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeErrors, removeSuccess, updateProfile } from '../features/user/userSlice';
import Loader from '../components/Loader';
function UpdateProfile() {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("")
    const [avatar,setAvatar]=useState("")
    const [avatarPreveiw,setAvatarPreview]=useState("./images/profile.jpg")
    const {user,error,success,message,loading}=useSelector(state=>state.user)
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const profileImageUpdate=(e)=>{
       
              const file = e.target.files[0];
              if (file) {
                const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
                if (!validImageTypes.includes(file.type)) {
                  toast.error('Please upload a valid image (JPEG, PNG, GIF)', {
                    position: 'top-center',
                    autoClose: 3000,
                  });
                  return;
                }
                if (file.size > 5 * 1024 * 1024) {
                  toast.error('Image size should be less than 5MB', {
                    position: 'top-center',
                    autoClose: 3000,
                  });
                  return;
                }
                const reader = new FileReader();
                reader.onload = () => {
                  if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    // Remove the data:image/<type>;base64, prefix
                    const base64String = reader.result.split(',')[1];
                    setAvatar(base64String); // Store only the base64 data
                  }
                };
                reader.onerror=(error)=>{
                    toast.error("Error reading File")
                }
                reader.readAsDataURL(file);
              } 
       
    }
    const updateSubmit=(e)=>{
      e.preventDefault();
      const myForm=new FormData()
myForm.set("name",name)
myForm.set("email",email)
myForm.set("avatar",avatar)
dispatch(updateProfile(myForm))
    }
    useEffect(()=>{
      if(error){
        toast.error(error,{
          position: 'top-center',
          autoClose:3000
        });
        dispatch(removeErrors())
      }
    },[dispatch,error])
    useEffect(()=>{
      if(success){
        toast.success(message,{
          position: 'top-center',
          autoClose:3000
        });
        dispatch(removeSuccess())
        navigate("/profile")
      }
    },[dispatch,success])
    useEffect(()=>{
      if(user){
        setName(user.name)
        setEmail(user.email)
        setAvatarPreview(user.avatar.url || "./images/profile.jpg")
      }
    },[user])
  return (
    <>
    
 {loading? (<Loader/>) :(  <>
   <Navbar/>
   <div className="container update-container">
    <div className="form-content">
        <form action="" className="form" encType='multipart/form-data'onSubmit={updateSubmit}>
            <h2>Update Profile</h2>
          <div className="input-group avatar-group">
            <input type="file" accept="image/*" className="file-input" name="avatar" onChange={profileImageUpdate}/>
            <img src={avatarPreveiw} alt="User Profile" className="avatar"  />
          </div>
          <div className="input-group">
            <input type="text" value={name}  onChange={(e)=>setName(e.target.value)} name='name'/>
          </div>
          <div className="input-group">
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} name='email'/>
          </div>
          <button className="authBtn">Update</button>
        </form>
    </div>
   </div>
   <Footer/>
   </>)}
   </>
  )
}

export default UpdateProfile