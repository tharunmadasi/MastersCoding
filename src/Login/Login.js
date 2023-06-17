import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Login.css'

function Login() {

  const navi=useNavigate()
  let nav=()=>{
    navi('/')
  }

  return (
      <div className="card border border-info">

        <nav className="navbar navbar-expand-md bg-info">
        <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavi">
    <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavi">
      <ul className="nav navbar-nav nav-tabs">
        <li className="nav-item ms-4 me-4">
          <Link className="nav-link text-white" to="/">Student</Link>
        </li>
        <li className="nav-item ms-4 me-4">
          <Link className="nav-link text-white" to="">Mentor</Link>
        </li>
        <li className="nav-item ms-4 me-4">
          <Link className="nav-link text-white" to="">Admin</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
        
<div className="card-body">
    <p className='mt-4 sel'>Select your role to login or signup</p>
  </div>
  
</div>
  )
}

export default Login