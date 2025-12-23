import {createContext, useContext, useEffect, useState,useCallback} from 'react';

import {toast} from 'react-toastify'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import userService from '../services/userService'

export const AuthContext = createContext(null);

const AuthContextProvider = ({children}) => {

  const queryClient = useQueryClient();

  const { data: userData, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: userService.getUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: 'stale',
    onError: (error) => {
      // Only log errors, don't toast on 401 (expected when not logged in)
      if (error.response?.status !== 401) {
        console.error('Auth error:', error);
      }
    }
  });

  const isLoggedIn = !!userData?.data?.success;
  const user = userData?.data?.data;

  const value = {
    isLoggedIn,
    user,
    isLoading,
    queryClient
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