import React, { use, useEffect } from 'react'
import "../../AdminStyles/UsersList.css"
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import PageTitle from '../../components/PageTitle'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Delete, Edit } from '@mui/icons-material'
import { fetchAllUser } from './adminSlice'
import Loader from '../../components/Loader'

function UsersList() {
  const {loading,error,users}=useSelector((state)=>state.admin)
  const dispatch=useDispatch();
  console.log(users);
  
  useEffect(()=>{
    dispatch(fetchAllUser())
  },[dispatch])
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
          <button className="action-icon delete-icon"><Delete/></button>
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