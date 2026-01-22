class TokenRefreshManager {
  constructor() {
    this.isRefreshing = false;
    this.failedQueue = [];
  }

  processQueue(error = null, success = false) {
    this.failedQueue.forEach(promise => {
      if(error) {
        promise.reject(error);
      } else {
        promise.resolve(success);
      }
    });

    this.failedQueue = [];
  }

  addToQueue() {
    return new Promise((resolve, reject)=> {
      this.failedQueue.push({resolve, reject})
    })
  }

  setRefreshing(status) {
    this.isRefreshing = status;
  }

  getRefreshingStatus() {
    return this.isRefreshing;
  }

  async handleTokenRefresh(axiosInstance, originalRequest) {
    if(this.isRefreshing) {
      await this.addToQueue();
      return axiosInstance(originalRequest)
    }

    this.setRefreshing(true);
    originalRequest._retry = true;

    try {
      await axiosInstance.post('/auth/refresh');
      this.processQueue(null, true);
      return axiosInstance(originalRequest);
    } catch (error) {
      this.processQueue(error, false);
      //
      throw error;
    } finally {
      this.setRefreshing(false);
    }
  }

  async handleRefreshFailure(axiosInstance) {
    try {
      await axiosInstance.post('/auth/logout');
    } catch (error) {
      console.error('Logout failed:',error);
    }
    window.location.href = '/login'
  }
}

export default new TokenRefreshManager;