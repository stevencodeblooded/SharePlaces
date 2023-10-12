import React from 'react'

import Header from '../Shared/Header/Header'
import Footer from '../Shared/Footer/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='full-container'>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout