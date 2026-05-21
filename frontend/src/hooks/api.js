import axios from "axios";

const API_URL = axios.create({
    baseURL: "https://smtp-role-based-and-otp-verification.onrender.com/api"
});

API_URL.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API_URL;