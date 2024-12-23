import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: process.env.NODE_ENV === 'development'
		? 'http://localhost:3001' // Local backend
		: process.env.NEXT_PUBLIC_API_BASE_URL, // 
	timeout: 50000,
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
