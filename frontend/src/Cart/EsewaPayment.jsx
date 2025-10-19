import React from "react";
import "../OrderStyles/Payment.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CryptoJS from "crypto-js";

function EsewaPayment() {
  const orderItem = JSON.parse(sessionStorage.getItem("orderItem")) || { totalPrice: 100 };

  const handlePayment = () => {
    const total_amount = orderItem.totalPrice;
    const transaction_uuid = "TXN_" + Date.now();
    const product_code = "EPAYTEST";
    const tax_amount = 0;
    const product_service_charge = 0;
    const product_delivery_charge = 0;

    const signed_field_names = "total_amount,transaction_uuid,product_code";

    // 🧩 Correct message format for signing
    const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;

    // 🧩 eSewa UAT secret key (as plain text)
    const secretKey = "8gBm/:&EnhH.1/q";

    // 🧩 Create HMAC SHA256 + encode Base64
    const hash = CryptoJS.HmacSHA256(message, secretKey);
    const signature = CryptoJS.enc.Base64.stringify(hash);

    console.log("Message:", message);
    console.log("Signature:", signature);

    // Create and submit form
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    const params = {
      amount: total_amount,
      tax_amount,
      total_amount,
      transaction_uuid,
      product_code,
      product_service_charge,
      product_delivery_charge,
      success_url: "http://localhost:5173/payment/success",
      failure_url: "http://localhost:5173/payment/fail",
      signed_field_names,
      signature,
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

  return (
    <>
      <Navbar />
      <div className="payment-container">
        <h2>Complete Your Payment</h2>
        <p>Amount to Pay: <strong>Rs. {orderItem.totalPrice}</strong></p>
        <button className="esewa-btn" onClick={handlePayment}>
          Pay with eSewa
        </button>
      </div>
      <Footer />
    </>
  );
}

export default EsewaPayment;
