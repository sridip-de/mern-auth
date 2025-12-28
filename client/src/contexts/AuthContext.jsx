import { createContext, useContext, useCallback } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';

export const AuthContext = createContext(null);

const AuthContextProvider = ({children}) => {
  //console.trace('🟢 useAuthContext() called from:');
  
  const value = {}

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Abstraction code 
// It reduces the need of importation of two useContext and Authcontext in each file
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if(!context) throw Error('useAuth must be used within AuthContextProvider');
  return context;
}

export default AuthContextProvider;
