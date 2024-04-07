import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/home/home';
import Layout from './components/layout/Layout';
import Register from './pages/Auth/Register';
import Forgot from './pages/Auth/Forgot';
import Login from './pages/Auth/Login';
import Reset from './pages/Auth/Reset'
import LoginAuth from './pages/Auth/LoginAuth';
import Profile from './pages/Profile/Profile';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import Events from './pages/events/events';//kaveesha's
import FoodPage from './pages/FoodPage/FoodPage';
import RegisterEvent from './pages/events/RegisterEvent.js';//kaveesha's 
import EventTable from './components/eventTable/addEvent/EventTable.js';




import AddRoom from './components/RoomComponents/addroom/Add';
import AddEvent from './components/eventTable/addEvent/EventAdd.js';  //kaveesha's
import GetRoom from './components/RoomComponents/getroom/Room';
import RoomTable from './components/RoomComponents/getroom/Roomtable';
import Edit from './components/RoomComponents/updateroom/Edit';

import AdminDash from './AdminPanel/Adminpages/AdminDashboard';

import AdminLayout from "./AdminPanel/AdminComponents/AdminLayout/AdminLayout";
import 'remixicon/fonts/remixicon.css';
import Router from './AdminPanel/routes/Router';

import axios from "axios"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Payments 
import AddPayment from './pages/Payments/AddPayment';
import CardDetails from './pages/Payments/CardDetails';
import UpdatePayment from './pages/Payments/UpdatePayment';
import OrderSummary from './pages/Payments/Summary';

axios.defaults.withCredentials = true;


function App() {
  return (

    <div>
      <BrowserRouter>
      <ToastContainer />
        <Routes>

          <Route path="/" element={<Layout>
            <Home />
          </Layout>
          } />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/resetPassword/:resetToken" element={<Reset />} />
          <Route path="/loginAuth/:email" element={<LoginAuth />} />
          {/* events */}
          <Route path='/events' element={<Events/>}/>
          <Route path='/RegisterEvent' element={<RegisterEvent />}/>
          <Route path='/addEvent' element={<AddEvent/>}/>
          <Route path='/EventTable' element={<EventTable/>}/>
          

             
          <Route path="/profile" element={
            <Layout> <Profile /> </Layout>} />
          <Route path="/ChangePassword" element={
            <Layout> <ChangePassword /> </Layout>} />



          {/* events */}
          <Route path='/events' element={<Events />} />
          <Route path='/dashboard' element={<AdminDash />} />
       


          {/* food page */}
          <Route path="/foodpage" element={<FoodPage />} />
          <Route path="/foodpage/search/:searchTerm" element={<FoodPage />} />
          <Route path="/foodpage/tag/:tag" element={<FoodPage />} />

           {/* Room page */}
          <Route path="/getroom" element={<GetRoom />} />
          <Route path="/addroom" element={<AddRoom />} />
          <Route path="/roomtable" element={<RoomTable />} />
          <Route path="/edit/:id" element={<Edit />} />{/* Add the missing closing parenthesis */}

          {/* Payments page */}
          <Route path="/add-payment" element={<AddPayment />} />
          <Route path="/add-payment/order-summary/:payId" element={<OrderSummary/>} />
          <Route path="/card-details" element={<CardDetails />} />
          <Route path="/card-details/update-payment/:id" element={<UpdatePayment/>} />
          




        </Routes>

      </BrowserRouter>




    </div>



  );

}



export default App;
