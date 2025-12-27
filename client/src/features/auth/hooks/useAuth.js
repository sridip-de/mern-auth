import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { queryClient } from "@/config/query.config";


/**
 * Core authentication verification hook
 * Should be called at the root level (App.js or AuthProvider)
 */
export const useAuth = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['auth'],
    queryFn: authService.userVerify,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // Cache for 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: 'stale',
    refetchOnReconnect: true, // Verify on reconnect
    select: (data) => data?.data?.success ?? false, // Transform response to boolean
    
    // Handle Error Globally
    onError: (error) => {
      console.error('Auth verification failed', error);
    }
  });

};

// Helper hook to get current auth status
export const useIsAuthenticated = () => {
  const { data: isAuthenticated, isLoading, error } = useAuth();
  
  return {
    isAuthenticated: isAuthenticated ?? false,
    isLoading,
    error
  };
};

// Helper hook to invalidate auth (for logout)
export const useInvalidateAuth = () => {
  return () => {
    queryClient.invalidateQueries({ queryKey: ['auth'] });
  };
};
