import React from 'react'
import RegisterForm from '../components/features/auth/SingupForm'

const Singup = () => {
  return (
    <div className='
     bg-zinc-800
      flex flex-col
      items-center
      justify-center
      h-[calc(100vh-60px)]
    '>
      <RegisterForm />
    </div>
  )
}

export default Singup