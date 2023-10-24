import React from 'react'

import { useLoaderData } from 'react-router-dom'
import UserPlace from '../Components/Places/UserPlace'

export async function loader(userId) {

  const creatorId = userId.params.uid

  let res
  try {
    res = await fetch(`http://localhost:5000/api/places/users/${creatorId}`)
  } catch (error) {
    console.log(error);
  }
  const data = await res.json()
  
  return data
}

const Places = () => {
  
  const userData = useLoaderData()
  const places = userData.places
  
  const userPlace = places && places.map(p => {
    return(
        <div key={p.id}>
          <UserPlace 
            place={p}
          />
        </div>
    )
  })

  if (!userPlace) {
    const error = userData.message
    return(
      <div>
        <h2>{error}</h2>
      </div>
    )
  }

  return (
    <>
      {userPlace}
    </>
  )
}

export default Places