import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns/esm';
import React, {useState } from 'react';
import BookingModal from '../../Componets/BookingModal';
import Loader from '../../Componets/Loader';
import AvailableTime from './AvailableTime';

const AvailableTimes = ({ selected }) => {
    const time = format(selected, 'PP')
    const [treatment, setTreatment] = useState(null)
    const {data:availableTime =[], refetch, isLoading  } = useQuery({
        queryKey: ['appointments',time],
        queryFn: () => fetch(`https://doctor-server-zeta.vercel.app/appointments?time=${time}`)
            .then(res => res.json())
           
    });
    if(isLoading){
        return <Loader></Loader>
    }
 
    return (
        <div className='mt-5'>
            <p className='text-center'>You picked {format(selected, 'PP')}.</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
                {
                    availableTime?.map(available => <AvailableTime key={available._id}
                        setTreatment={setTreatment}
                        available={available}></AvailableTime>)
                }
            </div>
            {treatment &&

                <BookingModal
                refetch={refetch}
                    selected={selected}
                    setTreatment={setTreatment}
                    treatment={treatment}></BookingModal>}
        </div>
    );
};

export default AvailableTimes;