import axios from 'axios';

if (process.env.NODE_ENV === 'development') {
  console.log('Running in development mode');
} else if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');
}

const axiosInstance = axios.create({
	// baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	baseURL: 'http://localhost:3001',
	timeout: 10000,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem('token');
		if (accessToken) {
			config.headers.setAuthorization(`Bearer ${accessToken}`);
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default axiosInstance;
