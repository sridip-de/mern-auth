import { useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/userService";
import { useAuthStore } from "@/store/auth.store";

// Hook to get current user (depends on auth status)
export const useFetchUser = () => {
  //console.trace('🟡 useFetchUser() called from:');

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  //console.log(isAuthenticated)

  return useQuery({
    queryKey: ['user'],
    queryFn: userService.getUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: 'stale',
    enabled: isAuthenticated,

  });
};
