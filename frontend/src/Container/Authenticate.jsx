import React from 'react'

import { Form, Link, useSearchParams, redirect } from 'react-router-dom'

export async function action({request}) {
  const formData = await request.formData()

  const email = formData.get('email')
  const password = formData.get('password')

  const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
  }) 

  if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message)
  } else {
    const data = await response.json()
    if (data.message === 'Logged In Successfully!' ) {
      const pathname = new URL(request.url).searchParams.get('redirectTo') || '/'
      localStorage.setItem('isLoggedIn', true)
      throw  redirect(pathname)
    }
  }

  return null
}

const Authenticate = () => {

  const [searchParams] = useSearchParams()
  const message = searchParams.get('message')
  
  return (
    <>
    {message && <h2 className='message-login'>{message}</h2>}

    <div className='authenticate'>

      <Form method='post' replace className='authenticate-form'>

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

        <div className='auth-bns-links'>
          <Link to='/SignUp'>Sign Up</Link>
          <button type='submit'>Login</button>
        </div>

      </Form>
    </div>
  </>
  )
}

export default Authenticate