import React, { useEffect, useState } from 'react';
import clock from '../../assets/icons/clock.svg'
import marker from '../../assets/icons/marker.svg'
import phone from '../../assets/icons/phone.svg'
import OfficeTable from './OfficeTable';

const OfficeTime = () => {
    const Offices = [
        {
            id: 1,
            name: 'Opening Hours',
            description: 'Open 9.00 am to 5.00pm everyday',
            icon: clock,
            bgClass: 'bg-gradient-to-r from-primary to-secondary'
        },
        {
            id: 2,
            name: 'Our Locations',
            description: 'Open 9.00 am to 5.00pm everyday',
            icon: marker,
            bgClass: 'bg-accent'
        },
        {
            id: 3,
            name: 'Contact Us',
            description: 'Open 9.00 am to 5.00pm everyday',
            icon: phone,
            bgClass: 'bg-gradient-to-r from-primary to-secondary'
        },
    ]
    const [order, setOrder] = useState([])
    const handelSubmit = (e) =>{
        e.preventDefault()
        const form = e.target;
        const name = form.title.value
        const image = form.image.value
        const details = form.details.value
        console.log(name, image, details);

        
            fetch('https://doctor-server-zeta.vercel.app/reviews',{
                method:'POST',
               headers:{
                'content-type':'application/json'
               },
               body:JSON.stringify("dd")
            })
       
    }
   
    return (

        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3'>
            {
                Offices.map(office => <OfficeTable key={office.id} office={office}></OfficeTable>)
            }
            <div>
            <form onSubmit={handelSubmit}>
            <input name='title' type="text" />
            <input name='image' type="text" />
            <input name='details' type="text" />
            </form>
            </div>
        </div>
    );
};

export default OfficeTime;