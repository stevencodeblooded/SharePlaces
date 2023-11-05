import React, { useState } from 'react'

import { Link, useNavigate, useNavigation } from 'react-router-dom'
import './SignUp.css'

const SignUp = () => {

    const navigate = useNavigate()
    const navigation = useNavigation()
    const [signUpData, setSignUpData] = useState({
        name: '',
        email: '',
        password: '',
        image: ''
    })
    const state = navigation.state

    const handleChange = (e) => {
        const { name, value } = e.target
        setSignUpData(prevData => {
            return {
                ...prevData,
                [name] : value
            }
        })
    }

    const handleProfileImage = (e) => {
      setSignUpData({...signUpData, image: e.target.files[0]})
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', signUpData.name)
        formData.append('email', signUpData.email)
        formData.append('password', signUpData.password)
        formData.append('image', signUpData.image)
        
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/users/SignUp', {
                method: 'POST',
                body: formData
            })
    
            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message)
            } else  {
                const data = await response.json()
                alert(data.message)
                return navigate('/Authenticate')
            }
    
        } catch (error) {
            throw new Error(error.message)
        }
    }

    return (
    <div className='authenticate'>
        <form onSubmit={handleFormSubmit} className='authenticate-form'>

            <label htmlFor="name">Name</label>
            <input 
                type="name" 
                name="name"
                value={signUpData.name}
                onChange={handleChange}
                required
            />

            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                name="email" 
                id='email'
                value={signUpData.email}
                onChange={handleChange}
                required
            />

            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                name="password" 
                id='password'
                value={signUpData.password}
                onChange={handleChange}
                required
            />

            <label htmlFor="image">Profile</label>
            <input 
                type="file" 
                name="image" 
                id="image" 
                onChange={handleProfileImage}
                required
            />

            <div className='auth-bns-links'>
                <Link to='/Authenticate'>Log in</Link>
                <button type="submit" disabled={state==='submitting'}>
                    {state==='submitting' ? 'Signing up' : 'Sign Up'}
                </button>
            </div>
        </form>
    </div>
  )
}

export default SignUp