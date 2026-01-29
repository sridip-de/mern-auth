import { useQuery, queryOptions } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { queryClient } from "@/config/query.config";
import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";

/**
 * Core authentication verification hook
 * Should be called at the root level (App.js or AuthProvider)
 */

const authOption = queryOptions({
  queryKey: ['auth'],
  queryFn: authService.userVerify,
  retry: false,
  staleTime: 5 * 60 * 1000, // 5 min
  gcTime: 10 * 60 * 1000,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: true, // Verify on internet reconnect
  select: (data) => data?.data?.success ?? false, // If data is undefined or null return false
})

export const useAuth = () => {
  //console.trace('🔵 useAuth() called from:');

  const setAuthenticated = useAuthStore(state => state.setAuthenticated);

  const query = useQuery(authOption);

  useEffect(() => {
    if (query.isSuccess) {
      setAuthenticated(query.data)
    }

    if (query.isError) {

      console.log(query.error);
      //console.error('Auth verification failed:',query.error);
      setAuthenticated(false);
    }
  }, [query.isSuccess, query.data, query.isError, setAuthenticated]);

  return query;

};

// Helper hook to invalidate auth (for logout)
export const useInvalidateAuth = () => {
  return () => {
    queryClient.invalidateQueries({ queryKey: ['auth'] });
  };
};
