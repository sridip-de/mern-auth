import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "../services/authService";

export const useLoginMutation = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.userLogin,

    onMutate: async () => {
      //Clear all ongoing queries
      await queryClient.cancelQueries({ queryKey: ['user'] });
      await queryClient.cancelQueries({ queryKey: ['auth'] });

      //Enable auth queries for after login
      queryClient.setQueryDefaults(['auth'], { enabled: true })
    },

    onSuccess: (...args) => {
      const [res] = args;

      if (res.data?.success) {

        // // Store user data immediately (optimistic)
        // if (res.data?.data) {
        //   queryClient.setQueryData(['user'], res)
        // }

        // // Update auth state optismisticly
        // queryClient.setQueryData(['auth'],{data:true})

        // Prefetch user Data if not included in login response
        queryClient.invalidateQueries({ queryKey: ['auth'] })
        queryClient.invalidateQueries({ queryKey: ['user'] });


        // Component responsibilities
        options.onSuccess?.(...args);
      }
    },

    onError: (error) => {
      console.error(error)
      //Component responsibilities
      options.onError?.(error);
    },
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