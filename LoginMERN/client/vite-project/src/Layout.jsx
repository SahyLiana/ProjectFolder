import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./layout.scss";

function Layout() {
  return (
    <div className="layout-container">
      <div className="nav">
        <Navbar />
      </div>
      <div className="outlet">
        <Outlet />
      </div>
      {/* <Navbar /> */}
      {/* <Outlet /> */}
    </div>
  );
}

export default Layout;
