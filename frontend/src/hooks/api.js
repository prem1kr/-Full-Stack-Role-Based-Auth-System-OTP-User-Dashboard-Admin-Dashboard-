import axios from "axios";

const API_URL = axios.create({
    baseURL: 'https://smtp-role-based-and-otp-verification.onrender.com/api',
    withCredentials: true
});

export default API_URL;