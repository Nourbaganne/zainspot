import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import axiosInstance from "./axios/axiosInstance";

export interface PerMonth {
    duration: number | null;
    amount: number | null;
    tax: number | null;
}

export interface CityData {
    name: string;
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
    imageUrl: File | null; // Changed to File
}

const durations = [
    { label: '1 Month', value: 1 },
    { label: '3 Months', value: 3 },
    { label: '6 Months', value: 6 },
    { label: '1 Year', value: 12 },
];

const defaultClassicPrice = {
    perMonth: durations.map((duration) => ({ duration: duration.value, amount: null, tax: null })),
};

export const useAddCity = () => {
    const { user } = useContext(AuthContext);

    const formik = useFormik<CityData>({
        initialValues: {
            name: "",
            hidden: false,
            location: { title: "", posx: null, posy: null },
            description: "",
            goldPrice: { value: null, tax: null },
            classicPrice: defaultClassicPrice,
            imageUrl: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
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
            // Validation for imageUrl as a file is generally handled at UI level
            imageUrl: Yup.mixed().required("Image is required"),
        }),
        onSubmit: async (values: CityData, { setSubmitting }: FormikHelpers<CityData>) => {
            try {
                const formData = new FormData();
                formData.append('name', values.name);
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
                console.log("City added successfully:", response.data);
            } catch (error) {
                console.error("Error adding city:", error);
            } finally {
                setSubmitting(false);
            }
        },

    });

    return formik;
};
