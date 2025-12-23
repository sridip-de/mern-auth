import { useQuery } from "@tanstack/react-query";
import { useNavigate } from 'react-router';

import userService from '../../services/userService'

// Hook to get current user (only runs on mount/Refresh)
export const useFetchUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: userService.getUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: 'stale', // Refetch if data is stale
  });
};