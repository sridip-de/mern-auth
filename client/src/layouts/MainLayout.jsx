import React from 'react'
import { Outlet } from 'react-router'

import Header from './Header/Header'
import { ToastContainer } from 'react-toastify'
import { useAuth } from '@/features/auth'

const MainLayout = () => {
  useAuth();
  return (
    <>
      <ToastContainer/>
      <Header />
      <Outlet />
    </>
  )
}

export default MainLayout