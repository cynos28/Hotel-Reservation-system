import React, { Component, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from './pages/home/home';
import Layout from './components/layout/Layout';
import Register from './pages/Auth/Register';
import Forgot from './pages/Auth/Forgot';
import Login from './pages/Auth/Login';
import Reset from './pages/Auth/Reset'
import Profile from './pages/Profile/Profile';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import Events from './pages/events/events';//kaveesha's
import RegisterEvent from './pages/events/RegisterEvent.js';//kaveesha's 
import EventTable from './components/eventTable/addEvent/EventTable.js';
import EditEvent from './components/eventTable/addEvent/EditEvent.js';

import Verify from "./pages/Auth/Verify.js";



import AddRoom from './components/RoomComponents/addroom/Add';
import GetRoom from './components/RoomComponents/getroom/Room';
import RoomTable from './components/RoomComponents/getroom/Roomtable';
import Edit from './components/RoomComponents/updateroom/Edit';



import AddEvent from './components/eventTable/addEvent/EventAdd.js';  //kaveesha's


import AdminDash from './AdminPanel/Adminpages/AdminDashboard';
import AdminLayout from "./AdminPanel/AdminComponents/AdminLayout/AdminLayout";
import 'remixicon/fonts/remixicon.css';
import Router from './AdminPanel/routes/Router';
import axios from "axios"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from "./redux/features/auth/authSlice";
import useRedirectLoggedOutUser from './customHook/useRedirectLoggedOutUser.js';
import UserList from './pages/userList/UserList.js';
import LoginWithCode from './pages/Auth/LoginWithCode.js';
import { GoogleOAuthProvider } from "@react-oauth/google";

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

          <Route path="/" element={<Layout>
            <Home />
          </Layout>
          } />

          {/* Authentication */}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset/:resetToken" element={<Reset />} />
          <Route path="/loginWithCode/:email" element={<LoginWithCode />} />
          <Route path="/profile" element={<Layout> <Profile /> </Layout>} />
          <Route path="/ChangePassword" element={<Layout> <ChangePassword /> </Layout>} />
          <Route path="/verify/:verificationToken" element={<Layout><Verify /></Layout>}/>
          <Route path="/users" element={ <Layout> <UserList /> </Layout> }/>

          {/* events */}
          <Route path='/events' element={<Events />} />
          <Route path='/RegisterEvent' element={<RegisterEvent />} />
          <Route path='/addEvent' element={<AddEvent />} />
          <Route path='/EventTable' element={<EventTable />} />
          <Route path='/EventTable/EditEvent/:id' element={<EditEvent />} />



         



          {/* events */}
          <Route path='/events' element={<Events />} />
          <Route path='/dashboard' element={<AdminDash />} />




       

           {/* Room page */}

          <Route path="/getroom" element={<GetRoom />} />
          <Route path="/addroom" element={<AddRoom />} />
          <Route path="/roomtable" element={<RoomTable />} />
          <Route path="/edit/:id" element={<Edit />} />{/* Add the missing closing parenthesis */}



        </Routes> 
        </GoogleOAuthProvider>

      </BrowserRouter>




    </div>



  );

}



export default App;
