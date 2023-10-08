import React from 'react'

import './ViewOnMap.css'

const ViewOnMap = ({ setIsViewed }) => {

    const handleExit = () => setIsViewed(false)
  return (
    <>
        <h2>Google Map Modal Goes Here</h2>
        <button onClick={handleExit}>Exit Modal</button>
    </>
  )
}

export default ViewOnMap