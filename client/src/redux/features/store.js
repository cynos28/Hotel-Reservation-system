import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "../features/auth/authSlice";
import emailReducer from "../features/email/emailSlice";
import filterReducer from "../features/auth/filterSlice";
import paymentReducer from "../features/payment/paymentSlice";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  auth: authReducer,
  email: emailReducer,
  filter: filterReducer,
  payment: paymentReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
