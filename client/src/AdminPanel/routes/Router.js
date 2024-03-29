import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../Adminpages/AdminDashboard";
import AddRoom from "../AdminComponents/RoomComponents/addroom/Add";
import GetRoom from "../AdminComponents/RoomComponents/getroom/Room";
import RoomTable from "../AdminComponents/RoomComponents/getroom/Roomtable";
import Edit from "../AdminComponents/RoomComponents/updateroom/Edit";

const Router = () => {
  return (
    <Routes>
      
      <Route path="/dashboard" element={<Dashboard />} />   
      <Route path="/addroom" element={<AddRoom />} />
      <Route path="/getroom" element={<GetRoom />} />
      <Route path="/roomtable" element={<RoomTable />} />
      <Route path="/edit/:id" element={<Edit />} />{/* Add the missing closing parenthesis */}
    </Routes>
  );
};

export default Router;
