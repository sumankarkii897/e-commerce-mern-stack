
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
import ResetPassword from './User/ResetPassword'
import Cart from './Cart/Cart'
import Shipping from './Cart/Shipping'
import OrderConfirm from './Cart/OrderConfirm'
import Payment from './Cart/Payment'
import EsewaPayment from "./Cart/EsewaPayment"
import PaymentSuccess from "./Cart/PaymentSuccess"
import PaymentFail from "./Cart/PaymentFail"
import MyOrders from './Orders/MyOrders'
import OrderDetails from './Orders/OrderDetails'
import Dashboard from './Admin/Dashboard'
import ProductsList from './Admin/ProductsList'
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
      <Route path="/reset/:token" element={<ResetPassword/>}/>
    <Route path="/password/update" element={<ProtectedRoutes element={<UpdatePassword/>}/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/shipping" element= {<ProtectedRoutes element={<Shipping/>}/>}/>
      <Route path="/order/confirm" element= {<ProtectedRoutes element={<OrderConfirm/>}/>}/>
      <Route path="/proceed/payment" element= {<ProtectedRoutes element={<Payment/>}/>}/>
      <Route path="/esewa/payment" element= {<ProtectedRoutes element={<EsewaPayment/>}/>}/>
      <Route path="/payment/success" element= {<ProtectedRoutes element={<PaymentSuccess/>}/>}/>
      <Route 
      path="/payment/fail" element= {<ProtectedRoutes element={<PaymentFail/>}/>}/>
      <Route 
      path="/orders/user" element= {<ProtectedRoutes element={<MyOrders/>}/>}/>
      <Route 
      path="/order/:orderId" element= {<ProtectedRoutes element={<OrderDetails/>}/>}/>
    
      <Route 
      path="/admin/dashboard" element= {<ProtectedRoutes element={<Dashboard/>} adminOnly={true}/>}/>
      <Route 
      path="/admin/products" element= {<ProtectedRoutes element={<ProductsList/>} adminOnly={true}/>}/>
     
      </Routes>
      {isAuthenticated && <UserDashboard user={user}/>}
      
    </Router>
  )
}

export default App