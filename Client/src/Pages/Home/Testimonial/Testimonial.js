import React, { useEffect, useState } from 'react';
import quote from '../../../assets/icons/quote.svg'
import TestimonialCard from './TestimonialCard';

const Testimonial = () => {
    const [reviews, setReviews] = useState([])
    useEffect(()=>{
        fetch('https://doctor-server-zeta.vercel.app/reviews')
        .then(res => res.json())
        .then(data => setReviews(data))
    },[])
    console.log(reviews);

    return (
        <div>
            <div className='flex justify-between'>
                <div >
                    <strong className='text-primary'> Testimonial</strong>
                    <h2 className='text-3xl'> What Our Patients Says</h2>
                </div>
                <img className='w-48' src={quote} alt="" />

            </div>
            <div>
            {
                reviews.map(review =><TestimonialCard key={review._id} review={review}></TestimonialCard> )
            }
            </div>
        </div>
    );
};

export default Testimonial;