import axiosInstance from "./axios/axiosInstance";

export async function getCities() {
    return await axiosInstance.get(`/city`, {
        params: {
            limit: 12, 
        },
    })
}