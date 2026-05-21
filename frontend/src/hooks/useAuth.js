import axios from "axios";
import API_URL from "./api.js";

export const signup = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const login = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, data);
        return response.data;

    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const sendotp = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/auth/send-otp/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const verifyotp = async (id, otp) => {
    try {
        const response = await axios.post(`${API_URL}/auth/verify-otp/${id}`, { otp });
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const resetpassword = async (id, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/reset-password/${id}`, { password });
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const sendotpemail = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/auth/sendemail-otp`, { email });
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const verifyotpemail = async (email, otp) => {
    try {
        const response = await axios.post(`${API_URL}/auth/verifyemail-otp`, { email, otp });
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const resetpasswordemail = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/reset-password-email`, { email, password });
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const userData = async (email) => {
    try {
        const response = await axios.get(`${API_URL}/auth/userData`, email)
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const getAllUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/auth/all-users`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}