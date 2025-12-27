import { useMutation } from "@tanstack/react-query"
import { authService } from "../services/authService";
import { queryClient } from "@/config/query.config";

export const useLogoutMutation = (options = {}) => {
  return useMutation({
    mutationFn: authService.userLogout,
    onSuccess: (...args) => {
      const [res] = args;
      if (res.data.success) {
        // Clear all auth-related queries from cache
        queryClient.removeQueries({ queryKey: ['auth'] });
        queryClient.removeQueries({ queryKey: ['user'] });
        
        // Component responsibilities
        options.onSuccess?.(...args)
      }
    },
    onError: (error) => {
      // Component responsibilities
      options.onError?.(error)
    }
  })
}
