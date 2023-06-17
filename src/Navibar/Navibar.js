import React from 'react'
import { Link } from 'react-router-dom'
import './Navibar.css'

function Navibar() {


  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-info">
  <div className="container-fluid">
    <img src='https://thumbs.dreamstime.com/b/training-icon-isolated-white-background-vector-illustration-eps-135858477.jpg'  width='60px' height='60px' className='rounded-circle'/>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
    <span className="navbar-toggler-icon"></span>
    </button>
    <div className="navbar-collapse collapse " id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item me-4">
          <Link className="nav-link text-white" to="/">Home</Link>
        </li>
        <li className="nav-item me-4">
          <Link className="nav-link text-white" to="/login">Login</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</div>
  )
}

export default Navibar