import React, { useEffect } from "react";
import "../OrderStyles/Payment.css";
import "../CartStyles/OrderConfirm.css"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import {toast} from "react-toastify"
import { useDispatch, useSelector } from "react-redux";
function PaymentSuccess() {
  const {cartItems,shippingInfo}=useSelector(state=>state.cart);
  const dispatch=useDispatch();
  useEffect(()=>{
const createOrder=async()=>{
  try {
    
  } catch (error) {
    console.log("Order Creation Error : ",error.message);
    toast.error(error.message || "Order Creation Failed",{
      position:"top-center",
      autoClose:3000
    })
  }
}

  },[])
  return (
    <>
    <Navbar/>
    <div className="payment-container">
      <h2>✅ Payment Successful</h2>
      <p>Your order has been confirmed.</p>
      <Link className="proceed-button" to="/orders/user">View Orders</Link>
    </div>
    <Footer/>
    </>
  );
}

export default PaymentSuccess;

