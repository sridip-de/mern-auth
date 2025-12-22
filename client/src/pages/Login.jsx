import React from 'react'

import LoginForm from '../components/features/auth/LoginForm'

const Login = () => {
  return (
    <div className='
      bg-zinc-800
      flex flex-col items-center justify-center 
      h-[calc(100vh-60px)]
    '>
      <LoginForm />
    </div>
  )
}

export default Login