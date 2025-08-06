import axios from 'axios';
import { router } from 'expo-router';

// let baseURL = "https://openmic-app-backend-1093473751682.us-central1.run.app"
let baseURL = "https://acdc16273db5.ngrok-free.app"
// if (__DEV__) {
//   baseURL = 'http://localhost:8080'
// }

const axiosClient = axios.create({ baseURL });

// Add a response interceptor to handle 401 errors globally
axiosClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Redirect on 401 Unauthorized
      router.replace('/+not-found');
    }
    return Promise.reject(error);
  }
);

export default axiosClient; 