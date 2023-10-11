import React, { useState } from 'react'

import { Link } from 'react-router-dom';
import ViewOnMap from './ViewOnMap/ViewOnMap';
import DeleteModal from './DeleteModal/DeleteModal';
import './UserPlace.css'

const UserPlace = ({ user }) => {

    const [isViewed, setIsViewed] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    
    const handleViewOnMap = () => {
        setIsViewed(true)
    }

    const handleDelete = () => {
        setIsDelete(true)
    }

  return (
    <div className='user-places'>
        <div className='user-place-data'>
            <img src={user.placeImage} alt="Place" className='place-image'/>

            <div className='place-title-desc'>
                <h2>{ user.titleOfPlace }</h2>
                <h3>{user.street}</h3>
                <p>{user.descrption}</p>
            </div>

            <hr  className='hr-line'/>

            <div className='view-edit-delete'>
                <button onClick={handleViewOnMap}>View on Map</button>
                {isViewed && (
                    <ViewOnMap setIsViewed={setIsViewed} user={user} />
                )}

                <Link to={`/Places/${user.uid}/edit`}>Edit</Link>
                <button onClick={handleDelete}>Delete</button>
                {isDelete && (
                    <DeleteModal />
                )}

            </div>
        </div>
    </div>
  )
}

export default UserPlace