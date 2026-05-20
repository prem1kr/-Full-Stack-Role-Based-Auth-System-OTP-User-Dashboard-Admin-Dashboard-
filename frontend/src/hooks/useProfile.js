import axios from "axios";

const API_URL = 'https://smtp-role-based-and-otp-verification.onrender.com/api/profile';


export const addProfile = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/add-profile`, data);
        return response.data;

    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const getAllProfiles = async () => {
    try {
        const response = await axios.get(`${API_URL}/all-profile`);
        return response.data;

    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const getProfile = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/get-profile/${id}`);
        return response.data;

    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const updateProfile = async (id,data) => {
    try {
        const response = await axios.put(`${API_URL}/update-profile/${id}`,data);
        return response.data;

    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const deleteProfile = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete-profile/${id}`);
        return response.data;

    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const userData = async (email) => {
    try {

    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}