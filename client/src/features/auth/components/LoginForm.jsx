import { NavLink, useNavigate } from "react-router"
import { useState } from "react"

import APP_ROUTES from "@/constants/app.routes"
import { useLoginMutation } from "../hooks/useLogin"
import { toast } from "react-toastify"


export const LoginForm = () => {

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  const loginMutation = useLoginMutation({
    onSuccess: (res) => {
      navigate(APP_ROUTES.HOME)
      console.log(res.data.success)
      toast.success(res.data.message) // toasts are part of UI code so don't put in hooks
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed Login Error in Mutation"
      );
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginMutation.mutate(loginData)
  }


  return (
    <div className='space-y-4 min-w-sm border border-zinc-500 p-6 rounded-md bg-zinc-800 flex flex-col items-center'>
      <h4 className='font-bold text-lg text-zinc-50'>
        Login
      </h4>
      <p className="text-zinc-400">Login to your accaunt</p>
      <form className='space-y-4 w-full'>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">Email</label>
          <input
            name="email"
            type='email'
            placeholder='Enter email'
            value={loginData.email}
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
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">Password</label>
          <input
            name="password"
            type='password'
            placeholder='Enter password'
            value={loginData.password}
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
          />
        </div>

        <button
          type='submit'
          className="
            w-full px-4 py-2.5
            bg-blue-500
            border border-zinc-600
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
          Login
        </button>

      </form>
      <div className="flex justify-center">
        <p className='text-zinc-400 text-sm'>
          Don't have an account? <NavLink to="/register" className='text-blue-500 hover:underline'>Register</NavLink>
        </p>
      </div>
    </div>
  )
}
