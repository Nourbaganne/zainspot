import { useQuery } from "@tanstack/react-query"
import axiosInstance from "./axios/axiosInstance"


export const UseVisitorCounts = () => {
    const { data } = useQuery({
        queryKey: ['visitors'],
        queryFn: async () => await axiosInstance.get('/visitor')
    })

    return data?.data;
}