import React, { useEffect } from 'react'
import "../pageStyles/Products.css"
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { getProduct, removeErrors } from '../features/products/productSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { useLocation } from 'react-router-dom'

function Products() {
    const {loading,error,products}=useSelector(state=>state.product)
    const dispatch=useDispatch();
    const location=useLocation();
   const searchParams= new URLSearchParams(location.search);
  const keyword=searchParams.get("keyword")
  console.log(keyword);
  
   
    useEffect(()=>{
        dispatch(getProduct())
    },[dispatch])
    useEffect(()=>{
        if(error){
            toast.error(error.message,{
                position:'top-center',
                autoClose:3000
            })
            dispatch(removeErrors())
        }
    },[dispatch,error])
  return (
    <>
      {  loading?<Loader/>:(<>
    {/* <PageTitle title="Products"/> */}
  <Navbar/>
  <div className="products-layout">

    <div className="filter-section">
        <h3 className="filter-heading">CATEGORIES</h3>
        {/* rendering categories
         */}
          </div>
         <div className="products-section">
            <div className="products-product-container">
{products.map((product)=>(
<Product key={product._id} product={product}/>
))}
           
         </div>
    </div>
  </div>
  <Footer/>
    </>)}
    </>

  )
}

export default Products