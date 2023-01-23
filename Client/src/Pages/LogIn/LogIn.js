import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useNavigate,Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useToken from '../../hook/useToken';
const LogIn = () => {
    const {userLogIn,signGoogle} = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation()
    const [loginUserEmail, setLoginUserEmail ] = useState('')
    const [toke] = useToken(loginUserEmail)
    const from = location.state?.from?.pathname || '/'
    if(toke){
        navigate(from, {replace:true});
    }
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = (data) => {
        
        userLogIn(data.email, data.password)
        .then( result => {
            const user = result.user
            console.log(user.email);
            setLoginUserEmail(user.email)
            toast('Login Successfully')
        // console.log(data.email);
          
            
        })
        .then(error=>{ 
            
            console.error(error)
        
        } )
    }
    const googleSignIn =()=>{
        signGoogle()
        .then( result =>{
            const user = result.user
            console.log(user);
        })
        .then( error => console.error(error))
     }
    return (
        <div className='w-[490px] mx-auto my-12 justify-items-center card flex-shrink-0 shadow-2xl bg-base-100'>
            <h3 className='text-center text-2xl '> Login Now !</h3>
            <form className='justify-items-center mx-auto w-80' onSubmit={handleSubmit(onSubmit)}>
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" className="input input-bordered w-full" placeholder='email' {...register("email", { required: true })} />
                {errors.email && <span>This field is required</span>}
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type='password' className="input input-bordered w-full" placeholder='password' {...register("password", { required: true, maxLength: 7 })} />
                {errors.password && <span>Password length errors</span>}
                <input className='w-full btn mt-5' type="submit" />
                New to Doctors Portal?? <Link to='/signup'> Create new account</Link>
            </form>
            <div className="divider divider-horizontal text-center">OR</div>
            <button onClick={googleSignIn} className='text-center btn btn-outline btn-secondary'>CONTINUE WITH GOOGLE</button>
        </div>
    );
};

export default LogIn;