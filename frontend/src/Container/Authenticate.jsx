import React from 'react'

import { Form, useActionData, Link, useSearchParams, redirect } from 'react-router-dom'

export async function action({request}) {
  const formData = await request.formData()

  const email = formData.get('email')
  const password = formData.get('password')
  console.log({ email, password });

  localStorage.setItem('isLoggedIn', 'true')

  const pathname = new URL(request.url).searchParams.get('redirectTo') || '/'
  throw redirect(pathname)
}

const Authenticate = () => {

  const [searchParams] = useSearchParams()
  const message = searchParams.get('message')
  
  const data = useActionData()
  console.log(data);

  return (
    <>
    {message && <h2 className='message-login'>{message}</h2>}

    <div className='authenticate'>

      <Form method='post' replace className='authenticate-form'>

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