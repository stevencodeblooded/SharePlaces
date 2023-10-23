import React from 'react'

import { Form, redirect, useNavigation } from 'react-router-dom'
import { authRequired } from '../Components/utils/AuthRequired'

export async function action({ request }) {

  const formData = await request.formData()
  const title = formData.get('title')
  const description = formData.get('description')
  const address = formData.get('address')
  const image = formData.get('image')

  const response = await fetch('http://localhost:5000/api/places', {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/JSON'
    }, 
    body: JSON.stringify({
      title, description, address, image
    })
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message)
  } else {
    redirect('/')
  }

  return null
}

export async function loader({request}) {
  await authRequired(request)
  return null
}

const NewPlace = () => {

  const navigation = useNavigation()
  const state = navigation.state

  return (
    <div className='new-place-form'>
      <div>
        <Form method='post' className='form-container'>
          <label htmlFor="title">Title</label>
          <input 
              type="text" 
              name="title" 
              id="title"
              required 
          />

          <label htmlFor="description">Description</label>
          <textarea 
              name="description" 
              id="description" 
              rows="8"
              required
            >
              
            </textarea>

          <label htmlFor="address">Address</label>
          <input 
              type="text" 
              name="address" 
              id="address" 
              required
          />

          <label htmlFor="image">Place Image</label>
          <input 
              type="file" 
              name="image" 
              id="image" 
          />

          <button type='submit' disabled={state==='submitting'} className='add-place-btn'>
            {state==='submitting' ? 'Adding Place' : 'Add Place'}
          </button>

        </Form>
      </div>
    </div>
  )
}

export default NewPlace