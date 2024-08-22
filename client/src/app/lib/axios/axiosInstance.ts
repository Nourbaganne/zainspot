import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
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

// axiosInstance.interceptors.response.use(
//   response => {
//     return response;
//   },
//   async error => {
//     const { config, response: { status } } = error;
//     const originalRequest = config;

//     if (status === 429) {
//       // Handle 429 Too Many Requests
//       const retryAfter = error.response.headers['retry-after'];
//       const delay = retryAfter ? parseInt(retryAfter) * 1000 : 2000;

//       await new Promise(resolve => setTimeout(resolve, delay));

//       return axiosInstance(originalRequest); // Retry the request
//     }


//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
