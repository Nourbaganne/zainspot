import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  config => {

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Handle global errors here, e.g., redirect to login on 401
    if (error.response && error.response.status === 401) {
      // Redirect to login page or handle token refresh
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
