import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../utils/AuthContext'
import './DeleteModal.css'

const DeleteModal = ({ setIsDelete, placeId, title }) => {

    const auth = useAuth()
    const creatorId = auth.user.user.id

    const navigate = useNavigate()

    const handleCancel = () => {
        setIsDelete(false)
    }

    const handleDelete = async () => {

        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/places/${placeId}`, {
                method: 'DELETE', 
            })
    
            console.log(response);
    
            setIsDelete(false)
            navigate(`/${creatorId}/Places`)
        } catch (error) {
            console.log(error);
        }
    }

  return (
  <div className='overlay'>
        <div className='delete-container'>
            <h1 className='place-title'>{title}</h1>
            <h2>Are You Sure you want to delete this place?</h2>
            <div className='delete-btns'>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    </div>
    )
}

export default DeleteModal