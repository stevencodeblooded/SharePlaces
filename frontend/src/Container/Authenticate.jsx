import React from 'react'
import { Form, useActionData, Link } from 'react-router-dom'

export async function action({request}) {
  const formData = await request.formData()

  const email = formData.get('email')
  const password = formData.get('password')
  
  return { email, password }
}

const Authenticate = () => {

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

        <div className='auth-bns-links'>
          <Link to='/SignUp'>Sign Up</Link>
          <button type='submit'>Login</button>
        </div>

      </Form>
    </div>
  )
}

export default Authenticate