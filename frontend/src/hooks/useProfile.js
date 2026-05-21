import axios from "axios";
import API_URL from "./api.js";


export const addProfile = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/profile/add-profile`, data);
        return response.data;

    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const getAllProfiles = async () => {
    try {
        const response = await axios.get(`${API_URL}/profile/all-profile`);
        return response.data;

    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const getProfile = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/profile/get-profile/${id}`);
        return response.data;

    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const updateProfile = async (id,data) => {
    try {
        const response = await axios.put(`${API_URL}/profile/update-profile/${id}`,data);
        return response.data;

    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const deleteProfile = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/profile/delete-profile/${id}`);
        return response.data;

    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}
