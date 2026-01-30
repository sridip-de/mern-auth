import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userService";
import { useQueryState } from "@/store/queryState.store";
import { queryClient } from "@/config/query.config";


// Hook to get current user (depends on auth status)
export const useFetchUser = () => {
  //console.trace('🟡 useFetchUser() called from:');
  const { queryState } = useQueryState();

  return useQuery({
    queryKey: ['user'],
    queryFn: userService.getUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: 'stale',
    enabled: queryState,

  });
};

export const useInvalidateUser = () => {
  return queryClient.removeQueries({ queryKey: ['user'] });
}
