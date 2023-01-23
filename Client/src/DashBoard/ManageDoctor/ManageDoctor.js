import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import DeleteModal from '../../Componets/DeleteModal';

const ManageDoctor = () => {
    const [deleteDoctor, setDeleteDoctor] = useState(null)
    const closeModal = () => {
        setDeleteDoctor(null)
    }
  
    const { data: doctors = [] , refetch} = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('https://doctor-server-zeta.vercel.app/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });
    const handleDeleteDoctor = doctor => {
        fetch(`https://doctor-server-zeta.vercel.app/doctors/${doctor._id}`, {
            method: 'DELETE', 
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                refetch();
                toast.success(`Doctor ${doctor.name} deleted successfully`)
            }
        })
    }

    return (
        <div>
            <h3 className="text-xl"> {doctors?.length}</h3>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th> Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, i) => <tr>
                                <th>{i + 1}</th>
                                <th>
                                    <div className="avatar">
                                        <div className="w-24 rounded-xl">
                                            <img src={doctor.image} alt="" />
                                        </div>
                                    </div>
                                </th>
                                <td>{doctor.name} </td>
                                <td>{doctor.email} </td>
                                <td> <label onClick={() => setDeleteDoctor(doctor)} htmlFor="delete-modal" className="btn">Delete</label> </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deleteDoctor && <DeleteModal
                    title={`are your sure wanna to delete`}
                    message={`if you delete ${deleteDoctor.name} it cannot be`}
                    successAction={handleDeleteDoctor}
                    modalData={deleteDoctor}
                    closeModal={closeModal}
                ></DeleteModal>
            }
        </div>
    );
};

export default ManageDoctor;