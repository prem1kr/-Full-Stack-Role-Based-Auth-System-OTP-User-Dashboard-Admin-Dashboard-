import API_URL from "./api.js";


export const addProfile = async (data) => {
    try {
        const response = await API_URL.post(`/profile/add-profile`, data);
        return response.data;

    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const getAllProfiles = async () => {
    try {
        const response = await API_URL.get(`/profile/all-profile`);
        return response.data;

    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const getProfile = async (id) => {
    try {
        const response = await API_URL.get(`/profile/get-profile/${id}`);
        return response.data;

    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const updateProfile = async (id,data) => {
    try {
        const response = await API_URL.put(`/profile/update-profile/${id}`,data);
        return response.data;

    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const deleteProfile = async (id) => {
    try {
        const response = await API_URL.delete(`/profile/delete-profile/${id}`);
        return response.data;

    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}
