import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CheckoutPath from './CheckoutPath'
import PageTitle from '../components/PageTitle'
import "../CartStyles/OrderConfirm.css"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function OrderConfirm() {
    const navigate=useNavigate()
    const {shippingInfo,cartItems}=useSelector(state=>state.cart)
    // console.log("ShippingInfo",shippingInfo);
    // console.log(cartItems);
    
    
    const {user}=useSelector(state=>state.user)
    // console.log("user",user);
     const subTotal=cartItems.reduce((acc,item)=>acc+item.price*item.quantity,0)
    let tax=0.13*subTotal.toFixed(2);
    let shippingCharge=subTotal > 5000 ?500:0;
    let totalPrice=(subTotal+tax+shippingCharge).toFixed(2);
  const proceedToPayment=()=>{
    const data={
        subTotal,
        tax,
        shippingCharge,
        totalPrice
    }
    sessionStorage.setItem("orderItem",JSON.stringify(data))
    navigate("/proceed/payment")
  }
  return (
    <>
    <PageTitle title={"Confirm Order"}/>
    <Navbar/>
     <CheckoutPath activePath={1}/>
    <div className="confirm-container">
        <h1 className="confirm-header">Order Confirmation</h1>
        <div className="confirm-table-container">
            <table className="confirm-table">
                <caption>Shipping Details</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone no</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user.name}</td>
                        <td>{shippingInfo.phoneNo}</td>
                        <td>{shippingInfo.address},{shippingInfo.city},{shippingInfo.state},{shippingInfo.country}-{shippingInfo.pinCode}</td>
                    </tr>
                </tbody>
                </table>
                <table className="confirm-table cart-table">
                    <caption>Cart Items</caption>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((cartItem,index)=>(<tr key={index}>
                            <td>
                                <img src={cartItem.image} alt={cartItem.name} className='product-image'/>
                            </td>
                            <td>{cartItem.name }</td>
                            <td>{(cartItem.price.toFixed(2))}</td>
                            <td>{cartItem.quantity}</td>
                            <td>{(cartItem.quantity * cartItem.price).toFixed(2)}</td>
                        </tr>))}
                    </tbody>
                </table>
                <table className="confirm-table">
<caption>Order Summary</caption>
<thead>
    <tr>
        <th>SubTotal</th>
        <th>Shipping Charges</th>
        <th> Tax </th>
        <th> Total </th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>{subTotal}</td>
        <td>{shippingCharge}</td>
        <td>{tax}</td>
        <td>{totalPrice}</td>
    </tr>
</tbody>

                </table>
        </div>
        <button className="proceed-button" onClick={proceedToPayment}>Proceed To Payment</button>
    </div>
    <Footer/>
    </>
  )
}

export default OrderConfirm