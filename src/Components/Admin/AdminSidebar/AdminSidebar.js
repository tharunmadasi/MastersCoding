import React from 'react';
import './AdminSidebar.css';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

export default props => {
  return (
    <Menu>
      <Link className="menu-item" to="profile">
        Profile
      </Link>
      <Link className="menu-item" to="assignments">
        Assignments
      </Link>
      <Link className="menu-item" to="attendance">
        Attendance
      </Link>
      <Link className="menu-item" to="batch-report">
        Batch-Report
      </Link>
      <Link className="menu-item" to="classes">
        Classes
      </Link>
    </Menu>
  );
};