import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const Alluser = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://doctor-server-zeta.vercel.app/allusers')
            const data = await res.json();
            return data;
        }
    })
    console.log(users);
    const handelAdmin = id =>{
        fetch(`https://doctor-server-zeta.vercel.app/user/admin/${id}`,{
        method:'PUT'
        })
        .then(res => res.json())
        .then( data =>{
            if(data.acknowledged){
                toast.success('user Admin success')
                refetch()
            }
        })
    }
    const handelDelete = id =>{
        fetch(`https://doctor-server-zeta.vercel.app/users/admin/${id}`,{
            method:'DELETE'
            })
            .then(res => res.json())
            .then( data =>{
                if(data.deletedCount === 1){
                    toast.success('user Admin success')
                    refetch()
                }
            })
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) => <tr key={user._id} >
                                <th>{i + 1} </th>
                                <td>{user?.name}</td>
                                <td>{user?.email} </td>
                                <td> {user?.role !== 'admin' && <button onClick={()=>handelAdmin(user._id)}>Admin</button>}</td>
                                <td> <button onClick={()=>handelDelete(user._id)}>Delete</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Alluser;