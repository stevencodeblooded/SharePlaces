import React from 'react'

import { useLoaderData, useParams } from 'react-router-dom'
import UserPlace from '../Components/Places/UserPlace'
import place1 from '../Components/assets/place1.jpg'
import place2 from '../Components/assets/place2.jpeg'
import place3 from '../Components/assets/place3.jpg'

export async function loader() {
  const res = await fetch('http://localhost:5000/api/users')
  const data = await res.json()

  return data
}

const Places = () => {

  const userData = useLoaderData()
  console.log('UserData - Places',userData);

  const USERS = [
    {
      uid: 1,
      name: "Steven Ochieng",
      profileImage: '',
      placesVisited: 3,
      placeImage: place1,
      titleOfPlace: 'Moi Avenue',
      street: 'Mutarrakea Junction ',
      descrption: 'Create a beautiful blog that fits your style. Choose from a selection of '
    },
    {
      uid: 2,
      name: "Clinton Odhiambo",
      profileImage: '',
      placesVisited: 3,
      placeImage: place2,
      titleOfPlace: 'Uhuru Park',
      street: 'Kenyatta Avenue',
      descrption: 'Give your blog the perfect home. Get a blogspot.com domain or buy a custom domain with just a few clicks.'
    },
    {
      uid: 3,
      name: "Erine Auma",
      profileImage: '',
      placesVisited: 3,
      placeImage: place3,
      titleOfPlace: 'Savanna Park',
      street: 'Biashara Street',
      descrption: 'Get paid for your hard work. Google AdSense can automatically display relevant targeted ads on your blog so that you can earn income by posting about your passion.'
    }
  ]

  const { uid } = useParams()

  const user = USERS.find((user) => {
    return user.uid === parseInt(uid)
  })

  if (!user) {
    return <h1>No User With That ID!</h1>
  }

  return (
    <div>
      <UserPlace user={user} />
    </div>
  )
}

export default Places