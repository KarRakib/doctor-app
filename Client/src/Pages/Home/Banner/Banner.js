import React from 'react';
import banner from '../../../assets/images/chair.png'
import './Banner.css'
import PrimaryButton from '../../../Componets/PrimaryButton';
const Banner = () => {
  
    return (
        <div  className="hero Background ">
            <div className="hero-content my-16 flex-col lg:flex-row-reverse">
                <img src={banner} alt="" className="rounded-lg lg:w-1/2 mb-5 shadow-2xl" />
                <div className='w-1/2'>
                    <h1 className="text-5xl font-bold">Your New Smile Starts Here!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                   <PrimaryButton>GET STARTED</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default Banner;