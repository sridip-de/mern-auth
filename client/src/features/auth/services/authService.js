import axiosInstance from "@/config/axios.config";
import API_ENDPOINTS from "@/constants/api.endpoints";

export const authService = {
  userLogin: (data) => axiosInstance.post(API_ENDPOINTS.AUTH_ENDPOINT.LOGIN,data),
  userLogout: (data) => axiosInstance.post(API_ENDPOINTS.AUTH_ENDPOINT.LOGOUT,data),
  userRegister: (data) => axiosInstance.post(API_ENDPOINTS.AUTH_ENDPOINT.REGISTER,data),
  userEmailVerify: (data) => axiosInstance.post(API_ENDPOINTS.AUTH_ENDPOINT.VERIFY_EMAIL,data),
  userVerify: (data) => axiosInstance.post(API_ENDPOINTS.AUTH_ENDPOINT.VERIFY_AUTH,data),
  userSendEmailVerifyOtp: (data) => axiosInstance.post(API_ENDPOINTS.AUTH_ENDPOINT.SEND_OTP,data),
}
