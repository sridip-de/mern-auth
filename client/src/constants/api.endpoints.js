const API_ENDPOINTS = {
  AUTH_ENDPOINT:{
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    SEND_OTP: '/auth/send-verify-otp',
    VERIFY_EMAIL: '/auth/verify-otp',
    VERIFY_AUTH:'/auth/verify-auth'
  },
  USER_ENDPOINT: {
    GET_USER: '/user/data',

  }
}

export default API_ENDPOINTS;