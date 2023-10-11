import React from 'react'

import './ViewOnMap.css'
import Map from '../TheMap/Map';

const ViewOnMap = ({ setIsViewed, user }) => {

    const handleExit = () => setIsViewed(false)

   return (
    <div className='overlay'>
        <div className='google-modal'>
          <h2>{user.street}</h2>

          <Map 
            isMarkerShown 
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />

          <div className='close-modal-btn'>
            <button onClick={handleExit} className='exit-modal'>Close</button>
          </div>
        </div>
    </div>
  )
}

export default ViewOnMap