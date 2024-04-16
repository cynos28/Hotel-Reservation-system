import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import emailReducer from "../features/email/emailSlice";
import filterReducer from "../features/auth/filterSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const reducers = combineReducers({
  auth: authReducer,
  email: emailReducer,
  filter: filterReducer,
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
