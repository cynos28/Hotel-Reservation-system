import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {toast} from "react-toastify";
import authService from './authService';




const initialState = {
    isLoggedIn: false,
    user:null,
    user:[],
    twoFactor:false,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:"",


};
//Register User
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {

    try {
      return await authService.register(userData);
      
    } catch (error) {
      const message = (error.response && error.
      response.data && error.response.data.
      message) || error.message || error.toString();
      
      return thunkAPI.rejectWithValue(message);
      
    }


  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET(state){
        state.twoFactor = false;
        state.isErro = false;
        state.isSuccess = false;
        state.isLoading = false;
        state. message = "";

    }
  },

  extraReducers: (builder) => {
    builder
     .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
     .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        console.log(action.payload);
        toast.success("Registered Successfully");
        
      })
     .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isErro = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })
    //  .addCase(RESET, (state) => {
    //     state.twoFactor = false;
    //     state.isErro = false;
    //     state.isSuccess = false;
    //     state.isLoading = false;
    //     state. message = "";
    //   })
  }
});

export const {RESET} = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer