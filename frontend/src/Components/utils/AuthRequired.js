import React from 'react'

import { useAuth } from './AuthContext'
import { Navigate, useLocation } from 'react-router-dom'

const AuthRequired = ({ children }) => {
    
    const auth = useAuth()
    const location = useLocation()
    const pathname = location.pathname

    if (!auth.user) {
        return <Navigate to={`/Authenticate?message=You must login to create a place!&redirectTo=${pathname}`}/>
    }

  return children
}

export default AuthRequired