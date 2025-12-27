import { useMutation } from "@tanstack/react-query"
import { authService } from "../services/authService";
import { queryClient } from "@/config/query.config";

export const useLoginMutation = (options = {}) => {
  return useMutation({
    mutationFn: authService.userLogin,
    onSuccess: (...args) => {
      const [res] = args;

      if(res.data?.success) {
        // Invalidate auth query to refresh authentication state
        queryClient.invalidateQueries({ queryKey: ['auth'] });
        queryClient.invalidateQueries({queryKey:['user']})
        
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
