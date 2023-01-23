import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Sheared/Footer/Footer'
import Navbar from '../Sheared/Navbar/Navbar'

function Main({handelDark}) {
  return (
    <div>
    <Navbar handelDark={handelDark}></Navbar>
    <Outlet></Outlet>
    <Footer></Footer>
    </div>
  )
}

export default Main