import React from 'react'

import { Form, useActionData } from 'react-router-dom'
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
    <div>
        <Form method='post'>
            <input 
                type="email" 
                name="email" 
                placeholder='Email'
            />

            <input 
                type="password" 
                name="password" 
                placeholder='Password'
            />

            <input 
                type="password" 
                name="confirmPassword" 
                placeholder='Repeat Password'
            />

            <input 
                type="file" 
                name="profile" 
            />

            <button type="submit">Sign Up</button>
        </Form>
    </div>
  )
}

export default SignUp