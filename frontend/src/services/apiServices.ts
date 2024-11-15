import axios from "axios";

const api = axios.create({
	baseURL: process.env.BACKEND_URL ?? "http://localhost:8080",
	withCredentials: true,
});

export default api;
