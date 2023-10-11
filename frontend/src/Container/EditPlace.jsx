import React, { useState } from 'react'

import { useParams } from 'react-router-dom'

const USERS = [
  {
    uid: 1,
    name: "Steven Ochieng",
    profileImage: '',
    placesVisited: 3,
    titleOfPlace: 'Moi Avenue',
    street: 'Mutarrakea Junction ',
    description: 'Create a beautiful blog that fits your style. Choose from a selection of '
  },
  {
    uid: 2,
    name: "Clinton Odhiambo",
    profileImage: '',
    placesVisited: 3,
    titleOfPlace: 'Uhuru Park',
    street: 'Kenyatta Avenue',
    description: 'Give your blog the perfect home. Get a blogspot.com domain or buy a custom domain with just a few clicks.'
  },
  {
    uid: 3,
    name: "Erine Auma",
    profileImage: '',
    placesVisited: 3,
    titleOfPlace: 'Savanna Park',
    street: 'Biashara Street',
    description: 'Get paid for your hard work. Google AdSense can automatically display relevant targeted ads on your blog so that you can earn income by posting about your passion.'
  }
]

const EditPlace = () => {

  const { pid } = useParams()

  const identifiedPlace = USERS.find(place => {
    return place.uid === parseInt(pid)
  })

  const [formData, setFormData] = useState({
    title: identifiedPlace.titleOfPlace,
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
    return <h1>No Place With that ID Found!</h1>
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    //send the Data to DB
    // console.log(formData);
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