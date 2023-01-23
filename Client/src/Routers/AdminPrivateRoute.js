import React,{useContext} from 'react';
import {useLocation,Navigate} from "react-router-dom";
import { AuthContext } from '../AuthProvider/AuthProvider';
import Loader from '../Componets/Loader'
import useAdmin from '../hook/useAdmin';

const AdminPrivateRouter = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const [isAdmin,isAdminLoading]= useAdmin(user?.email)
    const location = useLocation()
    if(loading || isAdminLoading){
        return <Loader></Loader>
    }
    if(user && isAdmin){

        return children;
    }
    return <Navigate to='/signin' state={{from:location}} replace></Navigate>
};

export default AdminPrivateRouter;