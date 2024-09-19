import { useContext } from 'react';
import axiosInstance from './axios/axiosInstance';
import { AuthContext } from '../contexts/authContext';
import { useRouter } from 'next/navigation';

const UseUserData = async (userId: number | undefined, accessToken: string | undefined) => {
    const {  dispatch } = useContext(AuthContext);
    const router = useRouter();
    const response = await axiosInstance.get(`/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });
    if (response.status === 401){
        dispatch({ type: 'LOGOUT', payload: undefined });
		router.push('/login');
    }
    return response.data;
};

export default UseUserData;
