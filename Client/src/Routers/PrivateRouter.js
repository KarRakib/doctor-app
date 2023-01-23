import React,{useContext} from 'react';
import {useLocation,Navigate} from "react-router-dom";
import { AuthContext } from '../AuthProvider/AuthProvider';
import Loader from '../Componets/Loader';

const PrivateRouter = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation()
    if(loading){
        return <Loader></Loader>
    }
    if(user){

        return children;
    }
    return <Navigate to='/signin' state={{from:location}} replace></Navigate>
};

export default PrivateRouter;