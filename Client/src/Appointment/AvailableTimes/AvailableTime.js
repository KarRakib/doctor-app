import React from 'react';

const AvailableTime = ({ available, setTreatment }) => {
    const { name, slots,price } = available;
    return (
        <div className="card shadow-xl">
            <div className="card-body text-center">
                <h2 className="text-2xl text-secondary font-bold text-center">{name}</h2>
                <p> {slots.length > 0 ? slots[0] : 'try Another Day'} </p>
                <p> {slots.length} {slots.length > 1 ? 'spaces' :  'space'} available  </p>
                <p> $ {price}</p>
                <div className="card-actions justify-center">
                    <label
                        disabled={slots.length === 0}
                        onClick={() => setTreatment(available)}
                        htmlFor="appointment-modal" className="btn btn-primary text-white"> Book Appointment </label>
                </div>
            </div>
        </div>
    );
};

export default AvailableTime;