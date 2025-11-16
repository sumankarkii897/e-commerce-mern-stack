import React, { useEffect, useState } from 'react'
import "../AdminStyles/UpdateOrder.css"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../features/order/orderSlice'
import { StarRateTwoTone } from '@mui/icons-material'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import { removeErrors, removeSuccess } from '../features/admin/adminSlice'
function UpdateOrder() {
    const [status,setStatus]=useState("")
    const {orderId}=useParams();
    const dispatch=useDispatch();
    const {order,loading:orderLoading}=useSelector(state=>state.order)
  //  console.log(order);
const {success,loading:adminLoading,error}=useSelector(state=>state.admin)
const loading=orderLoading || adminLoading
    useEffect(()=>{
       if(orderId){
         dispatch(getOrderDetails(orderId))
       }
    },[dispatch,orderId])
    const {orderItems=[],orderStatus,paymentInfo={}, shippingInfo={},totalPrice
}=order || {};
const paymentStatus=paymentInfo.status === "succeeded" || paymentInfo.status === "Succeeded"?"Paid":"Not Paid";
const finalOrderStatus=paymentStatus==="Not Paid"?"Cancelled":orderStatus;
const handleStatusUpdate=()=>{
    if(!status){
        toast.error("Please Select a Status",{
            position:"top-center",
            autoClose:3000
        })
return;
    }
    dispatch(updateorder({orderId,status}))
}
useEffect(()=>{
    if(error){
        toast.error(error,{
            position:"top-center",
            autoClose:3000
        })
        dispatch(removeErrors())
    }
    if(success){
          toast.success("Order Status Updated Successfully...",{
            position:"top-center",
            autoClose:3000
        })
        dispatch(removeSuccess())  
    }
},[dispatch,error,success])
  return (
 <>
 <Navbar/>
 <PageTitle title={"Update Order"}/>
{loading ? (<Loader/>) :( <div className="order-container">
    <h1 className="order-title">Update Order</h1>
    <div className="order-details">
        <h2>Order Information</h2>
     <p><strong>Order Id : </strong>{order._id}</p>
     <p><strong>Shipping Address : </strong>{shippingInfo.address},{shippingInfo.city},{shippingInfo.state},{shippingInfo.country}-{shippingInfo.pinCode}</p>
     <p><strong>Phone No : </strong>{shippingInfo.phoneNo}</p>
     <p><strong>Order Status : </strong>{finalOrderStatus}</p>
     <p><strong>Payment Status : </strong>{paymentStatus}</p>
     <p><strong>Total Price : </strong>{totalPrice}</p>
    </div>
    <div className="order-items">
        <h2>Order Items</h2>
        <table className="order-table">
            <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            {orderItems.length > 0 && orderItems.map((item)=>
                (<tr key={item._id}>
                <td><img src={item.image} alt="product Image" className='order-item-image' /></td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
            </tr>))}
        </tbody>
        </table>
    </div>
    <div className="order-status">
        <h2>Update Status</h2>
     <select className="status-select" value={status} onChange={(e)=>setStatus(e.target.value)}>
        <option value="">Select Status</option>
        <option value="Shipped">Shipped</option>
        <option value="On The Way">On The Way</option>
        <option value="Delivered">Delivered</option>
     </select>
     <button className="update-button" onClick={handleStatusUpdate}>Update Status</button>
    </div>
 </div>)}
 <Footer/>
 </>
  )
}

export default UpdateOrder