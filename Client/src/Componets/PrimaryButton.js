import React from 'react';

const PrimaryButton = ({children}) => {
    return (
       <button className='btn btn-primary bg-primary-to-r form-primary to-secondary text-white'> {children} </button>
    );
};

export default PrimaryButton;