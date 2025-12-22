import {createContext, useEffect, useState} from 'react';

import {toast} from 'react-toastify'
import userService from '../services/userService'

export const AuthContext = createContext(null);

const AuthContextProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(()=>{
    getUserData();
  },[])

  const getUserData = async () => {
    try {

      const response = await userService.getUser()
      
      if(response.data.success) {
        setIsLoggedIn(true);
        setUser(response.data.data)
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
        toast(error.response?.data?.message)
    }
  }

  const value = {
    isLoggedIn, setIsLoggedIn,
    user, setUser,
    getUserData
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;