import React from "react";
import "./Student.css";
import { Outlet } from "react-router-dom";
import StudentSidebar from "./StudentSidebar/StdSidebar";
function Student() {
  return(
  <div className="admin " id="outer-container" >
    <StudentSidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"}/>
    <div id="page-wrap" >
      <Outlet />
    </div>
</div>
)
}
export default Student;