import React from 'react'

import './DeleteModal.css'

const DeleteModal = () => {

    const handleCancel = () => {
        console.log('Cancel Button Working');
    }

    const handleDelete = () => {
        console.log('Delete Button Working');
    }

  return (
    <div>
        <div>
            <h2>Are You Sure?</h2>
            <div>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteModal