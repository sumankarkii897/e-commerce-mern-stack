
import React, { useEffect } from 'react'
import Home from "./pages/Home"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import ProductDetails from './pages/ProductDetails'
import Products from './pages/Products'
import Register from './User/Register'
import Login from './User/Login'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './features/user/userSlice'
import UserDashboard from './User/UserDashboard'
import Profile from './User/Profile'
import ProtectedRoutes from './components/ProtectedRoutes'

import UpdateProfile from './User/UpdateProfile'
import UpdatePassword from './User/UpdatePassword'
import ForgotPassword from './User/ForgotPassword'
function App() {
  const {isAuthenticated,user}=useSelector(state=>state.user)
  const dispatch=useDispatch()
  useEffect(()=>{
    if(isAuthenticated){ dispatch(loadUser())}
  },[dispatch])
  // console.log(isAuthenticated,user);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/products" element={<Products/>}/>
      <Route path='/products/:keyword' element={<Products/>}/>
      <Route path='/register' element={<Register></Register>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/password/forgot" element={<ForgotPassword/>}/>
      <Route path='/profile' element={<ProtectedRoutes element={<Profile/>}/>}/>
      <Route path="/profile/update" element={<ProtectedRoutes element={<UpdateProfile/>}/>}/>
    <Route path="/password/update" element={<ProtectedRoutes element={<UpdatePassword/>}/>}/>
      </Routes>
      {isAuthenticated && <UserDashboard user={user}/>}
      
    </Router>
  )
}

export default App