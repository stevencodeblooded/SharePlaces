import React, { useState } from 'react'

import { Link } from 'react-router-dom';
import ViewOnMap from './ViewOnMap/ViewOnMap';
import DeleteModal from './DeleteModal/DeleteModal';

import './UserPlace.css'

const UserPlace = ({ place }) => {

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
            <img src={place.image} alt="Place" className='place-image'/>

            <div className='place-title-desc'>
                <h2>{ place.title }</h2>
                <h3>{place.address}</h3>
                <p>{place.description}</p>
            </div>

            <hr  className='hr-line'/>

            <div className='view-edit-delete'>
                <button onClick={handleViewOnMap}>View on Map</button>
                {isViewed && (
                    <ViewOnMap setIsViewed={setIsViewed} user={place} />
                )}

                <Link to={`/Places/${place.id}/edit`}>Edit</Link>
                <button onClick={handleDelete}>Delete</button>
                {isDelete && (
                    <DeleteModal setIsDelete={setIsDelete} />
                )}

            </div>
        </div>
    </div>
  )
}

export default UserPlace