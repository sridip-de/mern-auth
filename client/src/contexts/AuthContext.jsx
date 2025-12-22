import {createContext, useContext, useEffect, useState} from 'react';

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

// Abstruction code 
// It reduces the need of importation of two useContext and Authcontext in each file
export const useAuth = () => {
  const context = useContext(AuthContext);
  if(!context) throw Error('useauth must be used within AuthContextProvider');
  return context;
}

export default AuthContextProvider;