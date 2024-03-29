import React from "react";
import Router from "../../routes/Router";
import Sidebar from "../Sidebar/Sidebar";
import TopNav from "../TopNav/TopNav";
import "./AdminLayout.css";


const AdminLayout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main__layout">
        <TopNav />

        <div className="content">
          <Router />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
