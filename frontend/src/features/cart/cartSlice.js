import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios  from "axios"
import { Navigate } from "react-router-dom";
/* add items to cart */
export const addItemsToCart=createAsyncThunk("cart/addItemsToCart",async({id,quantity},{rejectwithValue})=>{
    try {
        const {data}=await axios.get(`/api/v1/product/${id}`);
        console.log('add items to cart',data);
        
        return {
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.image[0].url,
            stock:data.product.stock,
            quantity
        }
    } catch (error) {
        return rejectwithValue(error.response?.data || "Error Occured")
        
    }
})
const cartSlice= createSlice({
name:'cart',
initialState:{
    cartItems:JSON.parse(localStorage.getItem("cartItems"))||[],
    loading:false,
    error:null,
    success:false,
    message:null,
    removingId:null,
    shippingInfo:JSON.parse(localStorage.getItem("cartItems")) ||{}
},
reducers:{
    removeError:(state)=>{
state.error=null
    },
    removeMessage:(state)=>{
        state.message=null
    },
    removeItemsFromCart:(state,action)=>{
        state.removingId=action.payload;
        state.cartItems=state.cartItems.filter((item)=>item.product!=action.payload)
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
        state.removingId=null;


    },
    saveShippingInfo:(state,action)=>{
        state.shippingInfo=action.payload
        localStorage.setItem("shippingInfo",JSON.stringify(state.shippingInfo))

    }
},
extraReducers:(builder)=>{
    /* add items to cart */
    builder.addCase(addItemsToCart.pending,(state)=>{
        state.loading=true;
        state.error=null;
    })
    builder.addCase(addItemsToCart.fulfilled,(state,actions)=>{
const item=actions.payload;
//console.log("item",item);

const existingItem=state.cartItems.find((i)=>i.product === item.product)
if(existingItem){
    existingItem.quantity=item.quantity
    state.message=`Updated ${item.name} quantity in the cart`
}
else{
state.cartItems.push(item);
state.message=`${item.name} added to Cart Successfully`;
}
state.loading=false;
state.error=null;
state.success=true;
localStorage.setItem("cartItems",JSON.stringify(state.cartItems))


    })
    builder.addCase(addItemsToCart.rejected,(state,actions)=>{
        state.loading=false;
        state.error=actions.payload?.message || "Error Occured"

    })
}
})
export const {removeError,removeMessage,removeItemsFromCart,saveShippingInfo}=cartSlice.actions;
export default cartSlice.reducer