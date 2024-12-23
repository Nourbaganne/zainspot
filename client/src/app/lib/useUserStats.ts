import { useQuery } from "@tanstack/react-query"
import axiosInstance from "./axios/axiosInstance"
import { useContext } from "react"
import { AuthContext } from "../contexts/authContext"


export const UseUSerStats = () => {
    const { user } = useContext(AuthContext);
    const { data } = useQuery({
        queryKey: ['userStats'],
        queryFn: async () => axiosInstance.get('/user/userStats', {
            headers: {
                Authorization: `Bearer ${user?.access_token}`,
            },
        })
    });

    return data?.data;
}