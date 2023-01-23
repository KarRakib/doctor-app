import React from 'react';
import photo  from "../../../assets/images/doctor.png";
import PrimaryButton from '../../../Componets/PrimaryButton';
import './Appointment.css'

const Appointment = () => {
    return (
        <div className="hero text-white mt-16 backGround">
        <div className="hero-content lg:flex-row-reverse flex-col-reverse">
            <div className="text-center w-1/2 lg:text-left lg:pl-10">
            <strong>Appointment</strong>
                <h1 className="text-3xl font-bold">Make an appointment Today</h1>
                <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                <PrimaryButton> GET STARTED </PrimaryButton>
            </div>
            <div className="card flex-shrink-0 w-1/2 max-w-sm">
                <img className=' h-96 ' src={photo} alt="" />
            </div>
        </div>
    </div>
    );
};

export default Appointment;