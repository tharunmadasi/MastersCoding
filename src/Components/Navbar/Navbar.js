import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";


const Navibar = () => {
  const [isUserLogedin,setIsUserLogedin]=useState(false)
  const [loginRes,setLoginRes] = useState({})
  const location = useLocation();
  const navigate = useNavigate()
  const loadDetails = ()=>{
    console.log('executed')
    let token = localStorage.getItem('token');
    if(token){
      axios
        .post('http://localhost:3500/verifyLoginToken',{token})
        .then((res)=>{
          setLoginRes(res);
          if(res.data.valid === true){
            console.log('token is valid')
            setIsUserLogedin(true);
            let role = res.data.payload.position;
            navigate(`/${role}`);
          }
          else{
            console.log('token is invalid')
            localStorage.clear();
            alert('session expired! please login again')
            setIsUserLogedin(false)
            navigate('/Login')
          }
        })
        .catch((err)=>{console.log('error in Navbar ~',err)})
      }
      else{
        alert('please login to continue!');
        navigate('/Login');
      }
    
  }
  useEffect(loadDetails,[localStorage.getItem('token')])
  return (
    <nav className="navbar navbar-expand-lg navbarcss">
      <div className="container-fluid">
        <img
          alt=""
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
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <button className="btn btn-outline-success btn-sm">
                  <span className="login-text">Home</span>
                </button>
              </Link>
            </li>
            
            {isUserLogedin===false ? (<li className="nav-item">
              <Link className="nav-link" to="/login">
                <button className="btn btn-outline-success btn-sm">
                  <span className="login-text">Login</span>
                </button>
              </Link> </li>
              ) : (<div   className='d-flex'>
              <li className="nav-item">
              <Link className="nav-link" to={`/${loginRes.data.payload.position}`}>
                <button className="btn btn-outline-success btn-sm" >
                  <span className="login-text">Dashboard</span>
                </button>
              </Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/">
              
                <button className="btn btn-outline-success btn-sm" onClick={()=>{localStorage.clear(); navigate('/Login');setIsUserLogedin(false)}}>
                  <span className="login-text">Logout</span>
                </button>
              </Link> 
              </li>
            </div>)}
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navibar;
