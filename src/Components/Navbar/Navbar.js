import React, { useEffect, useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import axios from 'axios'
import "./Navbar.css";


const Navibar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [isUserLogedin, setIsUserLogedin] =useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(!token) navigate('/Login');
    else{
      axios.post('http://localhost:3500/verifyLoginToken',{token})
      .then((res)=>{
        if(res.data.valid === true ) setIsUserLogedin(true);
        else {localStorage.clear();setIsUserLogedin(false);}
        if(res.data.payload.position==='student') navigate('/Student/profile')
        else if(res.data.payload.position==='mentor') navigate('/Mentor/profile1')
        else if(res.data.payload.position==='admin') navigate('/Admin/profile')
      })
      .catch((err)=>{console.log(err)});
    }
  },[localStorage.getItem('token')])
  return (
    <nav className="navbar navbar-expand-lg navbarcss">
      <div className="container-fluid">
        <img
          src="https://thumbs.dreamstime.com/b/training-icon-isolated-white-background-vector-illustration-eps-135858477.jpg"
          width="60px"
          height="60px"
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
            {isUserLogedin?
              <li className="nav-item me-4">
                <Link className="nav-link text-white  fw-bold" onClick={()=>{localStorage.clear();setIsUserLogedin(false);navigate('/Login')}} >
                  Logout
                </Link>
              </li>:
               <li className="nav-item me-4">
               <Link className="nav-link text-white fw-bold" to={'/Login'}>
                 Login
               </Link>
             </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navibar;
