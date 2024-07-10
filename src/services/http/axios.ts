import axios from "axios";

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
	config => {
		config.headers["X-Api-Key"] = import.meta.env.VITE_API_KEY;
		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

api.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		return Promise.reject(error);
	},
);
