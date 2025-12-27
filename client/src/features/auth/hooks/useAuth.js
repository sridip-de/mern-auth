import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { queryClient } from "@/config/query.config";

export const useAuth = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: authService.userVerify,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: 'stale',
    select: (data) => data?.data?.success ?? false, // Transform response to boolean
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
