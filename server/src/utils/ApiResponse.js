class ApiResponse {
  constructor(status, data, message) {
    this.status = status;
    this.data = data;
    this.message = message;
    this.sucess = status >= 200 && status < 300;
  }
}

export default ApiResponse;