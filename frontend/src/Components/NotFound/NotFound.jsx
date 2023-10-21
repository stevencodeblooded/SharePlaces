import React from 'react'

import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className='notfound'>
        <div>
          <h1 className='not-found-heading'>Not Found</h1>
          <p className='not-found-txt'>Oops! Looks like the page is not available</p>
          <Link to='/'>Back to Home</Link>
        </div>
    </div>
  )
}

export default NotFound