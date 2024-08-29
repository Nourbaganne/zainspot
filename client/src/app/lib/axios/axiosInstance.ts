import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3001',
	timeout: 5000,
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
