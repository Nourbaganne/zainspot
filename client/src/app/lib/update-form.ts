import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import axiosInstance from "./axios/axiosInstance";

export interface UserData {
    isEmailConfirmed: boolean;
    email?: string;
    password?: string;
    confirmPassword?: string;
    businessNumber?: string;
    businessName?: string;
    tradeName?: string;
    businessTradingName?: string;
    businessType?: string;
    businessWebsite?: string;
    country?: string;
    city?: string;
    state?: string;
    interestRegion?: string;
    name?: string;
    middleName?: string;
    lastName?: string;
    gender?: string;
    birthday?: string;
    mediaProfile?: string;
    preferedLanguage?: string;
    preferedCurrency?: string;
}

export const useUpdateForm = (userData: UserData | null) => {
    const { user } = useContext(AuthContext);

    const initialValues: UserData = {
        email: userData?.email || "",
        isEmailConfirmed: userData?.isEmailConfirmed || false,
        password: "",
        confirmPassword: "",
        businessNumber: userData?.businessNumber || "",
        businessName: userData?.businessName || "",
        tradeName: userData?.tradeName || "",
        businessTradingName: userData?.businessTradingName || "",
        businessType: userData?.businessType || "",
        businessWebsite: userData?.businessWebsite || "",
        country: userData?.country || "",
        city: userData?.city || "",
        state: userData?.state || "",
        interestRegion: userData?.interestRegion || "",
        name: userData?.name || "",
        middleName: userData?.middleName || "",
        lastName: userData?.lastName || "",
        gender: userData?.gender || "",
        birthday: userData?.birthday || "",
        mediaProfile: userData?.mediaProfile || "",
        preferedLanguage: userData?.preferedLanguage || "",
        preferedCurrency: userData?.preferedCurrency || "",
    };

    return useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address"),
            password: Yup.string()
                .min(8, "8 characters minimum")
                .matches(/[A-Z]/, "1 uppercase letter")
                .matches(/[a-z]/, "1 lowercase letter")
                .matches(/[0-9]/, "Password requires a number")
                .matches(/[^\w]/, "1 special character, e.g.: !@#%&*^°"),
            confirmPassword: Yup.string().oneOf(
                [Yup.ref("password")],
                "Passwords must match"
            ),
        }),
        onSubmit: async (values, { resetForm }: FormikHelpers<UserData>) => {
            try {
                const formattedValues = {
                    ...values,
                    birthday: values?.birthday
                        ? new Date(values.birthday).toISOString().split("T")[0]
                        : null,
                };

                const response = await axiosInstance.patch(
                    `/user/${user?.user.userId}`,
                    formattedValues,
                    {
                        headers: {
                            Authorization: `Bearer ${user?.access_token}`,
                        },
                    }
                );
                if (response.status === 200) {
                    resetForm();
                    console.log("User updated");
                }
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        },
    });
};
