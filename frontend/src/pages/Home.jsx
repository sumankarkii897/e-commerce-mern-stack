import React from 'react'
import Footer from '../components/Footer'
import "../pageStyles/Home.css"
import Navbar from '../components/Navbar'
import ImageSlider from '../components/ImageSlider'
import Product from '../componentStyles/Product'
const  products= [
        {
            "_id": "68d2747123b31920fac88cbf",
            "name": "Shirt",
            "description": "Shirt description ",
            "price": 1500,
            "ratings": 3,
            "image": [
                {
                    "public_id": "This is test id1",
                    "url": "This is test url1",
                    "_id": "68d2747123b31920fac88cc0"
                }
            ],
            "category": "Clothing",
            "stock": 1,
            "numOfReviews": 1,
            "reviews": [
                {
                    "user": "68d2c5a716858458c3161f99",
                    "name": "UKC1",
                    "rating": 3,
                    "comment": "Bad",
                    "_id": "68d4bea3de1e98a1d04e077b"
                }
            ],
            "createdAt": "2025-09-23T10:20:33.857Z",
            "__v": 2,
            "user": "68d2c05ec8a8a5d49eb1f8b9"
        },
        {
            "_id": "68d274ae23b31920fac88cc3",
            "name": "Redme15C",
            "description": "Redme description ",
            "price": 15800,
            "ratings": 0,
            "image": [
                {
                    "public_id": "This is test id2",
                    "url": "This is test url2",
                    "_id": "68d274ae23b31920fac88cc4"
                }
            ],
            "category": "Electronics",
            "stock": 6,
            "numOfReviews": 2,
            "reviews": [ {
                    "user": "68d2c5a716858458c3161f99",
                    "name": "UKC1",
                    "rating": 5,
                    "comment": "Good",
                    "_id": "68d4bea3de1e98a1d04e077b"
                }],
            "createdAt": "2025-09-23T10:21:34.759Z",
            "__v": 0
        },
       {
            "_id": "68d2aaec04ea8264647e7c5a",
            "name": "pant",
            "description": "pant description ",
            "price": 120000,
            "ratings": 0,
            "image": [
                {
                    "public_id": "This is test id6",
                    "url": "This is test url6",
                    "_id": "68d2aaec04ea8264647e7c5b"
                }
            ],
            "category": "Clothing",
            "stock": 1,
            "numOfReviews": 0,
            "user": "68d2737a23b31920fac88cb4",
            "reviews": [],
            "createdAt": "2025-09-23T14:13:00.516Z",
            "__v": 0
        },
       {
            "_id": "68d274e223b31920fac88cc7",
            "name": "Acer Nitro 5",
            "description": "Acer Laptop description ",
            "price": 120000,
            "ratings": 0,
            "image": [
                {
                    "public_id": "This is test id3",
                    "url": "This is test url3",
                    "_id": "68d274e223b31920fac88cc8"
                }
            ],
            "category": "Electronics",
            "stock": 1,
            "numOfReviews": 0,
            "reviews": [],
            "createdAt": "2025-09-23T10:22:26.925Z",
            "__v": 0
        }]
function Home() {
  return (
    <>
    <Navbar/>
    <ImageSlider/>
    <div className="home-container">
      <h2 className="home-heading">
        Trending Now
      </h2>
      <div className="home-product-container">
       {products.map((product,index)=>(
        <Product product={product} key={index}/>
       ) )}
      </div>
    </div>
    <Footer/>
    </>
    
  )
}

export default Home