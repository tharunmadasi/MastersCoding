import react from "react";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import { Outlet } from "react-router-dom";

function Admin() {
  return (
    <div className="admin" id="outer-container">
      <h1>Welcome to Admin Dashboard</h1>
      <AdminSidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"}/>
      <div id="page-wrap">
        <Outlet />
      </div>
    </div>
  );
}
export default Admin;