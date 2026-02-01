import axios from 'axios';
import TokenRefresher from '@/utils/tokenRefresher';

import CustomError from '@/utils/errorHandler';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000,
  withCredentials: true,
})

const interceptor = axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    // const originalRequest = error.config;
    // const customError = new CustomError(error);
    // const errorDetails = customError.getCustomError();
    // if(error.response?.status === 401 && !originalRequest._retry) {
    //   return tokenRefreshManager.handleTokenRefresh(axiosInstance, originalRequest);
    // }
    const tokenRefresher = new TokenRefresher();

    return tokenRefresher.handleResponseError(error, axiosInstance, interceptor)
      .catch((finalError) => {
        return Promise.reject(new CustomError(finalError).getCustomError());
      })
  }
)


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
