import React, { useState } from 'react'

import { useNavigate, useLoaderData, useParams } from 'react-router-dom'

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
    navigate('/updated Successfully')
  }

  return (
    <div className='edit-place'>
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
    </div>
  )
}

export default EditPlace