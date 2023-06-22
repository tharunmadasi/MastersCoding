import React from 'react'
import Navbar from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
      <Navbar />
      <div className='bg-secondary bg-opacity-50' style={{minHeight:"89.4vh"}}>
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout