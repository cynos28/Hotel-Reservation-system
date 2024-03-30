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
import Events from './pages/events/events';
import FoodPage from './pages/FoodPage/FoodPage';



// import AdminLayout from "./AdminPanel/AdminComponents/AdminLayout/AdminLayout";
// import 'remixicon/fonts/remixicon.css';
// import AddRoom from './AdminPanel/AdminComponents/RoomComponents/addroom/Add';
// import GetRoom from './AdminPanel/Adminpages/AdminDashboard';
// import Edit from './AdminPanel/AdminComponents/RoomComponents/updateroom/Edit';
// import RoomTable from './AdminPanel/AdminComponents/RoomComponents/getroom/Roomtable';
// import Router from './AdminPanel/routes/Router';



function App() {
  return (
    
    <div>
      <BrowserRouter>
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
          
          {/* <Route path='/dashboard' element={<GetRoom/>}/>
          <Route path='/addroom' element={<AddRoom/>}/> */}
          
             

          <Route path="/profile" element={
            <Layout> <Profile /> </Layout>
          } />
          
           <Route path="/ChangePassword" element={
            <Layout> <ChangePassword /> </Layout>
          } />

           {/* food page */}
           <Route path="/foodpage" element={<FoodPage/>}/>
           <Route path="/foodpage/search/:searchTerm" element={<FoodPage/>}/>
           <Route path="/foodpage/tag/:tag" element={<FoodPage/>}/>

        </Routes>
        
      </BrowserRouter>

      

    
    </div>
    


  );

}



export default App;
