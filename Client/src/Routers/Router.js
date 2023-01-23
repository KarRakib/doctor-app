import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Appointment from '../Appointment/Appointment/Appointment'
import Main from '../Layout/Main'
import Home from '../Pages/Home/Home/Home'
import Register from '../Pages/Register/Register'
import LogIn from '../Pages/LogIn/LogIn'
import Reviews from '../Pages/Reviews/Reviews'
import PrivateRouter from './PrivateRouter'
import DashBoardLayout from '../Layout/DashBoardLayout'
import DashBoard from '../DashBoard/DashBoard/DashBoard'
import Alluser from '../DashBoard/Allusers/Alluser'
import AddDoctor from '../DashBoard/AddDoctor/AddDoctor'
import AdminPrivateRouter from './AdminPrivateRoute'
import ManageDoctor from '../DashBoard/ManageDoctor/ManageDoctor'
import Payment from '../DashBoard/Payment/Payment'
import DisplayError from '../Sheared/DisplayError/DisplayError'
import About from '../Pages/Home/About/About'
import Footer from '../Sheared/Footer/Footer'


function Router({ handelDark }) {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main handelDark={handelDark}></Main>,
      errorElement: <DisplayError></DisplayError>,
      children: [
        {
          path: '/',
          element: <Home ></Home>
        },
        {
          path: '/about',
          element: <About></About>
        },
        {
          path: '/appointment',
          element: <Appointment></Appointment>
        },
        {
          path: '/signup',
          element: <Register></Register>
        },
        {
          path: '/contact',
          element: <Footer></Footer>
        },
        {
          path: '/signin',
          element: <LogIn></LogIn>
        },
        {
          path: '/reviews',
          element: <PrivateRouter><Reviews></Reviews></PrivateRouter>
        }
      ]
    },
    {
      path: '/dashboard',
      element: <PrivateRouter><DashBoardLayout></DashBoardLayout> </PrivateRouter>,
      errorElement: <DisplayError></DisplayError>,
      children: [
        {
          path: '/dashboard',
          element: <DashBoard></DashBoard>
        },
        {
          path: '/dashboard/allusers',
          element: <AdminPrivateRouter><Alluser></Alluser> </AdminPrivateRouter>
        }, {
          path: '/dashboard/add-doctor',
          element: <AddDoctor></AddDoctor>
        }, {
          path: '/dashboard/manage-doctor',
          element: <ManageDoctor></ManageDoctor>
        }
        , {
          path: '/dashboard/payment/:id',
          element: <Payment></Payment>,
          loader: ({ params }) => fetch(`https://doctor-server-zeta.vercel.app/payment/${params.id}`)
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default Router