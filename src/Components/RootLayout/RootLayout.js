import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Style } from 'victory'

function RootLayout() {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default RootLayout