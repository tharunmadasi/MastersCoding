import React from "react";
import "./Student.css";
import { Outlet } from "react-router-dom";
import StudentSidebar from "./StudentSidebar/StudentSidebar";
function Student() {
  return(
  <div className="admin " id="outer-container" >
    <h1 >Welcome to Student Dashboard</h1>
    <hr className="m-0 p-0" />
    <StudentSidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"}/>
    <div id="page-wrap" >
      <Outlet />
    </div>
</div>
)
}
export default Student;
