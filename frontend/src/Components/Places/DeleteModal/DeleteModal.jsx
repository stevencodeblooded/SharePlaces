import React from 'react'

import './DeleteModal.css'

const DeleteModal = () => {

    const handleCancel = () => {
        console.log('Cancel Btn working');
    }

    const handleDelete = () => {
        console.log('Delete Button Working');
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