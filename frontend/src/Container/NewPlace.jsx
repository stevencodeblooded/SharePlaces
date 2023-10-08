import React from 'react'

import { Form, useActionData, Link } from 'react-router-dom'

export async function action({ request }) {

  const formData = await request.formData()
  const title = formData.get('title')
  const description = formData.get('description')
  const image = formData.get('image')

  return { title, description, image }
}

const NewPlace = () => {

  const data = useActionData()
  console.log(data);

  return (
    <div>
      <Form method='post'>
        <label htmlFor="title">Title</label>
        <input 
            type="text" 
            name="title" 
            id="title" 
        />

        <label htmlFor="description">Description</label>
        <input 
            type="text" 
            name="description" 
            id="description" 
        />

        <label htmlFor="image">Place Image</label>
        <input 
            type="file" 
            name="image" 
            id="image" 
        />

        <button type='submit'>Add Place</button>
        <Link to='/'>Back Home</Link>

      </Form>
    </div>
  )
}

export default NewPlace