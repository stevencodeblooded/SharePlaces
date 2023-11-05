import React, { useState } from 'react'

import { Link, useSearchParams, useNavigation, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../Components/utils/AuthContext';

const Authenticate = () => {
    const [formData, setFormData] = useState({
      email: '', 
      password: ''
    });

    const [searchParams] = useSearchParams()
    const location = useLocation()
    const navigation = useNavigation()
    const navigate = useNavigate()
    const auth = useAuth()

    const message = searchParams.get('message')
    const state = navigation.state

    const handleChange  = (e) => {
      const { name, value } = e.target
      setFormData(prevData => {
        return {
          ...prevData, 
          [name] : value
        }
      })
    }
  
    const handleSubmit  = async (e) => {
        e.preventDefault()

        //process.env.REACT_APP_BACKEND_URL = http://localhost:5000/api 
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        }) 

        if (!response.ok) {
            const data = await response.json()
            throw new Error(data.message)
        } else {
          const data = await response.json()
          if (data.message === 'Logged In Successfully!' ) {
            auth.login(data)
            const search = location.search
            const URLSearchSearchParams = new URLSearchParams(search)
            const pathname = URLSearchSearchParams.get('redirectTo') || '/'
            return navigate(pathname)
          }
        }
    }

  return (
    <React.Fragment>
      {message && <h2 className='message-login'>{message}</h2>}

      <div className='authenticate'>
        <form onSubmit={handleSubmit} className='authenticate-form' >

          <label htmlFor="email">Email</label>
          <input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required
          />

          <label htmlFor="password">Password</label>
          <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required 
          />

          <div className='auth-bns-links'>
            <Link to='/SignUp'>Sign Up</Link>
            <button type='submit'disabled={state==='submitting'}>
            { state==='submitting' ? 'Logging in' : 'Login' }
            </button>
          </div>

        </form>
      </div>
  </React.Fragment>
  )
}

export default Authenticate