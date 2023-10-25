import React from 'react'

import { useRouteError } from 'react-router-dom'
import './Error.css'

const Error = () => {
  
  const error = useRouteError()

  return (
    <div className='error-block'>
      <div>
        <h2>Error: {error.message}</h2>
        <pre>{error.status - error.statusText}</pre>
      </div>
    </div>
  )
}

export default Error