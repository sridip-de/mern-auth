import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/authService";


export const useEmailVerify = (options = {}) => {

  return useMutation({
    mutationFn: authService.userEmailVerify,
    onSuccess: (res) => {
      if (res.data?.success) {
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
