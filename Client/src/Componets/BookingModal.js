import React, { useContext } from 'react';
import { format } from 'date-fns/esm';
import { AuthContext } from '../AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
const BookingModal = ({ treatment, selected ,setTreatment,refetch }) => {
    const {user} = useContext(AuthContext)
    console.log(user);
    const { name ,slots,price} = treatment;
    console.log('this is modal',treatment);
    const time = format(selected, 'PP')
const handelSubmit = (e) =>{
 e.preventDefault()
 const form = e.target;
 const name = form.name.value;
 const email = form.email.value;
 const slot = form.slot.value
 const phone = form.phone.value;
 const appointment ={
    service : treatment.name,
    client : name,
    email,
    slot,
    phone,
    time,
    price
 }
 setTreatment(null)
 console.log(appointment);
 fetch('https://doctor-server-zeta.vercel.app/booking',{
    method : 'POST',
    headers:{
        'content-type': 'application/json'
    },
    body:JSON.stringify(appointment)
 })
 .then(res => res.json())
 .then( data => {
    console.log(data);
    if(data.acknowledged){
        toast.success('Booking Complete')
        refetch()
    }
    else{
        toast.error(data.message)
    }
 })

}
    return (
        <div>
            <input type="checkbox" id="appointment-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="appointment-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name} </h3>
                   <form onSubmit={handelSubmit}>
                   <input type="text" disabled value={time} className="input input-bordered input-primary w-full m-2 " />
                   <select name='slot' className="select select-bordered w-full m-2 ">
                   {
                       slots.map((slot, id) => <option key={id}  value={slot}> {slot}</option>)
                   }
                   </select>
                   <input name='name' type="text" disabled defaultValue={user?.displayName} className="input input-bordered input-primary w-full m-2 " />
                   <input name='email' type="text" disabled defaultValue={user?.email} className="input input-bordered input-primary w-full m-2 " />
                   <input name='phone' type="text" placeholder="Your phone" className="input input-bordered input-primary w-full m-2 " />
                   <button type='submit' className="btn w-full">Submit</button>
                   </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;