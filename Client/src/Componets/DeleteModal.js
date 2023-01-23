import React from 'react';

const DeleteModal = ({title, message, successAction, modalData, closeModal}) => {
    return (
        <div>
            <input type="checkbox" id="delete-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title} </h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label onClick={()=> successAction(modalData)} htmlFor="delete-modal" className="btn">Yay!</label>
                        <label onClick={()=>closeModal()} htmlFor="delete-modal" className="btn">Close</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;