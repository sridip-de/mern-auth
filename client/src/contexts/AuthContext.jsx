import {createContext, useContext, useEffect, useState,useCallback} from 'react';

import {toast} from 'react-toastify'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import userService from '../services/userService'
import { useFetchUser } from '../hooks/queries/use.auth.query';

export const AuthContext = createContext(null);

const AuthContextProvider = ({children}) => {

  const value = {
    // isLoggedIn,
    // user,
    // isLoading,
    //queryClient
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Abstruction code 
// It reduces the need of importation of two useContext and Authcontext in each file
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if(!context) throw Error('useauth must be used within AuthContextProvider');
  return context;
}

export default AuthContextProvider;