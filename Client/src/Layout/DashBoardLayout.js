import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAdmin from '../hook/useAdmin';
import Navbar from '../Sheared/Navbar/Navbar'
const DashBoardLayout = () => {
    const { user } = useContext(AuthContext)
    const [isAdmin] = useAdmin(user?.email)
    console.log(user.email);
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col ">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                    <li><Link to='/dashboard'>My Appointment</Link></li>
                        {
                            isAdmin &&
                            <>
                                <li><Link to='/dashboard/allusers'>  All User </Link></li>
                                <li><Link to='/dashboard/add-doctor'> Add Doctor</Link></li>
                                <li><Link to='/dashboard/manage-doctor'>Doctor Manage</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>


        </div>
    );
};

export default DashBoardLayout;