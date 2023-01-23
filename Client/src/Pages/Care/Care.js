import React from 'react';
import photo from '../../assets/images/treatment.png'
import PrimaryButton from '../../Componets/PrimaryButton';

const Care = () => {
    return (
        <div>
            <div className="hero mt-16">
                <div className="hero-content lg:flex-row-reverse flex-col-reverse">
                    <div className="text-center w-1/2 lg:text-left lg:pl-10">
                        <h1 className="text-5xl font-bold">Exceptional Dental Care, on Your Terms</h1>
                        <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                        <PrimaryButton> GET STARTED </PrimaryButton>
                    </div>
                    <div className="card flex-shrink-0 w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <img className='rounded-lg ' src={photo} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Care;