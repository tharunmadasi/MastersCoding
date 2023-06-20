import React from "react";
import { Outlet } from "react-router-dom";
import "./Mentor.css";
import SideBar1 from "../SideBar1/SideBar1";

function mentor() {
  return(
    <div className="mentor" id="outer-container">
      <h1> Welcome to Mentor Dashboard</h1>
      <SideBar1 pagewrapId={"page-wrap"} outercontainerId={"outer-container"} />
      <div id="page-wrap">
          <Outlet />
      </div>
    </div>
  );
}
export default mentor;
