import React from 'react'
import Navibar from './Navibar/Navibar'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
      <Navibar />
      <div style={{minHeight:"67vh"}}>
      <Outlet />
      </div>
    </div>
  )
}

export default RootLayout