import React, { useEffect, useState } from 'react';
import Service from './Service';

const Services = () => {
    const [services, setServices] = useState([])
    useEffect(()=>{
        fetch('https://doctor-server-zeta.vercel.app/services')
        .then(res => res.json())
        .then(data => setServices(data))
    },[])
    console.log(services);
    return (
        <div>
            <div className='text-center mt-12'>
                <h3 className='font-bold text-xl text-secondary uppercase'>our Services</h3>
                <h2 className='text-3xl '>Services We Provide </h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                services.map(service =><Service key={service._id} service={service}></Service>)
            }
            </div>
        </div>
    );
};

export default Services;