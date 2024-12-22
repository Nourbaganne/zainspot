import { useQuery } from "@tanstack/react-query"
import axiosInstance from "./axios/axiosInstance"
import { useContext } from "react"
import { AuthContext } from "../contexts/authContext"


export const UseVisitorCounts = () => {
    const { user } = useContext(AuthContext);
    const { data } = useQuery({
        queryKey: ['visitors'],
        queryFn: async () => await axiosInstance.get('/visitor', {
            headers: {
                Authorization: `Bearer ${user?.access_token}`
            }
        })
    })

    return data?.data;
}