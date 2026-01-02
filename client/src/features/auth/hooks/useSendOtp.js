import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/authService";

export const useSendOtp = (options = {}) => {
  return useMutation({
    mutationFn: authService.userSendEmailVerifyOtp,
    onSuccess: (data) => {

      // Component Responsibilities
      options.onSuccess?.(data);
    },
    onError: (error) => {
      console.error('OTP send request failed:', error);

      // Component Responsibilities
      options.onError?.(error);
    },
  });
};