import React, { useState } from 'react'

import { useNavigate, useLoaderData, useParams, Link } from 'react-router-dom'
import { useAuth } from '../Components/utils/AuthContext'

export async function loader({ params }) {

  const placeId = params.pid

  try {
    const responseData = await fetch(`http://localhost:5000/api/places/${placeId}`)
    const place = responseData
    return place
  } catch (error) {
   console.log(error); 
  }
}

const EditPlace = () => {

  const auth = useAuth()

  let creatorId
  try {
    creatorId = auth.user.user.id 
  } catch (error) {
    
  }

  const navigate = useNavigate() 
  const { pid } = useParams()
  const data = useLoaderData()
  const identifiedPlace = data.place

  const [formData, setFormData] = useState({
    title: identifiedPlace.title,
    description: identifiedPlace.description
  })

  const handleChange = (e) => {

    const {name, value }= e.target
    setFormData ((prevData) => {
      return {
        ...prevData,
        [name] : value
      }
    })
  }

  if (!identifiedPlace) {
    return <h1>Place Not Found</h1>
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(`http://localhost:5000/api/places/${pid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/Json'
      },
      body: JSON.stringify(formData)
    })

    console.log(response)
    navigate(`/${creatorId}/Places`)
  }

  return (
    <div className='edit-place'>
      { auth.user ? (
        <form onSubmit={handleSubmit} className='edit-place-form'>
          <label htmlFor="title">Title</label>
          <input 
              type="text" 
              name="title" 
              id="title" 
              value={formData.title}
              onChange={handleChange}
          />

          <label htmlFor="description">Description</label>
          <textarea 
              name="description" 
              id="description" 
              rows="7"
              value={formData.description}
              onChange={handleChange}
          >
          </textarea>

          <button className='update-place-btn'>Update Place</button>

        </form>
      ) : (
        <div className='cant-access'>
          <h1>Cannot Access This Page, Must login...</h1>
          <Link to='/Authenticate'>Login</Link>
        </div>
      )
      }
    </div>
  )
}

export default EditPlace