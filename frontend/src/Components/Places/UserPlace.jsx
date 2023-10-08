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
    <div>
        <div>
            <img src={user.placeImage} alt="Place" className='place-image'/>
            <div>
                <h2>{ user.titleOfPlace }</h2>
                <p>{user.descrption}</p>
            </div>
            <div>
                <button onClick={handleViewOnMap}>View on Map</button>
                {isViewed && (
                    <ViewOnMap setIsViewed={setIsViewed}/>
                )}

                <div>
                    <Link to={`/Places/${user.uid}/edit`}>Edit</Link>
                    <button onClick={handleDelete}>Delete</button>
                    {isDelete && (
                        <DeleteModal />
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserPlace