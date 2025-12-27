import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userService";
import { useAuth } from "@/features/auth/hooks/useAuth";

// Hook to get current user (depends on auth status)
export const useFetchUser = () => {
  const { data: isAuthenticated, isLoading: authLoading } = useAuth(); // this call is not happening here, it is beging called by useFetchUser inside a React Component
  
  return useQuery({
    queryKey: ['user'],
    queryFn: userService.getUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
    enabled: !!isAuthenticated, // Only fetch if authenticated
    refetchOnWindowFocus: false,
    refetchOnMount: 'stale',
  });
};
