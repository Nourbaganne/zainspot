import axiosInstance from "./axios/axiosInstance";

export async function getCities() { return await axiosInstance.get("/cities") }