import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";
/* Register Api*/
export const register=createAsyncThunk('use/register',async(userData,{rejectWithValue})=>{
try {
   const config={
    headers:{
'Content-type':'multipart/form-data'

    }
} 
const {data} =await axios.post('/api/v1/register',userData,config)
console.log("Registration Data",data);
return data

} catch (error) {
    console.log('Registration Error:', error.response?.data, error.message);
    
   return rejectWithValue(error.response?.data || "Registration Failed. Please try again later.")
}})
/* login api */
export const login=createAsyncThunk('user/login',async ({email,password},{rejectWithValue})=>{
   try {
    const config={
        headers:{
            'Content-Type':"application/json"
        }
    }
    const {data}=await axios.post("/api/v1/login",{email,password},config)
    console.log("Login Data",data);
    return data;
    
   } catch (error) {
    return rejectWithValue(error.response?.data || "Login Failed.Please try again later.")
   } 
}
)
export const loadUser=createAsyncThunk("user/loadUser",async(_,{rejectWithValue})=>{
    try {
        const {data}=await axios.get("/api/v1/profile");
        return data
    } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to load User Profile.")

    }
})
export const logout=createAsyncThunk("user/logout",async(_,{rejectWithValue})=>{
    try {
        const {data}=await axios.post("/api/v1/logout",{withCredentials:true});
        return data
    } catch (error) {
            return rejectWithValue(error.response?.data || "Logout Failed.")

    }
})
export const updateProfile=createAsyncThunk("user/updateProfile",async(userData,{rejectWithValue})=>{
    try {
        const config={ 
            headers:{
                'Content-type':'multipart/form-data'
            }
        }
        const {data}=await axios.post("/api/v1/profile/update",userData,config);
        return data
    } catch (error) {
            return rejectWithValue(error.response?.data || {message:"Profile update File.Please try again later."})

    }
})
const userSlice=createSlice({
    name:'user',
    initialState:{
        user:null,
        loading:false,
        error:null,
        success:false,
        isAuthenticated:false,
        message:null
    },
    reducers:{
        removeErrors:(state)=>{
            state.error=null
        },
        removeSuccess:(state)=>{
            state.success=null
        }
    },
    extraReducers:(builder)=>{
        /* Registration Cases */
        builder.addCase(register.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.success=action.payload.success;
            state.user=action.payload?.user || null;
            state.isAuthenticated=Boolean(action.payload?.user);
        })
        .addCase(register.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Registration Failed. Please try again later.";
            state.user=null;
            state.isAuthenticated=false;
        })
        /* Login Case */
    
          builder.addCase(login.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.success=action.payload.success;
            state.user=action.payload?.user || null;
            state.isAuthenticated=Boolean(action.payload?.user);
            console.log(state.user);
            
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Login Failed. Please try again later.";
            state.user=null;
            state.isAuthenticated=false;
        })

    /* loading user */
          builder.addCase(loadUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(loadUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            //state.success=action.payload.success;
            state.user=action.payload?.user || null;
            state.isAuthenticated=Boolean(action.payload?.user);
            
            
        })
        .addCase(loadUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to load User Profile";
            state.user=null;
            state.isAuthenticated=false;
        })
        /* logout user */
          builder.addCase(logout.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(logout.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.user=null;
            state.isAuthenticated=false;
            
            
        })
        .addCase(logout.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to logout";
            
        })
        /* update User Profile*/
         builder.addCase(updateProfile.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(updateProfile.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.user=action.payload?.user || null;
            state.success=action.payload?.success
            state.message=action.payload?.message
        })
        .addCase(updateProfile.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Profile Update Failed . Please try again later.";
            
        })
    }
})

export const {removeErrors,removeSuccess}=userSlice.actions;
export default userSlice.reducer;