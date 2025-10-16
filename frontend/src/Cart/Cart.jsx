import React from 'react'
import "../CartStyles/Cart.css"
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartItem from './CartItem'
function Cart() {
  return (
 <>
 <PageTitle title="Cart"/>
 <Navbar/>
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
         <CartItem/>
         {/* <CartItem/>
         <CartItem/> */}
        </div>
    </div>
    {/* price summary */}
<div className="price-summary">
    <h3 className="price-summary-heading">Price Summary</h3>
    <div className="summary-item">
        <p className="summary-label">Subtotal : </p>
        <p className="summary-value">200</p>
    </div>
    <div className="summary-item">
        <p className="summary-label">Tax (13%) </p>
        <p className="summary-value">26</p>
    </div>
    <div className="summary-item">
        <p className="summary-label">Shipping </p>
        <p className="summary-value">25</p>
    </div>
    <div className="summary-total">
        <p className="total-label">Total :</p>
        <p className="total-value">251</p>
    </div>
    <button className="checkout-btn">Proceed to Checkout</button>
</div>
</div>

 <Footer/>
 </>
  )
}

export default Cart
