import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";
import { privateDecrypt } from "crypto";
import { trusted } from "mongoose";
// Creating products
export const createProducts = handleAsyncError(async (req, res,next) => {
  req.body.user=req.user.id;

  
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
})
// get all Products
export const getAllProducts = handleAsyncError(async (req, res,next) => {
  // console.log(req.query);
  const resultPerPage=4;
  const apiFeatures=new APIFunctionality(Product.find(),req.query).search().filter();
  // getting filetered query before pagination
  const fileteredQuery=apiFeatures.query.clone();
  // count produt
  const productCount=await fileteredQuery.countDocuments();
  // console.log(productCount);
  const totalPages=Math.ceil(productCount/resultPerPage)
  const page=Number(req.query.page) || 1;
  if (page> totalPages && productCount > 0){
    return next(new HandleError("This page doen't exit ",404))
  }

 // Apply pagination
 apiFeatures.pagination(resultPerPage);

  const products=await apiFeatures.query
  if(!products || products.length===0){
      return next(new HandleError("No Product Found ",404))
  }
  res.status(200).json({
    success: true,
    products,
     productCount,
    resultPerPage,
    totalPages,
    currentPage:page
  });
})
// update product
export const updateProduct = handleAsyncError(async (req, res,next) => {
  
 const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true, // check all validation and accordingly updating the data
  });
  if (!product) {
    // return res.status(500).json({
    //   success: false,
    //   message: "Product not Found",
    // });
     return next(new HandleError("Product Not Found",404))
  }
  res.status(200).json({
    success: true,
    product,
   
  });
})
// Delete Product
export const deleteProduct = handleAsyncError(async (req, res,next) => {
  
  const product = await Product.findByIdAndDelete(req.params.id);
 
  if (!product) {
    return next(new HandleError("Product Not Found",404))
  }
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
})
 
// accessing single product
export const getSingleProduct = handleAsyncError(async (req, res,next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
   return next(new HandleError("Product Not Found",404))
  }
  res.status(200).json({
    success: true,
    product,
  });
}
)
// Creating and Updating Review
export const createReviewForProduct=handleAsyncError(async(req,res,next)=>{
  // console.log(req.body);
  // console.log(req.user.id);
  const {rating,comment,productId}=req.body
  const product=await Product.findById(productId)
  const review={
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment
  }
  // console.log(product);
  
  if(!product){
    return next(new HandleError("Product not found",400))
  }
 const reviewExits=product.reviews.find(review=>review.user.toString()===req.user.id.toString())
if(reviewExits){
product.reviews.forEach(review=>{
  if(review.user.toString()===req.user.id.toString()){
    review.rating=rating,
    review.comment=comment
  }
})
}else{
product.reviews.push(review)

}
product.numOfReviews=product.reviews.length
let sum=0;
product.reviews.forEach(review=>{
  sum+=review.rating
})

product.ratings=product.reviews.length>0?sum/product.reviews.length:0
  await product.save(
   { validateBeforeSave:false}
  )
  res.status(200).json({
    success:true,
    message:"Review added sucessfully .",
    product
  })
  
})
// Getting reviews
export const getReview=handleAsyncError(async(req,res,next)=>{
  const product=await Product.findById(req.query.id)
  if(!product){
    return next(new HandleError("Product Not Found",400))
  }
  const reviews=product.reviews

  
  res.status(200).json({
    success:true,
    reviews
  })
})
//Deleting reviews
export const deleteReview=handleAsyncError(async(req,res,next)=>{

  
  const product=await Product.findById(req.query.productId)
  if(!product){
    return next(new HandleError("Product Not Found",400))
  }
   const reviewId=req.query.id.toString();
  const reviews=product.reviews.filter(review=>review._id.toString()!==reviewId)
// console.log(reviews);
let sum=0;
reviews.forEach(review=>{
  sum+=review.rating
})
const ratings=reviews.length > 0 ?sum/reviews.length : 0

const numOfReviews=reviews.length
await Product.findByIdAndUpdate(req.query.productId,{
  reviews,
  ratings,
  numOfReviews
},{
  new:true,
  runValidators:true
})
res.status(200).json({
  success:true,
  message:"Review Deleted Sucessfully.."
})
})
// Admin get all products
export const getAdminProduct=handleAsyncError(async(req,res,next)=>{
  const products=await Product.find();
  res.status(200).json({
    success:true,
    products
  })
})