import { createSlice } from '@reduxjs/toolkit'

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
});

export const {} = authSlice.actions

export default authSlice.reducer