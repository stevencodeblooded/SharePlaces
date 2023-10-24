import React, { useState } from 'react'

import { useNavigate, useNavigation } from 'react-router-dom'
import AuthRequired from '../Components/utils/AuthRequired'
import { useAuth } from '../Components/utils/AuthContext'

const NewPlace = () => {

    const auth = useAuth() 
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      address: '',
      image: '',
      creator: ''
    });
  
    const navigate = useNavigate()
    const navigation = useNavigation()
    const state = navigation.state

    const handleFormSubmit = async (e) => {
      e.preventDefault()

      if (auth.user) {

        const creatorId = auth.user.user.id
        const response = await fetch('http://localhost:5000/api/places', {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/JSON'
          }, 
          body: JSON.stringify({
            title: formData.title,
            description: formData.description, 
            address: formData.address, 
            image: formData.image,
            creator: creatorId
          })
        })
      
        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.message)
        } else {
          const data = await response.json()
          console.log('DATA FROM POST CREATE PLACE', data);
          const uid = data.places.creator
          const message = data.message
          console.log(message);
          //SUCCESS MESSAGE
          return navigate(`/${uid}/Places`) //NEED SOME CHANGE FOR THE ROUTE
        }
      }

    }

    const handleChange = (e) => {
      const { name, value } = e.target
      setFormData(prevData => {
        return {
          ...prevData, 
          [name] : value
        }
      })
    }

  return (
    <div className='new-place-form'>
      <div>
        <AuthRequired>
          <form onSubmit={handleFormSubmit} className='form-container'>
            <label htmlFor="title">Title</label>
            <input 
                type="text" 
                name="title" 
                id="title"
                value={formData.title}
                onChange={handleChange}
                required 
            />

            <label htmlFor="description">Description</label>
            <textarea 
                name="description" 
                id="description" 
                rows="8"
                value={formData.description}
                onChange={handleChange}
                required
              >
              </textarea>

            <label htmlFor="address">Address</label>
            <input 
                type="text" 
                name="address" 
                id="address" 
                value={formData.address}
                onChange={handleChange}
                required
            />

            <label htmlFor="image">Place Image</label>
            <input 
                type="file" 
                name="image" 
                id="image" 
                value={formData.image}
                onChange={handleChange}
            />

            <button type='submit' disabled={state==='submitting'} className='add-place-btn'>
              {state==='submitting' ? 'Adding Place' : 'Add Place'}
            </button>
          </form>
        </AuthRequired>
      </div>
    </div>
  )
}

export default NewPlace