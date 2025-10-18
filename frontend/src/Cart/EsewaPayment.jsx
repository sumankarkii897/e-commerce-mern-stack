import React from "react";
import "../OrderStyles/Payment.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function EsewaPayment() {
  const handlePayment = () => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://uat.esewa.com.np"; // Sandbox URL

    const params = {
      amt: 100,
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: 100,
      pid: "ORDER_12345",
      scd: "EPAYTEST",
      su: "http://localhost:5173/payment/success",
      fu: "http://localhost:5173/payment/fail",
    };

    for (const key in params) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = params[key];
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  };
const orderItem=JSON.parse(sessionStorage.getItem("orderItem"))
  return (
   <>
   <Navbar/>
    <div className="payment-container">
      <h2>Complete Your Payment</h2>
      <p>Amount to Pay: <strong>{orderItem.totalPrice}</strong></p>
      <button className="esewa-btn" onClick={handlePayment}>
        Pay with eSewa
      </button>
    </div>
    <Footer/>
   </>
  );
}

export default EsewaPayment;

