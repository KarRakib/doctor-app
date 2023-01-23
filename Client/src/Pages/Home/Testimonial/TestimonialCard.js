import React from 'react';

const TestimonialCard = ({review}) => {
    const {name, country, description, image}= review
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          
          <p>{description} </p>
        </div>
       <div>
       <figure><img src={image} alt="Shoes" /></figure>
        <div>
        <h2 className="card-title">{name} </h2>
        <p>{country} </p>
        </div>
       </div>
      </div>
    );
};

export default TestimonialCard;