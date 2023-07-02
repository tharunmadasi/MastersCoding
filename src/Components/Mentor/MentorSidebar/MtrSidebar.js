import React from 'react';
import './MtrSidebar.css';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

export default props => {
  return (
    <Menu>
      <Link className="menu-item" to="profile1">
        Profile
      </Link>
      <Link className="menu-item" to="assignments1">
        Assignments
      </Link>
      <Link className="menu-item" to="batch-report1">
        Batch-Report
      </Link>
      <Link className="menu-item" to="submissions">
        Submissions
      </Link>
    </Menu>
  );
};