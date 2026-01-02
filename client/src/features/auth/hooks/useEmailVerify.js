import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { useAuthStore } from "@/store/auth.store";

export const useEmailVerify = (options = {}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useMutation({
    mutationFn: authService.userEmailVerify,
    enabled: isAuthenticated,
    onSuccess: (res) => {
      if(res.data?.success) {
        //Component Responsibilities
        options.onSuccess?.(res);
      }
    },
    onError: (error) => {
      console.error(error)

      //component responsibilities
      options.onError?.(error);
    },
    
  })
}