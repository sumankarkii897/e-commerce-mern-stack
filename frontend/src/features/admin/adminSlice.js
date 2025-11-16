import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


/* Fetch all products */
export const fetchAdminProducts = createAsyncThunk(
  "admin/fetchAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/admin/products");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error while fetching the products"
      );
    }
  }
);
/* Create product */
export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/v1/admin/product/create",
        productData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Product Creation Failed");
    }
  }
);
/* Update Product */
export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.put(
        `/api/v1/admin/product/${id}`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Product Update Failed");
    }
  }
);
/* Delete Product */
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/product/${productId}`);
      return { data, productId };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Product delete Failed");
    }
  }
);
/* Fetch all User */
export const fetchAllUser = createAsyncThunk(
  "admin/fetchAllUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/admin/users");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch users");
    }
  }
);
/* get Single User */
export const getSingleUser = createAsyncThunk(
  "admin/getSingleUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/admin/user/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch Single user"
      );
    }
  }
);
/* Update User Role */
export const updateUserRole = createAsyncThunk(
  "admin/updateUserRole",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/v1/admin/user/${userId}`, {role});
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to Update User Role"
      );
    }
  }
);
/* delete User Profile */
export const deleteUser=createAsyncThunk("admin/deleteUser",async(userId,{rejectWithValue})=>{
  try {
    const {data}=await axios.delete(`/api/v1/admin/user/${userId}`)
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to Delete User")
  }
})
/* Fetch all orders */
export const fetchAllOrders=createAsyncThunk("admin/fetchAllOrders",async(_,{rejectWithValue})=>{
  try {
    const {data}=await axios.get("/api/v1/admin/orders")
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to Fetch Orders")
  }
})
/* Delete Order */
export const deleteOrder=createAsyncThunk("admin/deleteOrder",async(orderId,{rejectWithValue})=>{
  try {
    const {data}=await axios.delete(`/api/v1/admin/order/${orderId}`)
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to Delete Order")
    
  }
})
/* update Orders */
export const updateOrder=createAsyncThunk("admin/updateOrder",async({orderId,status},{rejectWithValue})=>{
  try {
    const config={
      headers:{
        "content-Type":"application/json"
      }
    }
    const {data}=await axios.put(`/api/v1/admin/order/${orderId}`,{status},config)
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to Update Order Status")
  }
})
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    products: [],
    success: false,
    loading: false,
    error: null,
    product: {},
    deleteLoading: false,
    users: [],
    user: {},
    message:null,
    orders:[],
   totalAmount:0,
   order:{},
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = false;
    },
    clearMessage:(state)=>{
      state.message=null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Error while fetching products";
      });
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.products.push(action.payload.product);
        console.log(state.products);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Product Creation Failed";
      });
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.product = action.payload.product;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Product Update Failed.";
      });
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.success = action.payload.success;
        state.products = state.products.filter(
          (product) => product._id !== action.payload.productId
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Product delete Failed";
      });
    builder
      .addCase(fetchAllUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.success=action.payload.success;
        state.users = action.payload.users;
      })
      .addCase(fetchAllUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to Fetch users";
      });
    builder
      .addCase(getSingleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch Single user";
      });
    builder
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to Update User Role";
      });
      builder.addCase(deleteUser.pending,(state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(deleteUser.fulfilled,(state,action)=>{
        state.loading=false;
        state.message=action.payload.message
      })
      .addCase(deleteUser.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload?.message || "Failed to Delete User"
      })
      builder.addCase(fetchAllOrders.pending,(state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(fetchAllOrders.fulfilled,(state,action)=>{
        state.loading=false;
        state.orders=action.payload.orders;
        state.totalAmount=action.payload.totalAmount;
      })
      .addCase(fetchAllOrders.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload?.message || "Failed to Fetch Order Status"
      })
      builder.addCase(deleteOrder.pending,(state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(deleteOrder.fulfilled,(state,action)=>{
        state.loading=false;
       state.success=action.payload.success;
       state.message=action.payload.message;
      })
      .addCase(deleteOrder.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload?.message || "Failed to Fetch Orders"
      })
      builder.addCase(updateOrder.pending,(state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(updateOrder.fulfilled,(state,action)=>{
        state.loading=false;
       state.success=action.payload.success;
       state.order=action.payload.order;
      })
      .addCase(updateOrder.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload?.message || "Failed to Update Orders"
      })
  },
});
export const { removeErrors, removeSuccess,clearMessage } = adminSlice.actions;
export default adminSlice.reducer;
