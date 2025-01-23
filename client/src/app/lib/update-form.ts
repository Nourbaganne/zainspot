import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import axiosInstance from "./axios/axiosInstance";
import toast from "react-hot-toast";
import { useCurrency } from "../contexts/CurrencyContext";
import { useLanguage } from "../contexts/LanguageContext";

export interface UserData {
    isEmailConfirmed: boolean;
    email?: string;
    businessNumber?: string;
    businessName?: string;
    tradeName?: string;
    businessTradingName?: string;
    businessType?: string;
    businessWebsite?: string;
    country?: string;
    city?: string;
    state?: string;
    fullStreetAdress?: string;
    zipCode?: string;
    name?: string;
    middleName?: string;
    lastName?: string;
    gender?: string;
    birthday?: string;
    mediaProfile?: string;
    preferedLanguage?: string;
    preferedCurrency?: string;
    imageUrl?: string;
}

export const useUpdateForm = (userData: UserData) => {
    const { user } = useContext(AuthContext);
    const { setCurrency } = useCurrency();
    const { setLanguage } = useLanguage();

    const initialValues: UserData = {
        email: userData?.email || "",
        isEmailConfirmed: userData?.isEmailConfirmed || false,
        businessNumber: userData?.businessNumber || "",
        businessName: userData?.businessName || "",
        tradeName: userData?.tradeName || "",
        businessTradingName: userData?.businessTradingName || "",
        businessType: userData?.businessType || "",
        businessWebsite: userData?.businessWebsite || "",
        country: userData?.country || "",
        city: userData?.city || "",
        fullStreetAdress: userData?.fullStreetAdress || "",
        zipCode: userData?.zipCode || "",
        state: userData?.state || "",
        name: userData?.name || "",
        middleName: userData?.middleName || "",
        lastName: userData?.lastName || "",
        gender: userData?.gender || "",
        birthday: userData?.birthday || "",
        mediaProfile: userData?.mediaProfile || "",
        preferedLanguage: userData?.preferedLanguage || "",
        preferedCurrency: userData?.preferedCurrency || "",
        imageUrl: userData?.imageUrl || "",
    };

    return useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address"),
        }),
        onSubmit: async (values) => {
            const toastId = toast.loading('Updating User Info...');

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
                    toast.success("User updated successfully!", { id: toastId });
                    setCurrency(response.data.preferedCurrency);
                    setLanguage(response.data.preferedLanguage);
                }
            } catch (error) {
                toast.error("Error submitting form. Please try again.", { id: toastId });
                console.error("Error submitting form:", error);
                toast.dismiss();
            }
        },
    });
};
