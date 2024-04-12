import "remixicon/fonts/remixicon.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Component } from "react";

import AddCard from "./pages/Payments/AddCard";
import AddEvent from "./components/eventTable/addEvent/EventAdd.js";
import AddPayment from "./pages/Payments/AddPayment";
import AddRoom from "./components/RoomComponents/addroom/Add";
import AdminDash from "./AdminPanel/Adminpages/AdminDashboard";
import AdminLayout from "./AdminPanel/AdminComponents/AdminLayout/AdminLayout";
import AdminPayment from "./AdminPanel/Adminpages/payments";
import CardDetails from "./pages/Payments/CardDetails";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Edit from "./components/RoomComponents/updateroom/Edit";
import EventTable from "./components/eventTable/addEvent/EventTable.js";
import Events from "./pages/events/events";
import FoodPage from "./pages/FoodPage/FoodPage";
import Forgot from "./pages/Auth/Forgot";
import GetRoom from "./components/RoomComponents/getroom/Room";
import Home from "./pages/home/home";
import Layout from "./components/layout/Layout";
import Login from "./pages/Auth/Login";
import LoginAuth from "./pages/Auth/LoginAuth";
import PaymentSummary from "./pages/Payments/PaymentSummary";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Auth/Register";
import RegisterEvent from "./pages/events/RegisterEvent.js";
import Reset from "./pages/Auth/Reset";
import RoomTable from "./components/RoomComponents/getroom/Roomtable";
import Router from "./AdminPanel/routes/Router";
import { ToastContainer } from "react-toastify";
import axios from "axios";

//kaveesha's

//kaveesha's

//kaveesha's

//Payments

axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
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
          <Route path="/resetPassword/:resetToken" element={<Reset />} />
          <Route path="/loginAuth/:email" element={<LoginAuth />} />
          {/* events */}
          <Route path="/events" element={<Events />} />
          <Route path="/RegisterEvent" element={<RegisterEvent />} />
          <Route path="/addEvent" element={<AddEvent />} />
          <Route path="/EventTable" element={<EventTable />} />
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
          {/* events */}
          <Route path="/events" element={<Events />} />
          <Route path="/dashboard" element={<AdminDash />} />

          {/* food page */}
          <Route path="/foodpage" element={<FoodPage />} />
          <Route path="/foodpage/search/:searchTerm" element={<FoodPage />} />
          <Route path="/foodpage/tag/:tag" element={<FoodPage />} />
          {/* Room page */}
          <Route path="/getroom" element={<GetRoom />} />
          <Route path="/addroom" element={<AddRoom />} />
          <Route path="/roomtable" element={<RoomTable />} />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
