import axiosInstance from './axios/axiosInstance';

const getUserData = async (userId: number | undefined, accessToken: string | undefined) => {
    const response = await axiosInstance.get(`/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });
    return response.data;
};

export default getUserData;
