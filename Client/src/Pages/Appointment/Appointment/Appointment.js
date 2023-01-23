import React, { useState } from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvailableTimes from '../AvailableTimes/AvailableTimes';

const Appointment = () => {
    const [selected, setSelected] = useState(new Date())
    return (
        <div>
            <AppointmentBanner selected={selected} setSelected={setSelected} ></AppointmentBanner>
            <AvailableTimes selected={selected} ></AvailableTimes>
        </div>
    );
};

export default Appointment;