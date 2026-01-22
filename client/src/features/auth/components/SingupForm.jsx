import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import { useRegisterMutation } from '../hooks/useRegister';

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

  const schema = yup.object({
    name: yup.string()
    .required('Name is required')
    .min(2,'Name must be atleast 2 characters')
    .max(50,'Name can not exceed 50 characters')
    ,
    userName:yup.string()
    .required('Username is required')
    .min(4, 'Username must be at least 4 charecters')
    .max(20, 'Username cannot exceed 20 characters'),
    email: yup.string().email().required('Email is required'),
    password: yup.string()
    .required('Password is required')
    .min(4,'password must be atleast 4 character long')
    .max(20,'password cannot exceed 20 character')
  })

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  });

  const registerMutation = useRegisterMutation({
    onSuccess: (res) => {
      toast.success(res.data.message)
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to register"
      )
    }
  });

  const {
    register,
    handleSubmit,
    reset,
    formState,
  } = form;

  const { errors, isSubmitSuccessful } = formState;

  const onSubmit = (registerData) => {
    console.log(registerData)
    registerMutation.mutate(registerData)
  }

  const onError = (error) => {
    console.log(error);
  }

  useEffect(()=> {
    if(isSubmitSuccessful){
      reset();
    }
  },[isSubmitSuccessful, reset])


  return (
    <div className='space-y-4 min-w-sm border border-zinc-500 p-6 rounded-md bg-zinc-800'>
      <h4 className='font-bold text-lg text-zinc-50 flex justify-center'>
        Register
      </h4>
      <form noValidate className='space-y-4' onSubmit={handleSubmit(onSubmit,onError)} >

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
            {...register('name')}
          />
          <p className='text-red-500'>{errors.name?.message}</p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">Username</label>
          <input
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
            {...register('userName')}
          />
          <p className='text-red-500'>{errors.userName?.message}</p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">Email</label>
          <input
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
            {...register('email')}
          />
          <p className='text-red-500'>{errors.email?.message}</p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">Password</label>
          <input
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
            {...register('password')}
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
          //onClick={handleSubmit}
        >
          Register
        </button>

      </form>
    </div>
  )
}

