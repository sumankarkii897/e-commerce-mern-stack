import React from 'react'
import "../CartStyles/Payment.css"
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import CheckoutPath from './CheckoutPath'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
function Payment() {
  const navigate=useNavigate()
    const orderItem=JSON.parse(sessionStorage.getItem("orderItem"))
    const totalPrice = orderItem?.totalPrice ? Number(orderItem.totalPrice) : 0
    const esewaPay=()=>{
navigate("/esewa/payment")
    }
  return (
  <>
  <PageTitle title="Payment" />
  <Navbar/>
 <CheckoutPath activePath={2}/>
 <div className="payment-container">
    <Link to="/order/confirm" className='payment-go-back'>Go Back</Link>
    <button className="payment-btn" onClick={esewaPay}>Pay ({totalPrice.toFixed(2)})</button>
 </div>
<Footer/>
  </>
  )
}

export default Payment