import React from 'react';
import './StdSidebar.css';
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
      <Link className="menu-item" to="Classes">
        Classes
      </Link>
    </Menu>
  );
};