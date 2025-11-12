import React, { useEffect, useState } from 'react'
import "../pageStyles/ProductDetails.css"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from "../components/Loader"
import Rating from '../components/Rating'
import {useDispatch, useSelector} from "react-redux"
import { useParams } from 'react-router-dom'
import { createReview, getProductDetails, removeErrors, removeSuccess } from '../features/products/productSlice'
import {toast} from "react-toastify"
import { addItemsToCart, removeMessage } from '../features/cart/cartSlice'
function ProductDetails() {
    const [comment,setComment]=useState("")
    const [userRating,setUserRating]=useState(0)
    const [quantity,setQuantity]=useState(1)
    const [selectedImage,setSelectedImage]=useState("")
    const handleRatingChange=(newRating)=>{
        setUserRating(newRating)
        
        
    }
    const decreaseQuantity=()=>{
        if(quantity <= 1){
toast.warn("Quantity cannot be less than 1" ,{
    position:"top-center",
    autoClose:3000
})
        }
        else{

            setQuantity(quantity-1)
        }
    }
    const increaseQuantity=()=>{
        if(quantity < product.stock)
{setQuantity(quantity+1)}
        else{
            toast.warning("above stock limit" ,{
                position:"top-center",
                autoClose:3000
            })
            return
        }
    }
   const {loading,error,product,reviewSuccess,reviewLoading}= useSelector((state)=>state.product)
   /* cart state */
   const {loading:cartLoading,error:cartError,success,message,cartItems}=useSelector((state)=>state.cart)
   console.log(cartItems);
   
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
if(cartError){
    toast.error(cartError,{
        position:'top-center',
        autoClose:3000
    })
}
  },[dispatch,error,cartError]) 
  /* for success */
  useEffect(()=>{
    if(success){
        toast.success(message,{position:'top-center',autoClose:3000});
        dispatch(removeMessage())
    }
  },[dispatch,success,message])

  const addToCart=()=>{
    dispatch(addItemsToCart({id,quantity}))
  }
  const handleReviewSubmit=(e)=>{
    e.preventDefault();
    if(!userRating){
        toast.error("Please select the rating",{
            position:"top-center",
            autoClose:3000
        })
        return;
    }
    dispatch(createReview({rating:userRating,
        comment,
        productId:id
    }))
  }
  useEffect(()=>{
    if(reviewSuccess){
        toast.success("Review Submitted Successfully.",{position:"top-center",autoClose:3000})
        setUserRating(0)
        setComment("")
        dispatch(removeSuccess())
        dispatch(getProductDetails(id))
    }
  },[reviewSuccess,id,dispatch])
  useEffect(()=>{
    if(product && product.image && product.image.length > 0){
        setSelectedImage(product.image[0].url)
    }
  },[product])
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
                <img src={selectedImage} alt="Product Title" className='product-detail-image' />
               {product.image.length > 1 && <div className="product-thumbnail">
                  {product.image.map((img,index)=> (
                     <img src={img.url} alt={`Thumbnail ${index+1}`}className='thumbnail-image ' onClick={()=>setSelectedImage(img.url)} />
                  )
                ) }
                </div>}
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
                <button className="quantity-button"onClick={decreaseQuantity}>-
                </button>
                <input type="text" name="" id="" value={quantity} className='quantity-value' readOnly/>
                <button className='quantity-button'onClick={increaseQuantity}>+</button>
            </div>
            <button className="add-to-cart-btn" disabled={cartLoading} onClick={addToCart}>{cartLoading ? "Adding  " : "Add to Cart"}</button>
            </>)
            }
            <form action="" className="review-form" onSubmit={handleReviewSubmit}>
                <h3>Write a Review</h3>
                <Rating value={0} disabled={false}
                onRatingChange={handleRatingChange}
                />
                <textarea className='review-input' placeholder='Write your review here' value={comment} onChange={(e)=>setComment(e.target.value)}required></textarea>
                <button className='submit-review-btn' disabled={reviewLoading}>{reviewLoading?"Submitting ...":'Submit Review'}</button>
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