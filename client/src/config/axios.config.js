import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 1000,
  withCredentials: true,
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if(error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/refresh')) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token using the refresh endpoint
        await axiosInstance.post('/auth/refresh');
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed, just reject the error
        // Let the component/route handle redirect based on auth state
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error);
  }
)

export default axiosInstance;