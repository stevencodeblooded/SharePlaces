import React, { useState } from 'react'

import { useNavigate, useNavigation } from 'react-router-dom'
import AuthRequired from '../Components/utils/AuthRequired'
import { useAuth } from '../Components/utils/AuthContext'

const NewPlace = () => {

    const auth = useAuth() 
    const [newPlace, setNewPlace] = useState({
      title: '',
      description: '',
      address: '',
      creator: '',
      image: ''
    });

    const navigate = useNavigate()
    const navigation = useNavigation()
    const state = navigation.state

    const handleChange = (e) => {
      const { name, value } = e.target

        setNewPlace(prevData => {
          return {
            ...prevData, 
            [name] : value
          }
        })
    }

    const handlePhoto = (e) => {
      setNewPlace({...newPlace, image: e.target.files[0]})
    }

    const handleFormSubmit = async (e) => {
      e.preventDefault()

      if (auth.user) {

        const creatorId = auth.user.user.id

        const formData = new FormData()

        formData.append('image', newPlace.image)
        formData.append('title', newPlace.title)
        formData.append('description', newPlace.description)
        formData.append('address', newPlace.address)
        formData.append('creator', creatorId)

        const response = await fetch('http://localhost:5000/api/places', {
          method: 'POST',
          body: formData,
        })
      
        if (!response.ok) {
          const data = await response.json()
          console.log(data);
          throw new Error(data.message)
        } else {
          const data = await response.json()
          console.log('DATA FROM POST CREATE PLACE', data);
          const uid = data.places.creator
          const message = data.message
          alert(message)
          return navigate(`/${uid}/Places`)
        }
      }

    }

  return (
    <div className='new-place-form'>
      <div>
        <AuthRequired>
          <form onSubmit={handleFormSubmit} encType='multipart/form-data' className='form-container'>
            <label htmlFor="title">Title</label>
            <input 
                type="text" 
                name="title" 
                id="title"
                value={newPlace.title}
                onChange={handleChange}
                required 
            />

            <label htmlFor="description">Description</label>
            <textarea 
                name="description" 
                id="description" 
                rows="8"
                value={newPlace.description}
                onChange={handleChange}
                required
              >
              </textarea>

            <label htmlFor="address">Address</label>
            <input 
                type="text" 
                name="address" 
                id="address" 
                value={newPlace.address}
                onChange={handleChange}
                required
            />

            <label htmlFor="image">Place Image</label>
            <input 
                type="file" 
                name="image" 
                id="image" 
                accept='.jpeg, .png, .jpg'
                onChange={handlePhoto}
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