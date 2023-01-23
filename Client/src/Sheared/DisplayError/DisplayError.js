import React, { useContext } from 'react';
import { useRouteError } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const DisplayError = () => {
    const error = useRouteError();
    const { userSingOut } = useContext(AuthContext)
    const handelSingOut = () => {
        userSingOut()
    }
    return (
        <div>
            <p className="text-xl bg-red-500"> something is wrong </p>
            <p className="text-xl bg-red-400"><i>{error.statusText || error.message}</i></p>
            <h3> Place <button onClick={handelSingOut}>Sign out</button> and back in</h3>

        </div>
    );
};

export default DisplayError;