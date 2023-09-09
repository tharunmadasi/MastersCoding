import React from "react";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import { Outlet } from "react-router-dom";

function Admin() {
  return (
    <div className="admin" id="outer-container">
      <AdminSidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"}/>
      <div id="page-wrap">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
