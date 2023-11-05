import React, { useState } from 'react'

import './UploadFile.css'

const UploadFile = () => {

    const [file, setFile] = useState()

    const handleChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append('file', file)
        
        try {
            const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/places', {
                method: 'POST',
                body: JSON.stringify(formData)
            })
            console.log(res)
        } catch (error) {}

    }

  return (
    <div className='file-upload'>
        <input 
            type="file" 
            name="image" 
            accept='.jpeg, .png, .jpg'
            value={file}
            onChange={handleChange}
        />
        <button type='submit' onClick={handleSubmit}>Upload Place Image</button>
    </div>
  )
}

export default UploadFile