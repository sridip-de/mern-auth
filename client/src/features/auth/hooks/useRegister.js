import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/authService";

export const useRegisterMutation = (options = {}) => {
  return useMutation({
    mutationFn: authService.userRegister,

    onSuccess: (res) => {
      if(res.data?.success) {
        // Update the authStore zustand state
        console.log(res)

        // Componenet Logics
        options.onSuccess?.(res);
      }
    },

    onError: (error) => {
      console.error('Error in Register query',error)

      // component logics on error
      options.onError?.(error);
    }
  })
}