import React from "react";
import "../OrderStyles/Payment.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function PaymentFail() {
  return (
  <>
  <Navbar/>
    <div className="payment-container">
      <h2>❌ Payment Failed</h2>
      <p>Please try again or use another payment method.</p>
    </div>
  <Footer/>
  </>
  );
}

export default PaymentFail;
// sumankarki29344
