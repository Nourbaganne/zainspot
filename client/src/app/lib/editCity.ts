import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/authContext";
import axiosInstance from "./axios/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

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
        locationLink: string;
    };
    description: string;
    catchphrase: string;
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

export const useEditCity = ({ id, onClose }: { id: number, onClose: () => void; }) => {

    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['city', id],
        queryFn: async () => {
            const response = await axiosInstance.get(`city/${id}`);
            return response.data;
        },


    });

    const mutation = useMutation({
        mutationFn: async (values: CityData) => {
            const formData = new FormData();
            formData.append('city', values.city);
            formData.append('country', values.country);
            formData.append('hidden', String(values.hidden));
            formData.append('location', JSON.stringify(values.location));
            formData.append('description', values.description);
            formData.append('catchphrase', values.catchphrase);
            formData.append('goldPrice', JSON.stringify(values.goldPrice));
            formData.append('classicPrice', JSON.stringify(values.classicPrice));
            if (values.imageUrl) {
                formData.append('imageUrl', values.imageUrl);
            }

            const response = await axiosInstance.patch(`/city/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['city', id] });
            toast.success('City updated successfuly!');
            onClose();
        },
        onError: (error: any) => {
            console.error("Error adding city:", error);
        },
    });

    const formik = useFormik<CityData>({
        initialValues: {
            city: data?.city || "",
            country: data?.country || "",
            hidden: data?.hidden || false,
            location: {
                title: data?.location.title || "",
                locationLink: data?.location.locationLink || "",
            },
            description: data?.description || "",
            catchphrase: data?.catchphrase || "",
            goldPrice: {
                value: data?.goldPrice?.value || null,
                tax: data?.goldPrice?.tax || null,
            },
            classicPrice: data?.classicPrice || defaultClassicPrice,
            imageUrl: data?.imageUrl || null,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            city: Yup.string().required("City is required"),
            country: Yup.string().required("Country is required"),
            location: Yup.object({
                title: Yup.string().required("Location title is required"),
                locationLink: Yup.string().required("Map location link is required")
            }),
            description: Yup.string().required("Description is required"),
            catchphrase: Yup.string().required("Catch phrase is required"),
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
        isLoading,
        isError,
        error,
        isSuccess: mutation.isSuccess,
    };
};
