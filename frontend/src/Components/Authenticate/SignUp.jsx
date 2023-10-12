import React from 'react'

import { Form, useActionData, Link } from 'react-router-dom'
import './SignUp.css'

export async function action ({ request }) {

    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')
    const profile = formData.get('profile')

    return {email, password, confirmPassword, profile}
}

const SignUp = () => {

    const data = useActionData()
    console.log(data);

  return (
    <div className='authenticate'>
        <Form method='post' className='authenticate-form'>

            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                name="email" 
            />

            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                name="password" 
            />

            <label htmlFor="confirmPassword">Repeat Password</label>
            <input 
                type="password" 
                name="confirmPassword" 
            />

            <label htmlFor="profile"></label>
            <input 
                type="file" 
                name="profile" 
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