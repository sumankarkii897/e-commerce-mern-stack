import React, { useEffect } from "react";
import "../OrderStyles/Payment.css";
import "../CartStyles/OrderConfirm.css"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader.jsx"
import { Link, useSearchParams } from "react-router-dom";
import {toast} from "react-toastify"
import { useDispatch, useSelector } from "react-redux";
import {createOrder, removeErrors, removeSuccess} from "../features/order/orderSlice.js"
import { clearCart } from "../features/cart/cartSlice.js";
function PaymentSuccess() {
  const [searchParams]=useSearchParams()
  const dataParam=searchParams.get("data")
  // const reference=searchParams.get("refId")
  // console.log(reference);
  
  const {cartItems,shippingInfo}=useSelector(state=>state.cart);
  // console.log("shipping Info",shippingInfo);
  const {loading,success,error}=useSelector(state=>state.order)
  const dispatch=useDispatch();
  useEffect(()=>{
const createOrderData=async()=>{
  try {
    // decoding Base64 data
    const decodedData=JSON.parse(atob(dataParam))
    // extracting the transaction info
    const {
      transaction_code,
      transaction_uuid,
      status,
      total_amount
    }=decodedData;
    const orderItem=JSON.parse(sessionStorage.getItem("orderItem")) 
    if(!orderItem){return}
    const orderData={
      shippingInfo:{
address:shippingInfo.address,
city:shippingInfo.city,
state:shippingInfo.state,
country:shippingInfo.country,
pinCode:shippingInfo.pinCode,
phoneNo:shippingInfo.phoneNo
      },
      orderItems:cartItems.map((item)=>({
name:item.name,
price:item.price,
quantity:item.quantity,
image:item.image,
product:item.product,
      })),
      paymentInfo:{
        id:transaction_uuid,
        status:"succeeded"
      },
      itemPrice:orderItem.subTotal,
      taxPrice:orderItem.tax,
      shippingPrice:orderItem.shippingCharge,
      totalPrice:orderItem.totalPrice,
      
    }
    console.log("Sending data",orderData);
    dispatch(createOrder(orderData))
    sessionStorage.removeItem("orderItem")
  } catch (error) {
    console.log("Order Creation Error : ",error.message);
    toast.error(error.message || "Order Creation Failed",{
      position:"top-center",
      autoClose:3000
    })
  }
}
createOrderData()
  },[])
  useEffect(()=>{
    if(success){
      toast.success("Order Placed",{
        position:"top-center",
        autoClose:3000
      })
      console.log("success");
      dispatch(clearCart())
      dispatch(removeSuccess())
     
    }
  },[success,dispatch])
  useEffect(()=>{
    if(error){
      toast.error(error,{
        position:"top-center",
        autoClose:3000
      })
      dispatch(removeErrors())
    }
  },[error,dispatch])
  return (
  <>
   {loading ? (<Loader/>) :( <>
    <Navbar/>
    <div className="payment-container">
      <h2>✅ Payment Successful</h2>
      <p>Your order has been confirmed.</p>
      <Link className="proceed-button" to="/orders/user">View Orders</Link>
    </div>
    <Footer/>
    </>)}
  </>
  );
}

export default PaymentSuccess;

