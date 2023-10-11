import React from 'react'

import { Form, useActionData } from 'react-router-dom'

export async function action({ request }) {

  const formData = await request.formData()
  const title = formData.get('title')
  const description = formData.get('description')
  const address = formData.get('address')
  // const image = formData.get('image')

  return { title, description, address }
}

const NewPlace = () => {

  const data = useActionData()
  console.log(data);

  return (
    <div className='new-place-form'>
      <div>
        <Form method='post' className='form-container'>
          <label htmlFor="title">Title</label>
          <input 
              type="text" 
              name="title" 
              id="title" 
          />

          <label htmlFor="description">Description</label>
          <textarea 
              name="description" 
              id="description" 
              rows="8"
            >
              
            </textarea>

          <label htmlFor="address">Address</label>
          <input 
              type="text" 
              name="address" 
              id="address" 
          />

          {/* <label htmlFor="image">Place Image</label>
          <input 
              type="file" 
              name="image" 
              id="image" 
          /> */}

          <button type='submit' className='add-place-btn'>Add Place</button>

        </Form>
      </div>
    </div>
  )
}

export default NewPlace