import { useQuery, queryOptions } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { queryClient } from "@/config/query.config";

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
  refetchOnMount: true,
  refetchOnReconnect: true, // Verify on internet reconnect 
})

export const useAuth = () => {
  //console.trace('🔵 useAuth() called from:');
  return useQuery(authOption);
};

// Helper hook to invalidate auth (for logout)
export const useInvalidateAuth = () => {
  return queryClient.removeQueries({ queryKey: ['auth'] });
};

// NOTE 
// - If server returns 4xx code in response
// - axios automatically throws an error.
// - react query sees this as an error.
// - data value will be undefined
//
