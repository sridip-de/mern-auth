export const  CONSTANTS = {
  BASE_URL: import.meta.env.VITE_NODE_ENV === "production"? 'https://mern-auth-nn1z.onrender.com/api' :'http://localhost:3000/api',
  GOOGLE_AUTH_URI:import.meta.env.VITE_NODE_ENV === 'production' ? 'https://mern-auth-nn1z.onrender.com/api/auth/google' : 'http://localhost:3000/api/auth/google',

}
