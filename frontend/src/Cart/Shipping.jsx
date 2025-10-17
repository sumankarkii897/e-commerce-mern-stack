import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import "../CartStyles/Shipping.css"
import PageTitle from "../components/PageTitle"
import CheckoutPath from './CheckoutPath'
import { useDispatch, useSelector } from 'react-redux'
import { Country, State, City }  from 'country-state-city';
import {toast} from "react-toastify"
import {saveShippingInfo} from "../features/cart/cartSlice"
import { useNavigate } from 'react-router-dom'
function Shipping() {
  const {shippingInfo}=useSelector(state=>state.cart)
  // console.log("Shipping Info ",shippingInfo);
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [address,setAddress]=useState(shippingInfo.address || "")
  const [pinCode,setPinCode]=useState(shippingInfo.pinCode || "")
  const [phoneNo,setPhoneNo]=useState(shippingInfo.phoneNo || "")
  const [country,setCountry]=useState(shippingInfo.country || "")
  const [state,setState]=useState(shippingInfo.state || "")
  const [city,setCity]=useState(shippingInfo.city || "")
  const [activePath,setActivePath]=useState(0)
  
  const shippingInfoSubmit=(e)=>{
    e.preventDefault();
    if(!address || !pinCode || !phoneNo || !country || !state || !city){
      toast.error("All field are required.",{
        position:"top-center",
        autoClose:3000
      })
      return
    }
    if(phoneNo.length !==10){
      toast.error("Phone number must be of 10 digits.",{
        position:"top-center",
        autoClose:3000
      })
      return
    }
setActivePath((aPath)=>aPath+1)
// console.log("handleship");
// console.log(activePath);
dispatch(saveShippingInfo({address,pinCode,phoneNo,country,state,city}))
    navigate("/order/confirm")

  }
  const countries=Country.getAllCountries()
  const states=State.getStatesOfCountry(country)
 const cities = City.getCitiesOfState(country, state)


  return (
   <>
   <PageTitle title={"Shipping Info"}/>
   <Navbar/>
   <CheckoutPath activePath={activePath}/>
<div className="shipping-form-container">
  <h1 className="shipping-form-header">Shipping Details</h1>
  <form className="shipping-form" onSubmit={shippingInfoSubmit}>
    <div className="shipping-section">
      <div className="shipping-form-group">
        <label htmlFor="address">Address</label>
        <input type="text" name="address" id="address" placeholder='Enter your address'value={address} onChange={(e)=>setAddress(e.target.value)} />
      </div>
      <div className="shipping-form-group">
        <label htmlFor="pinCode">PinCode</label>
        <input type="number" name="pinCode" id="pinCode" placeholder='Enter your pinCode' value={pinCode} onChange={(e)=>setPinCode(e.target.value)}/>
      </div>
      <div className="shipping-form-group">
        <label htmlFor="phoneNo">Phone No</label>
        <input type="number" name="phoneNo" id="phoneNo" placeholder='Enter your phone Number'value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)} />
      </div>
    </div>
    <div className="shipping-section">
      <div className="shipping-form-group">
        <label htmlFor="country">Country</label>
        <select name="country" id="country" value={country} onChange={(e)=>{setCountry(e.target.value)
          setState("")
          setCity("")
        }}>
          <option value="">Select a Country</option>
          {/* <option value="Nepal">Nepal</option>
          <option value="India">India</option>
          <option value="US">USA</option> */}
          {
           Country && countries.map((country)=>(
              <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
            ))
          }
        </select>
      </div>
      {country && <div className="shipping-form-group">
        <label htmlFor="state">State</label>
        <select name="state" id="state" value={state} onChange={(e)=>{setState(e.target.value)
          setCity("")
        }}>
          <option value="">Select a State</option>
          {
            State && states.map((state)=>(
              <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
            ))
          }
        </select>
      </div>}
    { state && <div className="shipping-form-group">
        <label htmlFor="city">city</label>
        <select name="city" id="city" value={city} onChange={(e)=>setCity(e.target.value)}>
          <option value="">Select a city</option>
          {
City && cities.map((city)=>(
  <option key={city.name} value={city.name}>{city.name}</option>
))
          }
        </select>
      </div>}
    </div>
    <button className="shipping-submit-btn">Continue</button>
  </form>
</div>
   <Footer/>
   </>
  )
}

export default Shipping