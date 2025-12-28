import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { queryClient } from "@/config/query.config";
import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";


/**
 * Core authentication verification hook
 * Should be called at the root level (App.js or AuthProvider)
 */
export const useAuth = () => {
  //console.trace('🔵 useAuth() called from:');

  const setAuthenticated = useAuthStore(state => state.setAuthenticated);

  const query = useQuery({
    queryKey: ['auth'],
    queryFn: authService.userVerify,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // Cache for 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true, // Verify on reconnect
    select: (data) => data?.data?.success ?? false, // Transform response to boolean

    // Handle Error Globally
    onError: (error) => {
      console.error('Auth verification failed', error);
    }
  });

  useEffect(() => {
    if(query.isSuccess) {
      console.log(query.data)
      setAuthenticated(query.data)
    }
  },[query.isSuccess, query.data, setAuthenticated]);

  return query;

};

// Helper hook to invalidate auth (for logout)
export const useInvalidateAuth = () => {
  return () => {
    queryClient.invalidateQueries({ queryKey: ['auth'] });
  };
};
