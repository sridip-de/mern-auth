import API_ENDPOINTS from "../constants/api.endpoints";
import axiosInstance from "../config/axios.config";

const userService = {
  getUser: () => axiosInstance.get(API_ENDPOINTS.USER_ENDPOINT.GET_USER)
}

export default userService;