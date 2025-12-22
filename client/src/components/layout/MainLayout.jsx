import React from 'react'
import { Outlet } from 'react-router'

import Header from '../layout/Header/Header'
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