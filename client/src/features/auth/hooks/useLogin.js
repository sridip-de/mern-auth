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

        // Component responsibilities
        options.onSuccess?.(...args);
      }
    },
    onError: (error) => {

      //Component responsibilites
      options.onError?.(error);
    },
  })
}
