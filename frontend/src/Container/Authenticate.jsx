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

        <div>
          <Link to='/SignUp'>Sign Up</Link>
          <button type='submit'>Login</button>
        </div>

      </Form>
    </div>
  )
}

export default Authenticate