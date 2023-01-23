import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useToken from '../../hook/useToken';
const Register = () => {
    const { updateUser, signGoogle, userRegister} = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [userEmail, setUserEmail] = useState('')
    const [token] = useToken(userEmail)
    const navigate = useNavigate()
    if(token){
        navigate('/')
    }
    const onSubmit = (data) => {
        console.log(data);
        userRegister(data.email, data.password)
        .then(result => {
            const user = result.user
            console.log(user);
            toast.success('success')
            const userInfo  ={
                displayName: data.name
            } 
          if(user){
            updateUser(userInfo)
            .then(()=>{
                userSavedData(data.name, data.email)
               
            })
          }
        })
        .catch(error =>{
            console.error(error)
        })
    }
 const googleSignIn =()=>{
    signGoogle()
    .then( result =>{
        const user = result.user
        console.log(user);
    })
    .then( error => console.error(error))
 }
 
const userSavedData = (name, email)=>{
    const user = {name,email}
    fetch('https://doctor-server-zeta.vercel.app/users',{
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body:JSON.stringify(user)
    })
    .then(res=> res.json())
    .then(data =>{
        setUserEmail(email)
    })
}

    return (
        <div className='w-[490px] mx-auto mt-12 justify-items-center card flex-shrink-0 shadow-2xl bg-base-100'>
            <div className='w-80 mx-auto py-9'>
                <h3 className='text-center text-2xl '> Register Now !</h3>
                <div className='justify-items-center mx-auto'>
                    <form className='justify-items-center' onSubmit={handleSubmit(onSubmit)}>
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="name" className="input input-bordered w-full" placeholder='Name' {...register("name", 
                        { required: true})} />
                        {errors.name && <span>This field is required</span>}
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" className="input input-bordered w-full" placeholder='email' {...register("email", { required: true })} />
                        {errors.email && <span>This field is required</span>}
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type='password' className="input input-bordered w-full" placeholder='password' {...register("password", { required: true  })} />
                        {errors.password && <span>Password length errors</span>}
                        <label className="label">
                            <Link className="label-text-alt link link-hover">Forgot password?</Link>
                        </label>
                        <input className='w-full btn mt-5' type="submit" />
                        Your Have Already Account? <Link to='/signin'> Please LogIn</Link>
                    </form>
                    <div className="divider divider-horizontal text-center">OR</div>
                    <button onClick={googleSignIn} className='text-center btn btn-outline btn-secondary'>CONTINUE WITH GOOGLE</button>
                </div>
            </div>
        </div>
    );
};

export default Register;