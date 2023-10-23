import React from 'react'

import UserCard from '../Components/Users/UserCard'
import { useLoaderData } from 'react-router-dom'

export async function loader() {
  const response = await fetch('http://localhost:5000/api/users')
  const data = await response.json()

  return data
}

const Users = () => {
  const usersData = useLoaderData()
  return (
    <div className='users'>
      <UserCard users={usersData}/>
    </div>
  )
}

export default Users