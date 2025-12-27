import { createContext, useContext, useCallback } from 'react';
import { useIsAuthenticated } from '@/features/auth/hooks/useAuth';

export const AuthContext = createContext(null);

const AuthContextProvider = ({children}) => {
  // Use React Query for auth state
  const { isAuthenticated, isLoading, error } = useIsAuthenticated();

  const value = {
    isAuthenticated,
    isLoading,
    error,
  };

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
