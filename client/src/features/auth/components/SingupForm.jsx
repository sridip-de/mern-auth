import { useState } from 'react'

export const RegisterForm = () => {

  const [registerData, setRegisterData] = useState({
    name:"",
    userName:"",
    email:"",
    password:""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(registerData);
    setRegisterData({
      name:"",
      userName:"",
      email:"",
      password:""
    })
  }

  return (
    <div className='space-y-4 min-w-sm border border-zinc-500 p-6 rounded-md bg-zinc-800'>
      <h4 className='font-bold text-lg text-zinc-50 flex justify-center'>
        Register
      </h4>
      <form className='space-y-4'>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">Name</label>
          <input 
            name="name"
            type='text' 
            placeholder='Full Name'
            className="
              w-full px-3 py-2.5
              bg-zinc-700
              border border-zinc-600
              text-zinc-50
              rounded-md
              placeholder:text-zinc-500
              focus:outline-none
              focus:ring-2
              focus:border-transparent
              transition-all
            "
            onChange={handleChange}
            value={registerData.name}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">Username</label>
          <input 
            name="userName"
            type='text' 
            placeholder='Username'
            className="
              w-full px-3 py-2.5
              bg-zinc-700
              border border-zinc-600
              text-zinc-50
              rounded-md
              placeholder:text-zinc-500
              focus:outline-none
              focus:ring-2
              focus:border-transparent
              transition-all
            "
            onChange={handleChange}
            value={registerData.userName}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">Email</label>
          <input 
            name="email"
            type='email' 
            placeholder='Enter email'
            className="
              w-full px-3 py-2.5
              bg-zinc-700
              border border-zinc-600
              text-zinc-50
              rounded-md
              placeholder:text-zinc-500
              focus:outline-none
              focus:ring-2
              focus:border-transparent
              transition-all
            "
            onChange={handleChange}
            value={registerData.email}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">Password</label>
          <input 
            name='password'
            type='password' 
            placeholder='Enter password'
            className="
              w-full px-3 py-2.5
              bg-zinc-700
              text-zinc-50
              rounded-md
              placeholder:text-zinc-500
              focus:outline-none
              focus:ring-2
              focus:border-transparent
              transition-all
            "
            onChange={handleChange}
            value={registerData.password}
          />
        </div>

        <button 
          type='submit'
          className="
            w-full px-4 py-2.5
            bg-blue-500
            text-zinc-50
            rounded-md
            hover:bg-zinc-600
            focus:outline-none
            focus:ring-2
            focus:border-transparent
            transition-all
          "
          onClick={handleSubmit}
        >
          Register
        </button>

      </form>
    </div>
  )
}

