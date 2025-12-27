import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "../services/authService";


export const useLogoutMutation = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.userLogout,

    onMutate: async () => {
      //Run before the mutation starts
      await queryClient.cancelQueries();

      queryClient.setQueryData(['auth'],{data:false})
    },

    onSuccess: (...args) => {
      const [res] = args;

      if (res?.data?.success) {

        // Clear all auth-related queries from cache
        queryClient.removeQueries({ queryKey: ['auth'] });
        queryClient.removeQueries({ queryKey: ['user'] });

        // Reset query enabled state
        queryClient.setQueryDefaults(['auth'],{enabled:false})
        
        // Component responsibilities
        options.onSuccess?.(...args)
      }
    },

    onError: (error, variables, context) => {

      // Component responsibilities
      options.onError?.(error)
    }
  })
}

//===========================
// A. Before Mutation Starts
//===========================
// 1. Clear all ongoing queries to prevent race condition
// 2. Update the auth state 
// 3. Return Context for rollback if needed
//============================
// B. On Mutation Success
//============================
// 1. Remove all queries including auth state 
// 2. Clear all cache data for security (optional)
// 3. Reset Default query state for useAuth query to false
// 4. Call custom success handler (optional component responisbility)
//============================
// C. On Mutation Error
//============================
// 1. Rollback optimistic updates
// 2. Call custom error handlers (optional)

