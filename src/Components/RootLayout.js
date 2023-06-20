import React from 'react'
import Navbar from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
      <Navbar />
      <div style={{minHeight:"67vh"}}>
      <Outlet />
      </div>
    </div>
  )
}

export default RootLayout