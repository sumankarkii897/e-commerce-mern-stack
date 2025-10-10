import React, { useEffect, useState } from 'react'
import "../pageStyles/ProductDetails.css"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from "../components/Loader"
import Rating from '../components/Rating'
import {useDispatch, useSelector} from "react-redux"
import { useParams } from 'react-router-dom'
import { getProductDetails, removeErrors } from '../features/products/productSlice'
import {toast} from "react-toastify"
function ProductDetails() {
    const [userRating,setUserRating]=useState(0)
    const handleRatingChange=(newRating)=>{
        setUserRating(newRating)
        
        
    }
   const {loading,error,product}= useSelector((state)=>state.product)
   const dispatch=useDispatch();
//    console.log(useParams());
const {id}=useParams();
useEffect(()=>{
    if(id){
        dispatch(getProductDetails(id));
    }
    return ()=>{
        dispatch(removeErrors())
    }
},[dispatch,id])
  // for error
  useEffect(()=>{
if(error){
    toast.error(error.message,{
        position:'top-center',
        autoClose:3000
    })
    dispatch(removeErrors())
}
  },[dispatch,error]) 
  if(loading){
    return (
        <>
        <Navbar/>
       <Loader/>
        <Footer/>
        </>
    )
  }
  if(error || !product){
    return (

        <>
        
        <Navbar/>
   
        <Footer/>
        </>
    )
  }
  return (
    <>
    
    <Navbar/>
    <div className="product-details-container">
        <div className="product-detail-container">
            <div className="product-image-container">
                <img src={product.image[0].url.replace("./","/")} alt="Product Title" className='product-detail-image' />
            </div>
            <div className="product-info">
                <h2>{product.name}</h2>
                <p className="product-description">
                   {product.description}
                </p>
                <p className="product-price">Price :{product.price}</p>
            <div className="product-rating">
                {/* <Rating value={2} disabled={true}/> */}
                <Rating value={product.ratings} disabled={true}/>
            </div>
            <span className="productCardSpan">({product.numOfReviews} {product.numOfReviews===1?"Review":"Reviews"})</span>
            <div className="stock-status">
                <span className={product.stock > 0 ? `in-stock`:'out-of-stock'}>{ product.stock > 0 ? `In Stock ${product.stock} available`:"Out of Stock"}</span>
            </div>
           { product.stock > 0 && (<> 
            <div className="quantity-controls">
                <span className="quantity-label">Quantity</span>
                <button className="quantity-button">-
                </button>
                <input type="text" name="" id="" value={1} className='quantity-value' readOnly/>
                <button className='quantity-button'>+</button>
            </div>
            <button className="add-to-cart-btn">Add to Cart</button>
            </>)
            }
            <form action="" className="review-form">
                <h3>Write a Review</h3>
                <Rating value={0} disabled={false}
                onRatingChange={handleRatingChange}
                />
                <textarea className='review-input' placeholder='Write your review here'></textarea>
                <button className='submit-review-btn'>Submit Review</button>
            </form>
            </div>
        </div>
        <div className="review-container">
            <h3>Customer Reviews</h3>
          { product.reviews && product.reviews.length > 0 ?  (<div className="reviews-section">
              { product.reviews.map((review,index)=>(
<div className="review-item" key={index}>
                    <div className="review-heade">
                        <Rating value={review.rating} disabled={true}/>
                    </div>
                    <p className="review-comment">
                        {review.comment}
                    </p>
                    <p className="review-name">
                    By :   {review.name}
                    </p>
                </div>
              )) }
            </div>) :(
                <p className="no-reviews">No reviews yet. Be the first review this product !</p>
            )}
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default ProductDetails