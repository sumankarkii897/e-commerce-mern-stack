import React from 'react'
import "../CartStyles/Cart.css"
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartItem from './CartItem'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
function Cart() {
    const {isAuthenticated}=useSelector(state=>state.user)
    const {cartItems}=useSelector(state=>state.cart)
    console.log("Cart Items " ,cartItems);
    const navigate=useNavigate()
    // let subTotal=0;
    // cartItems.map((item)=>subTotal+=item.price*item.quantity)
    const subTotal=cartItems.reduce((acc,item)=>acc+item.price*item.quantity,0)
    let tax=0.13*subTotal.toFixed(2);
    let shippingCharge=subTotal > 5000 ?500:0;
    let totalPrice=(subTotal+tax+shippingCharge).toFixed(2);
  const checkOutHandler=()=>{
      if(!isAuthenticated){
    navigate(`/login?redirect=/shipping`)
    // navigate("/login")
}
else{
    navigate(`/shipping`)
}

  }
  return (
<> 
 <PageTitle title="Cart"/>
<Navbar/>
{cartItems.length===0 ? (
   <>
   
    <div className='empty-cart-container'>
        <p className="empty-cart-message">Your Cart is Empty</p>
        <Link to={"/products"} className='viewProducts'>View Products</Link>
    </div>
  
   </>
) :( <>

 
<div className="cart-page">
    <div className="cart-items">
        <div className="cart-items-heading">Your Cart</div>
        <div className="cart-table">
            <div className="cart-table-header">
                <div className="header-product">Product</div>
                <div className="header-quantity">Quantity</div>
                <div className="header-total item-total-heading">Item Total</div>
                <div className="header-action item-total-heading">Action</div>
            </div>
            {/* Cart Items */}
        {cartItems && cartItems.map((item)=><CartItem item={item} key={item.name}/>)}
         
         {/* <CartItem/>
         <CartItem/> */}
        </div>
    </div>
    {/* price summary */}
<div className="price-summary">
    <h3 className="price-summary-heading">Price Summary</h3>
    <div className="summary-item">
        <p className="summary-label">Subtotal : </p>
        <p className="summary-value">RS . {subTotal}</p>
    </div>
    <div className="summary-item">
        <p className="summary-label">Tax (13%) </p>
        <p className="summary-value">RS . {tax}</p>
    </div>
    <div className="summary-item">
        <p className="summary-label">Shipping </p>
        <p className="summary-value">RS . {shippingCharge}</p>
    </div>
    <div className="summary-total">
        <p className="total-label">Total :</p>
        <p className="total-value">RS . {totalPrice}</p>
    </div>
    <button className="checkout-btn" onClick={checkOutHandler}>Proceed to Checkout</button>
</div>
</div>


 </>)}
  <Footer/>
</>
  )
}

export default Cart
