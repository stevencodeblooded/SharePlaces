import React from 'react'

import './DeleteModal.css'

const DeleteModal = ({ setIsDelete }) => {

    const handleCancel = () => {
        setIsDelete(false)
    }

    const handleDelete = () => {

        //DELETE LOGIC GOES HERE

        console.log('Delete Button Working');
        setIsDelete(false)
    }

  return (
  <div className='overlay'>
        <div className='delete-container'>
            <h2>Are You Sure?</h2>
            <div className='delete-btns'>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    </div>
    )
}

export default DeleteModal