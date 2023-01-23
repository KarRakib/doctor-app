import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const AppointmentBoard = () => {
    const { user } = useContext(AuthContext)
    const url = `https://doctor-server-zeta.vercel.app/booking?email=${user?.email}`

    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;

        }
    })
    console.log('boking', bookings);
    return (
        <div className='bg-[#bab6b6]'>
            <h3 className='text-3xl'>My Appointment</h3>
           
                
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Name</th>
                                    <th>Service</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Payment</th>
                                </tr>
                            </thead>
                           { bookings.length < 0 ? <h3> No Order </h3> :
                           
                           <tbody>
                                {bookings &&
                                    bookings?.map((book, i) => <tr key={i} >
                                        <th>{i + 1} </th>
                                        <td>{book.client} </td>
                                        <td>{book.service} </td>
                                        <td>{book.time} </td>
                                        <td>{book.slot} </td>
                                        <td>{
                                            book.price && !book.paid && <Link to={`/payment/${book._id}`}>
                                                <button ><small className='btn btn-success'> Pay </small></button>
                                            </Link>
                                        }
                                            {
                                                book.price && book.paid && <button><small> Payment </small></button>
                                            }
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        }
                        </table>
                    </div>
           
        </div>
    );
};

export default AppointmentBoard;