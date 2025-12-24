import { useMutation } from "@tanstack/react-query"
import {toast} from 'react-toastify';

import authService from "../services/authService";

export const useLoginMutation = (options = {}) => {
  return useMutation({
    //mutationKey:['user'],
    mutationFn: authService.userLogin,
    onSuccess: (...args) => {
      const [res] = args;

      if(res.data?.success) {
        toast.success(res.data.message) 

        // Component responsibilities
        options.onSuccess?.(...args);
      }
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed Login Error in Mutation"
      );

      //Component responsibilites
      options.onError?.(error);
    },
  })
}
