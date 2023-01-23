import { DayPicker } from 'react-day-picker';
import banner from '../../assets/images/chair.png'
const AppointmentBanner = ({setSelected, selected}) => {

    return (
        <div className="hero Background ">
            <div className="hero-content my-16 flex-col lg:flex-row-reverse">
                <img src={banner} alt="" className="rounded-lg lg:w-1/2 mb-5 shadow-2xl" />
                <div className='w-1/2'>
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                    />
                   
                </div>
            </div>
        </div>
    );
};

export default AppointmentBanner;