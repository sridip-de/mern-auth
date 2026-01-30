import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "../services/authService";
import { useQueryState } from "@/store/queryState.store";
import { useInvalidateAuth } from "./useAuth";
import { useInvalidateUser } from "@/features/user";

export const useLogoutMutation = (options = {}) => {

  const { setQueryState } = useQueryState();

  return useMutation({
    mutationFn: authService.userLogout,
    onSuccess: (res) => {
      if (res?.data?.success) {
        setQueryState(false);
        useInvalidateAuth();
        useInvalidateUser();
        options.onSuccess?.(res)
      }
    },
    onError: (error, variables, context) => {
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

