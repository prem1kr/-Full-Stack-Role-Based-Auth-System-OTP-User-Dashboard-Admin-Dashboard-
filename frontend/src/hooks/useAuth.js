import axios from "axios";

const API_URL = 'https://smtp-role-based-and-otp-verification.onrender.com/api/auth';

export const signup = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const login = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/login`, data);
        return response.data;

    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const sendotp = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/send-otp/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const verifyotp = async (id, otp) => {
    try {
        const response = await axios.post(`${API_URL}/verify-otp/${id}`, { otp });
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const resetpassword = async (id, password) => {
    try {
        const response = await axios.post(`${API_URL}/reset-password/${id}`, { password });
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const sendotpemail = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/sendemail-otp`,{email});
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const verifyotpemail = async (email, otp) => {
    try {
        const response = await axios.post(`${API_URL}/verifyemail-otp`, {email, otp });
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}