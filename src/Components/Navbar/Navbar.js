import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navibar = () => {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbarcss">
      <div className="container-fluid">
        <img
          src="https://thumbs.dreamstime.com/b/training-icon-isolated-white-background-vector-illustration-eps-135858477.jpg"
          width="40px"
          height="40px"
          className="rounded-circle"
        />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse " id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-4">
            {location.pathname === "/" ? (
              <Link className="nav-link" to="/login">
                <button className="btn btn-outline-success btn-sm">
                  <span className="login-text">Login</span>
                </button>
              </Link> ) : (
              <Link className="nav-link" to="/">
                <button className="btn btn-outline-success btn-sm">
                  <span className="login-text">Back</span>
                </button>
              </Link>
            )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navibar;
