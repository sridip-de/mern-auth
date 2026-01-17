import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const RegisterForm = () => {

  // const [registerData, setRegisterData] = useState({
  //   name:"",
  //   userName:"",
  //   email:"",
  //   password:""
  // })

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setRegisterData(prev => ({
  //     ...prev,
  //     [name]: value
  //   }))
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(registerData);
  //   setRegisterData({
  //     name:"",
  //     userName:"",
  //     email:"",
  //     password:""
  //   })
  // }

  const form = useForm({
    mode:'all'
  });

  const {
    register,
    handleSubmit,
    formState,
  } = form;

  const {errors} = formState;

  return (
    <div className='space-y-4 min-w-sm border border-zinc-500 p-6 rounded-md bg-zinc-800'>
      <h4 className='font-bold text-lg text-zinc-50 flex justify-center'>
        Register
      </h4>
      <form noValidate className='space-y-4'>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">Name</label>
          <input 
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
            {...register('name',{
              required:'Full name is required'
            })}
          />
          <p className='text-red-500'>{errors.name?.message}</p>
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
            {...register('userName',{
              required:'User name is required'
            })}
          />
          <p className='text-red-500'>{errors.userName?.message}</p>
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
            {...register('email',{
              required:'email is required'
            })}
          />
          <p className='text-red-500'>{errors.email?.message}</p>
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
            {...register('password',{
              required:'password is required'
            })}
          />
          <p className='text-red-500'>{errors.password?.message}</p>
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

