import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import "../AdminStyles/OrdersList.css"
import { Link, useNavigate } from 'react-router-dom'
import { Delete, Edit } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrder, fetchAllOrders, removeErrors, removeSuccess,clearMessage } from '../features/admin/adminSlice'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
function OrdersList() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {loading,error,totalAmount,orders,success,message}=useSelector(state=>state.admin)
    
    useEffect(()=>{
        dispatch(fetchAllOrders())
    },[dispatch])
    console.log(orders);

    const handleDelete=(orderId)=>{
const confirm=window.confirm("Are you Sure you want to delete this Order?")
if(confirm){
    dispatch(deleteOrder(orderId))
}
    }
        useEffect(()=>{
        if(error){
            toast.error(error,{position: "top-center",autoClose:3000})
            dispatch(removeErrors())
        }
        if(success){
            toast.success(message,{position: "top-center",autoClose:3000})
            dispatch(removeSuccess())
            dispatch(clearMessage())
            dispatch(fetchAllOrders())
        }
    },[dispatch,error,success,message])
    if(orders && orders.length===0){
        <div className="no-orders-container">
            <p>No Orders Found</p>
        </div>
    }
  return (
 <>
 {
    loading?(<Loader/>): ( <>
   <Navbar/>
   <PageTitle title={"Orders List"}/>
<div className="ordersList-container">
       <h1 className="ordersList-title">All Orders</h1>
       <div className="ordersList-table-container">
        <table className="ordersList-table">
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th>Order Id</th>
                    <th>Status</th>
                    <th>Total Price</th>
                    <th>Number Of Items</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
              {orders && orders.map((order,index)=>
            (<tr key={order._id}>
                    <td>{index+1}</td>
                    <td>{order._id}</td>
                    <td className={`order-status ${order.orderStatus.toLowerCase()}`}>{order.orderStatus}</td>
                    <td>{order.totalPrice.toFixed(2)}</td>
                    <td>{order.orderItems.length}</td>
                    <td>
                        <Link to={`/admin/order/${order._id}`} className='action-icon edit-icon'><Edit/></Link>
                        <button className='action-icon delete-icon' onClick={()=>handleDelete(order._id)}><Delete/></button>
                    </td>
                </tr>)) }
            </tbody>
        </table>
       </div>
</div>
   <Footer/>
   </>)
 }
 </>
  )
}

export default OrdersList