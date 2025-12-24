import axiosInstance from "@/config/axios.config";
import API_ENDPOINTS from "@/constants/api.endpoints";

const authService = {
  userLogin: (data) => axiosInstance.post(API_ENDPOINTS.AUTH_ENDPOINT.LOGIN,data),
  userLogout: (data) => axiosInstance.post(API_ENDPOINTS.AUTH_ENDPOINT.LOGOUT,data),
  userRegister: (data) => axiosInstance.post(API_ENDPOINTS.AUTH_ENDPOINT.REGISTER,data),
}


export default authService;