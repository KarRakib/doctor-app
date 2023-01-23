import { format } from 'date-fns/esm';
import React, { useEffect, useState } from 'react';

const AvailableTimes = ({ selected }) => {
    const [services, setServices] = useState(null)
    useEffect(()=> {
        fetch('services.json')
        .then(res => res.json())
        .then(data => console.log(data))
    },[])

    return (
        <div>
            <p>You picked {format(selected, 'PP')}.</p>;
            
        </div>
    );
};

export default AvailableTimes;