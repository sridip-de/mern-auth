import axios from 'axios';
import tokenRefreshManager from '@/utils/tokenRefresh';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000,
  withCredentials: true,
})

// axiosInstance.interceptors.response.use(
//   (response) => response,

//   async (error) => {
//     const originalRequest = error.config;

//     if(error.response?.status === 401 && !originalRequest._retry) {
//       return tokenRefreshManager.handleTokenRefresh(axiosInstance, originalRequest);
//     }

//     return Promise.reject(error);
//   }
// )

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config

//     if(error.response?.status === 401 && 
//       !originalRequest._retry &&
//       !originalRequest.url.includes('/auth/') // exclude /auth/ endpoint prevent infinite loop
//     ) {
//       originalRequest._retry = true;

//       // Immediately disale all dependent 'enabled' queries
      
      
//       // Clear user data 

//       try {
//         // Try to refresh the token using the refresh endpoint
//         await axiosInstance.post('/auth/refresh');
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         // Refresh failed, just reject the error
//         // Let the component/route handle redirect based on auth state
//         return Promise.reject(refreshError)
//       }
//     }

//     return Promise.reject(error);
//   }
// )

export default axiosInstance;

// 1. The refresh request fails with 401
// 2. The interceptor catches it
// 3. ***Since this is a NEW request (not the original), it doesn't have `_retry` set
// 4. It tries to refresh again by calling `/auth/refresh`
// 5. That fails with 401 again
// 6. ** Infinite loop!**
// Solution
// Exclude the auth endpoints form the retry logic
// now if /auth/refresh fails with 401, the interceptor sees it's and auth endpoint and just rejects it without trying to refresh again
