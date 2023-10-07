import React from 'react'

import { useRouteError } from 'react-router-dom'
import './Error.css'

const Error = () => {
    const error = useRouteError()

  return (
    <div>
        <h2>Error: {error.message}</h2>
        <pre>{error.status - error.statusText}</pre>
    </div>
  )
}

export default Error