import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //staleTime: 1000 * 60 * 5,
      //gcTime: 1000,
      retry: false,
      //refetchOnWindowFocus: false,
    },
    mutations: {
      //retry: 1,
    },
  },
});