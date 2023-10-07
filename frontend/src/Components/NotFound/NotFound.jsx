import React from 'react'

import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
        <h1>NotFound</h1>
        <p>Oops! Looks like the page is not available</p>
        <Link to='/'>Back to Home</Link>
    </div>
  )
}

export default NotFound