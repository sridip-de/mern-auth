class TokenRefresher {
  constructor() {
    this.isRefreshing = false;
    this.failedQueue = [];
  }

  processQueue(error) {
    this.failedQueue.forEach(promise => {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve();
      }
    });
    this.failedQueue = [];
  };

  async handleResponseError(error, axiosInstance) {
    console.log('entered');
    const originalRequest = error.config;

    // Prevent intercepting the refresh request itself
    if (originalRequest.url?.includes('/auth/refresh')) {
      return Promise.reject(error);
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (this.isRefreshing) {
        return new Promise((resolve, reject) => {
          this.failedQueue.push({ resolve, reject });
        }).then(() => {
          return axiosInstance(originalRequest); // the global axios interceptor is gonna get this returned server value and serve the react components
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      this.isRefreshing = true;

      // axiosInstance.interceptors.response.eject(interceptor);
      //
      return new Promise((resolve, reject) => {
        axiosInstance.post('/auth/refresh') // only this should call the /auth/refresh endpoint no other service other wise the url includes auth endpoint would not work
          .then(() => {
            this.processQueue(null);
            resolve(axiosInstance(originalRequest)); // relove the promise created in this new Promise chain and in resolve parameter return the data of the original request, ex: get user data;
          })
          .catch((err) => {
            this.processQueue(err);
            //window.location.href = '/login';
            reject(err);
          })
          .finally(() => {
            this.isRefreshing = false;
          })
      })
    }
    console.log('not a 401 error so getting out')
    return Promise.reject(error); // If not a 401 error or a Network error
  }
};

export default TokenRefresher;

// * Note *
// Each time axiosInstance is called except ** axiosInstance(originalRequest) ** , it created a **brand new request** 
// with a ** brand new config object**.
// So: 
// - 1st `/auth/refresh` call → new config → `_retry: undefined`
// - 2nd `/auth/refresh` call → new config → `_retry: undefined`
// - 3rd `/auth/refresh` call → new config → `_retry: undefined`
// - ... **forever!**
// But: axiosInstance(originalRequest)  `_retry: undefined` persists but the first method not
//
// axiosInstance.post('/auth/refresh') → NEW config
// axiosInstance(originalRequest) where originalRequest is retried → REUSES the same config object 
//
// // If we hvae used another instance of axios to call auth refresh axios.post('/auth/refresh');
// then the first instance interceptor would not caught the ** error ** returned by /auth/refresh 
//
// All Parrent Promises gets stucked if any of the child promise is in pending status
//
// // When axiosInstance.post(/auth/refresh) it stops the execution here, its now waiting...
// if it returns with a 401 error the intecrptor runs again(a 2nd instance) calls the handleRefreshError() 
// the if(urlsincludes...) checks and rejects() immediately
// now it returns back to the first intercept and gets cautht in axiosInstance.post(..).catch() block
//
// its like function calls intself isnside fucntion (recursive call);
