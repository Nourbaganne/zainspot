import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import axiosInstance from "./axios/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface PerMonth {
    duration: number | null;
    amount: number | null;
    tax: number | null;
}

export interface CityData {
    city: string;
    country: string;
    hidden: boolean;
    location: {
        title: string;
        posx: number | null;
        posy: number | null;
    };
    description: string;
    goldPrice: {
        value: number | null;
        tax: number | null;
    };
    classicPrice: {
        perMonth: PerMonth[];
    };
    imageUrl: File | null;
}

const durations = [
    { label: '1 Year', value: 12 },
    { label: '6 Months', value: 6 },
    { label: '3 Months', value: 3 },
    { label: '1 Month', value: 1 },
];

const defaultClassicPrice = {
    perMonth: durations.map((duration) => ({ duration: duration.value, amount: null, tax: null })),
};

export const useAddCity = () => {
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (values: CityData) => {
            const formData = new FormData();
            formData.append('city', values.city);
            formData.append('country', values.country);
            formData.append('hidden', String(values.hidden));
            formData.append('location', JSON.stringify(values.location));
            formData.append('description', values.description);
            formData.append('goldPrice', JSON.stringify(values.goldPrice));
            formData.append('classicPrice', JSON.stringify(values.classicPrice));
            if (values.imageUrl) {
                formData.append('imageUrl', values.imageUrl);
            }

            const response = await axiosInstance.post("/cities", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['cities']});
        },
        onError: (error: any) => {
            console.error("Error adding city:", error);
        },
    });

    const formik = useFormik<CityData>({
        initialValues: {
            city: "",
            country: "",
            hidden: false,
            location: { title: "", posx: null, posy: null },
            description: "",
            goldPrice: { value: null, tax: null },
            classicPrice: defaultClassicPrice,
            imageUrl: null,
        },
        validationSchema: Yup.object({
            city: Yup.string().required("City is required"),
            country: Yup.string().required("Country is required"),
            location: Yup.object({
                title: Yup.string().required("Location title is required"),
                posx: Yup.number().required("PosX is required"),
                posy: Yup.number().required("PosY is required"),
            }),
            description: Yup.string().required("Description is required"),
            goldPrice: Yup.object({
                value: Yup.number().required("Gold price amount is required"),
                tax: Yup.number().required("Gold price tax is required"),
            }),
            imageUrl: Yup.mixed().required("Image is required"),
        }),
        onSubmit: async (values: CityData, { resetForm }: FormikHelpers<CityData>) => {
            try {
                await mutation.mutateAsync(values);
                resetForm();
            } catch (error) {
                console.error("Error adding city:", error);
            }
        },
    });

    return {
        ...formik,
        isError: mutation.isError,
        error: mutation.error,
        isSuccess: mutation.isSuccess,
    };
};
