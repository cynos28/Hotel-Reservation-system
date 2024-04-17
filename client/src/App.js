import React, { Component, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/home/home";
import Layout from "./components/layout/Layout";

import Register from "./pages/Auth/Register";
import Forgot from "./pages/Auth/Forgot";
import Login from "./pages/Auth/Login";
import Reset from "./pages/Auth/Reset";
import Profile from "./pages/Profile/Profile";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Contactus from "./pages/ContactUs/contactus.js";
import Gallery from "./pages/gallery/Gallery.js";

import Events from "./pages/events/events"; //kaveesha's
import RegisterEvent from "./pages/events/RegisterEvent.js"; //kaveesha's
import EventTable from "./components/eventTable/addEvent/EventTable.js";
import EditEvent from "./components/eventTable/addEvent/EditEvent.js";

import Verify from "./pages/Auth/Verify.js";

import AddRoom from "./components/RoomComponents/addroom/Add";
import GetRoom from "./components/RoomComponents/getroom/Room";
import RoomTable from "./components/RoomComponents/getroom/Roomtable";
import Edit from "./components/RoomComponents/updateroom/Edit";
import RoomDetails from "./components/RoomComponents/getroom/RoomDetails.js";


import AddEvent from "./components/eventTable/addEvent/EventAdd.js"; //kaveesha's

import AddFood from "./pages/FoodAdmin/AddFood/AddFood.js"
import FoodTable from "./pages/FoodAdmin/FoodTable/FoodTable.js";
import Foods from "./pages/FoodUser/Food/Foods.js"
import FoodDetails from "./pages/FoodUser/Food/FoodDetails.js"
import AddToCart from "./pages/FoodUser/FoodCart/FoodAddtoCart.js"
import FoodCarts from "./pages/FoodUser/FoodCart/FoodCarts.js"
import FoodAddDelivery from "./pages/FoodUser/FoodAddDelivery/FoodAddDelivery.js"
import FoodEditCartItem from "./pages/FoodUser/FoodCart/FoodEditCatrItem.js"


import AdminDash from "./AdminPanel/Adminpages/AdminDashboard";
import AdminLayout from "./AdminPanel/AdminComponents/AdminLayout/AdminLayout";
import "remixicon/fonts/remixicon.css";
import Router from "./AdminPanel/routes/Router";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from "./redux/features/auth/authSlice";
import useRedirectLoggedOutUser from "./customHook/useRedirectLoggedOutUser.js";
import UserList from "./pages/userList/UserList.js";
import LoginWithCode from "./pages/Auth/LoginWithCode.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

import AdminPayment from "./AdminPanel/Adminpages/payments";
import AddCard from "./pages/Payments/AddCard";
import AddPayment from "./pages/Payments/AddPayment";
import CardDetails from "./pages/Payments/CardDetails";
import PaymentSummary from "./pages/Payments/PaymentSummary";

import AddRate from "./pages/Review/Add-Rates/AddRate.js";
import FindReview from "./pages/Review/FindReview/FindReview.js";
import RateDetails from "./pages/Review/RateDetails/RateDetails.js";
import UpdateReview from "./pages/Review/UpdateReview/UpdateReview.js";

//BookingUser
import AddBooking from "./components/BookingUser/AddBooking/AddBooking.js";
import MyBooking from "./components/BookingUser/Booking/MyBooking.js";
          
//BookingAdmin
import Booking from "./components/BookingAdmin/Booking/Booking/Bookings.js";
import UpdateBooking from "./components/BookingAdmin/Booking/Booking/UpdateBooking.js";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  return (
    <div>

      <BrowserRouter>
        <ToastContainer />
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />

            {/* Authentication */}

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/reset/:resetToken" element={<Reset />} />
            <Route path="/loginWithCode/:email" element={<LoginWithCode />} />
            <Route
              path="/profile"
              element={
                <Layout>
                  {" "}
                  <Profile />{" "}
                </Layout>
              }
            />
            <Route
              path="/ChangePassword"
              element={
                <Layout>
                  {" "}
                  <ChangePassword />{" "}
                </Layout>
              }
            />
            <Route
              path="/verify/:verificationToken"
              element={
                <Layout>
                  <Verify />
                </Layout>
              }
            />
            <Route
              path="/users"
              element={
                <Layout>
                  {" "}
                  <UserList />{" "}
                </Layout>
              }
            />
            <Route path="/contactUs" element={<Contactus />} />
            <Route path="/gallery" element={<Gallery />} />

            {/* events */}
            <Route path="/events" element={<Events />} />
            <Route path="/RegisterEvent" element={<RegisterEvent />} />
            <Route path="/addEvent" element={<AddEvent />} />
            <Route path="/EventTable" element={<EventTable />} />
            <Route path="/EventTable/EditEvent/:id" element={<EditEvent />} />

            {/* events */}
            <Route path="/events" element={<Events />} />
            <Route path="/dashboard" element={<AdminDash />} />

            {/* Room page */}

            <Route path="/getroom" element={<GetRoom />} />
            <Route path="/addroom" element={<AddRoom />} />
            <Route path="/roomtable" element={<RoomTable />} />
            <Route exact path="/room-details/:id" element={<RoomDetails />} />


            <Route path="/edit/:id" element={<Edit />} />
            {/* Add the missing closing parenthesis */}

            {/* Payments related pages */}
            <Route path="/dashboard/payments" element={<AdminPayment />} />
            <Route
              path="/add-payment/summary/:paymentId"
              element={<PaymentSummary />}
            />
            <Route path="/card-details" element={<CardDetails />} />
            <Route path="/add-card" element={<AddCard />} />
            <Route path="/update-card/:cardId" element={<AddCard />} />
            <Route path="/add-payment" element={<AddPayment />} />

            {/* This path should be updated as bookings/:bookingId/add-payment */}

            <Route path="/edit/:id" element={<Edit />} />{/* Add the missing closing parenthesis */}



            {/* Food Ordering Kavish*/}

            {/* Admin-Food Adding */}
            <Route exact path="/add-food" element={<AddFood />} />
            <Route exact path="/admin-foods" element={<FoodTable />} />

            {/* User-Food Display,Order */}
            <Route exact path="/foods" element={<Foods />} />
            <Route exact path="/food-details/:id" element={<FoodDetails />} />
            <Route exact path="/add-to-cart" element={<AddToCart />} />
            <Route exact path="/view-cart" element={<FoodCarts />} />
            <Route exact path="/add-delivery" element={<FoodAddDelivery />} />
            <Route path="/update-cart/:id" element={<FoodEditCartItem />} />

           {/* Add review charuka*/} 
           <Route path="/allrate" element={<RateDetails />} />
          <Route path="/rates" element={<AddRate />} />
          <Route path="/findrate" element={<FindReview />} />
          <Route path="/updatereview/:id" element = {<UpdateReview/>}/>



          {/* BookingUser Route */}
          <Route exact path="/booking" element={<AddBooking />} />
          <Route exact path="/my-booking/:id" element={<MyBooking />} />

            {/* Admin Routes */}
          <Route exact path="/view-booking" element={<Booking />} />
          <Route exact path="/update-room/:id" element={<UpdateBooking />} />

          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
