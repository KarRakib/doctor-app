import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const AddDoctor = () => {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const { data: specialties = [] } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('https://doctor-server-zeta.vercel.app/doctor-specialty')
            const data = await res.json()
            return data
        }
    })
    const imagebbKey = '4f79b01cf92978f090db221686a51f54';
    const handelAddDoctor = (data) => {
        const image = data.image[0]
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imagebbKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    const doctor={
                        name :data.name,
                        email :data.email,
                        Specialty :data.specialty,
                        image :imageData.data.url
                    }
                    console.log(imageData.data.url, 'too', doctor);
                    fetch('https://doctor-server-zeta.vercel.app/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body:JSON.stringify(doctor)
                    })
                    .then(res => res.json())
                    .then(result =>{
                        if(result.acknowledged){
                            toast.success(`${data.name} is ADDED`)
                            navigate('/dashboard/manage-doctor')
                        }
                        console.log(data);
                    })

                }
            })

    }

    return (
        <div className='w-96 m-7'>
            <form className='justify-items-center' onSubmit={handleSubmit(handelAddDoctor)}>
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input type="name" className="input input-bordered w-full" placeholder='Name' {...register("name",
                    { required: true })} />
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" className="input input-bordered w-full" placeholder='email' {...register("email", { required: true })} />
                <label className="label">
                    <span className="label-text">Doctor-Specialty</span>
                </label>
                <select {...register("specialty", { required: true })} className="select select-bordered w-full">
                    {
                        specialties.map(sp => <option key={sp._id} value={sp.name}>{sp.name} </option>)
                    }
                </select>
                <label className="label">
                    <span className="label-text">Image</span>
                </label>
                <input type="file" className="input input-bordered w-full" placeholder='image' {...register("image",
                    { required: true })} />
                <label className="label">
                </label>
                <input className='w-full btn mt-5' type="submit" />
            </form>
        </div>
    );
};

export default AddDoctor;