import React from 'react'

import { Form, Link, redirect } from 'react-router-dom'
import './SignUp.css'

export async function action ({ request }) {

    const formData = await request.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    try {
        const response = await fetch('http://localhost:5000/api/users/SignUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })

        if (!response.ok) {
            const data = await response.json()
            throw new Error(data.message)
        } else  {
            return redirect('/Authenticate')
        }

    } catch (error) {
        throw new Error(error.message)
    }
}

const SignUp = () => {

    return (
    <div className='authenticate'>
        <Form method='post' className='authenticate-form'>

            <label htmlFor="name">Name</label>
            <input 
                type="name" 
                name="name" 
                required
            />

            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                name="email" 
                required
            />

            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                name="password" 
                required
            />

            <label htmlFor="confirmPassword">Repeat Password</label>
            <input 
                type="password" 
                name="confirmPassword" 
            />
            
            <div className='auth-bns-links'>
                <Link to='/Authenticate'>Log in</Link>
                <button type="submit">Sign Up</button>
            </div>
        </Form>
    </div>
  )
}

export default SignUp