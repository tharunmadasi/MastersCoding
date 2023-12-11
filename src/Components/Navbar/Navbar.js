import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";

const Navibar = () => {
  const [isUserLogedin, setIsUserLogedin] = useState(false);
  const [loginRes, setLoginRes] = useState({});
  const navigate = useNavigate();
  const loadDetails = () => {
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:3500/verifyLoginToken", { token })
        .then((res) => {
          setLoginRes(res);
          if (res.data.valid === true) {
            console.log("token is valid");
            setIsUserLogedin(true);
            let role = res.data.payload.position;
            navigate(`/${role}/assignments`);
          } else {
            console.log("token is invalid");
            localStorage.clear();
            setIsUserLogedin(false);
            navigate("/Login");
          }
        })
        .catch((err) => {
          console.log("error in Navbar ~", err);
        });
    } else {
      navigate("/Login");
    }
  };
  useEffect(loadDetails, [localStorage.getItem("token")]);
  return (
    <nav className="navbar navbar-expand-lg navbarcss">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            alt=""
            src="https://thumbs.dreamstime.com/b/training-icon-isolated-white-background-vector-illustration-eps-135858477.jpg"
            width="40px"
            height="40px"
            className="rounded-circle logo"
          />
        </Link>
        {isUserLogedin === true ? (
          <h2
            style={{
              position: "absolute",
              left: "40%",
              color: "#3C6255",
              marginTop: "5px",
            }}
          >
            Welcome {loginRes.data.payload.position}!
          </h2>
        ) : null}
        <div className="navbar-collapse collapse " id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <button className="btn btn-outline-success btn-sm">
                  <span className="login-text">Home</span>
                </button>
              </Link>
            </li>

            {isUserLogedin === false ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <button className="btn btn-outline-success btn-sm">
                    <span className="login-text">Login</span>
                  </button>
                </Link>{" "}
              </li>
            ) : (
              <div className="d-flex">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/${loginRes.data.payload.position}`}
                  >
                    <button className="btn btn-outline-success btn-sm">
                      <span className="login-text">Dashboard</span>
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => {
                        localStorage.clear();
                        navigate("/Login");
                        setIsUserLogedin(false);
                      }}
                    >
                      <span className="login-text">Logout</span>
                    </button>
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navibar;
