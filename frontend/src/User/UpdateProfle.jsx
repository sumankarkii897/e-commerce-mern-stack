import React, { useState } from 'react'
import "../UserStyles/Form.css"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { toast } from 'react-toastify';
function UpdateProfle() {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("")
    const [avatar,setAvatar]=useState("")
    const [avatarPreveiw,setAvatarPreview]=useState("./images/profile.jpg")
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
  return (
   <>
   <Navbar/>
   <div className="container update-container">
    <div className="form-content">
        <form action="" className="form">
            <h2>Update Profile</h2>
          <div className="input-group avatar-group">
            <input type="file" accept="image/*" className="file-input" onChange={profileImageUpdate}/>
            <img src={avatarPreveiw} alt="User Profile" className="avatar" />
          </div>
          <div className="input-group">
            <input type="text" value={name}  onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className="input-group">
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <button className="authBtn">Update</button>
        </form>
    </div>
   </div>
   <Footer/>
   </>
  )
}

export default UpdateProfle