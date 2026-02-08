import axios from 'axios';
import { CONSTANTS } from '@/constants';
import TokenRefresher from '@/utils/tokenRefresher';

import CustomError from '@/utils/errorConstructor';

const axiosInstance = axios.create({
  baseURL: CONSTANTS.BASE_URL,
  timeout: 5000,
  withCredentials: true,
});

// Place this constructor outside of the interceptor so that each response error don't create a new instance of this class;
const tokenRefresher = new TokenRefresher();

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    // const originalRequest = error.config;
    // const customError = new CustomError(error);
    // const errorDetails = customError.getCustomError();
    // if(error.response?.status === 401 && !originalRequest._retry) {
    //   return tokenRefreshManager.handleTokenRefresh(axiosInstance, originalRequest);
    // }


    return tokenRefresher.handleResponseError(error, axiosInstance)
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
