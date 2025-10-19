import React from "react";
import "../OrderStyles/Payment.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function PaymentSuccess() {
  return (
    <>
    <Navbar/>
    <div className="payment-container">
      <h2>✅ Payment Successful</h2>
      <p>Your order has been confirmed.</p>
    </div>
    <Footer/>
    </>
  );
}

export default PaymentSuccess;
// sumankarki29344
