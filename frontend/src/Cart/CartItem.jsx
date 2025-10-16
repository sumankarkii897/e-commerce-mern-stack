import React, { useEffect, useState } from 'react'
import {toast} from "react-toastify"
import "../CartStyles/Cart.css"
import { useDispatch, useSelector } from 'react-redux'
import { addItemsToCart, removeError, removeItemsFromCart, removeMessage } from '../features/cart/cartSlice'
function CartItem({item}) {
    const {success,error,loading,message,cartItems}=useSelector(state=>state.cart)
const dispatch=useDispatch()
    const [quantity,setQuantity]=useState(item.quantity)
    const decreaseQuantity=()=>{
        if(quantity <= 1){
            toast.warn("Quantity can't be less than 1",{
                position:'top-center',
                autoClose:3000,
                
            }   
        )
        dispatch(removeError())
        
            return
        }
        setQuantity(quantity-1)
      
    }
    const increaseQuantity=()=>{
        if(item.stock <= quantity){
            toast.warn("Above Stock limit",{
                position:'top-center',
                autoClose:3000,
              
            })
            dispatch(removeError())
            return
        }
        setQuantity(quantity+1)
    }
    const handleUpdate=()=>{
        if(loading){
            return;
        }
        if(quantity!=item.quantity)
      {  dispatch(addItemsToCart({id:item.product,quantity}))}
    }
    const handleRemove=()=>{
        if(loading){
            return;
        }
        dispatch(removeItemsFromCart(item.product))
        toast.success("Item removed from the cart Successfully . ",{
            position:'top-center',
            autoClose:3000,
           
        })
    }
    useEffect(()=>{
        if(error){
            toast.error(error,{
                position:'top-center',
                autoClose:3000
            })
            dispatch(removeError())
        }
    },[dispatch,error])
    useEffect(()=>{
        if(success){
            toast.success(message,{
                position:"top-center",
                autoClose:3000,  toastId:'cart-update'
            })
            dispatch(removeMessage())
        }
    },[dispatch,success,message])
  return (
 <>
    <div className="cart-item">
                <div className="item-info">
                    <img src={item.image} alt="product Image" className='item-image' />
                    <div className="item-details">
                        <h3 className="item-name">{item.name}</h3>
                        <p className="item-price"><strong>Price:</strong>{(item.price).toFixed(2)}</p>
                        <p className="item-quantity"><strong>Quantity : </strong>{item.quantity}</p>
                    </div>
                </div>
               <div className="quantity-controls">
                <button className="quantity-button decrease-btn" onClick={decreaseQuantity} disabled={loading}>-</button>
                <input type="number"value={quantity} className='quantity-input' readOnly min='1' />
                <button className="quantity-button increase-btn" onClick={increaseQuantity} disabled={loading}>+</button>
                </div> 
                <div className="item-total">
                    <span className="item-total-price">{(item.quantity*item.price).toFixed(2)}</span>
                </div>
                <div className="item-actions">
                    <button className="update-item-btn" onClick={handleUpdate}disabled={loading || quantity===item.quantity}>{loading ? "Updating " :"Update"}</button>
                    <button className="remove-item-btn" disabled={loading} onClick={handleRemove}>Remove</button>
                </div>
            </div>
 </>
  )
}

export default CartItem