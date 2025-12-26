import { useMutation } from "@tanstack/react-query"
import { authService } from "../services/authService";
import { queryClient } from "@/config/query.config";

export const useLogoutMutation = (options = {}) => {
  return useMutation({
    mutationFn: authService.userLogout,
    onSuccess: (...args) => {
      const [res] = args;
      if (res.data.success) {
        queryClient.removeQueries({queryKey:['auth']});
        // Component responsibilities
        options.onSuccess?.(...args)
      }
      q
    },
    onError: (error) => {
      // component responsibilities
      options.onError?.(error)
    }
  })
}