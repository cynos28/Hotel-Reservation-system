import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  total: 0,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    addPayment(state, action) {
      state.type = action.payload.type;
      state.total = action.payload.total;
    },
    clearPaymentState(state) {
      state.type = "";
      state.total = 0;
    },
  },
});

export const { addPayment, clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
