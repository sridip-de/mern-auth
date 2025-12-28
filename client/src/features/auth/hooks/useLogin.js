import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "../services/authService";
import { useAuthStore } from "@/store/auth.store";

export const useLoginMutation = (options = {}) => {
  const queryClient = useQueryClient();
  const setAuthenticated = useAuthStore((state)=> state.setAuthenticated)

  return useMutation({
    mutationFn: authService.userLogin,

    onMutate: async () => {
      //Clear all ongoing queries
      await queryClient.cancelQueries({ queryKey: ['user'] });
      await queryClient.cancelQueries({ queryKey: ['auth'] });

    },

    onSuccess:async (res, isLoading) => {

      if (res.data?.success) {

        // // Store user data immediately (optimistic)
        // if (res.data?.data) {
        //   queryClient.setQueryData(['user'], res)
        // }

        // Update authStore state optismisticly
        //setAuthenticated(true)

        // Prefetch user Data if not included in login response
        await queryClient.invalidateQueries({ queryKey: ['auth'] })
        // queryClient.invalidateQueries({ queryKey: ['user'] });


        // Component responsibilities
        options.onSuccess?.(res, isLoading);
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