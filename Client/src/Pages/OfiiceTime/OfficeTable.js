import React from 'react';

const OfficeTable = ({ office }) => {
    const { icon, name, description, bgClass } = office
    return (
        <div className={`card text-white md:card-side ${bgClass} shadow-xl p-5`}>
            <figure><img src={icon} alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name} </h2>
                <p>{description} </p>
            </div>
        </div>
    );
};

export default OfficeTable;