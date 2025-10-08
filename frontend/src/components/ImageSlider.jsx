import React, { useEffect, useState } from 'react'
import "../componentStyles/ImageSlider.css"
const images=[
    "./images/banner1.jpg",
    "./images/banner2.jpg",
   
    "./images/banner4.jpg"
]
function ImageSlider() {
    const [currentIndex,setCurrentIndex]=useState(0)
    useEffect(()=>{
        const interval=setInterval(()=>{
setCurrentIndex((prevIndex)=>(prevIndex+1) % images.length)
        },5000)
        return ()=>clearInterval(interval)
    },[])
  return (
    <div className="image-slider-container">
        <div className="slider-images" style={{transform:`translateX(-${currentIndex*100}%)`}}>
           {images.map((image,index)=>(<div className="slider-item" key={index}>
                <img src={image} alt={`Slide ${index+1}`} />
            </div>))}
            <div className="slider-dots">
                <span className="dot"/>
            </div>

        </div>
    </div>
  )
}

export default ImageSlider
