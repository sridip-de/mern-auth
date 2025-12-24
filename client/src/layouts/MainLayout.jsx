import React from 'react'
import { Outlet } from 'react-router'

import Header from './Header/Header'
import { ToastContainer } from 'react-toastify'

const MainLayout = () => {
  return (
    <>
      <ToastContainer/>
      <Header />
      <Outlet />
    </>
  )
}

export default MainLayout