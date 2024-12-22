import axiosInstance from './axios/axiosInstance';

const useUserData = async (userId?: number, access_token?: string) => {

    const response = await axiosInstance.get(`/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        }
    });
    
    return response.data;
};

export default useUserData;
