import React, { use, useEffect } from 'react'
import "../../AdminStyles/UsersList.css"
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import PageTitle from '../../components/PageTitle'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Delete, Edit } from '@mui/icons-material'
import { clearMessage, deleteUser, fetchAllUser, removeErrors } from './adminSlice'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'

function UsersList() {
  const {loading,error,users,message}=useSelector((state)=>state.admin)
  const dispatch=useDispatch();
  // console.log(users);
  const navigate=useNavigate()
  
  useEffect(()=>{
    dispatch(fetchAllUser())
  },[dispatch])
  const handleDelete=(userId)=>{
const confirm=window.confirm("Are you sure you want to delete this user ?")
if(confirm){
  dispatch(deleteUser(userId))
}
  }
  useEffect(()=>{
    
    if(error){
      toast.error(error,{position:"top-center",autoClose:3000})
      dispatch(removeErrors())
    }
    if(message){
      toast.success(message,{position:"top-center",autoClose:3000})
      dispatch(clearMessage())
      navigate("/admin/dashboard")
    }
  },[dispatch,error,message])
  return (
  <>
  {
    loading?(<Loader/>): (<>
   
<Navbar/>
<PageTitle title="All Users"/>
<div className="usersList-container">
<h1 className="usersList-title">All Users</h1>
<div className="usersList-table-container">
  <table className="usersList-table">
    <thead>
      <tr>
        <th>S.No</th>
      <th>Name</th>
      <th>Email</th>
      <th>role</th>
      <th>Created At</th>
      <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      { users && users.length > 0 ?users.map((user,index)=>(
<tr key={user._id}>
        <td>{index+1}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
        <td>
          <Link to={`/admin/user/${user._id}`}className='action-icon edit-icon'><Edit/></Link>
          <button className="action-icon delete-icon" onClick={()=>handleDelete(user._id)}><Delete/></button>
     </td>
      </tr>
      )): (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center" }}>
                        No users found
                      </td>
                    </tr>
                  )
      }
    </tbody>
  </table>
</div>

</div>
<Footer/>
   </>)
  }
  </>
  )
}

export default UsersList