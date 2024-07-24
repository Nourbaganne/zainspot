import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export const useUpdateForm = () => {

    const { user } = useContext(AuthContext);


    const [initialValues, setInitialValues] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        businessNumber: "",
        businessName: "",
        tradeName: "",
        businessTradingName: "",
        businessType: "",
        businessWebsite: "",
        country: "",
        city: "",
        state: "",
        interestRegion: "",
        name: "",
        middleName: "",
        lastName: "",
        gender: "",
        birthday: "",
        mediaProfile: "",
        preferedLanguage: "",
        preferedCurrency: "",
    });

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:3001/user/${user?.user.userId}`, {
                    headers: {
                        Authorization: `Bearer ${user?.access_token}`,
                    }
                });

                setInitialValues({
                    ...initialValues,
                    email: userResponse.data.email || "",
                    password: userResponse.data.password || "",
                    businessNumber: userResponse.data.businessNumber || "",
                    businessName: userResponse.data.businessName || "",
                    tradeName: userResponse.data.tradeName || "",
                    businessTradingName: userResponse.data.businessTradingName || "",
                    businessType: userResponse.data.businessType || "",
                    businessWebsite: userResponse.data.businessWebsite || "",
                    country: userResponse.data.country || "",
                    city: userResponse.data.city || "",
                    state: userResponse.data.state || "",
                    interestRegion: userResponse.data.interestRegion || "",
                    name: userResponse.data.name || "",
                    middleName: userResponse.data.middleName || "",
                    lastName: userResponse.data.lastName || "",
                    gender: userResponse.data.gender || "",
                    birthday: userResponse.data.birthday || "",
                    mediaProfile: userResponse.data.mediaProfile || "",
                    preferedLanguage: userResponse.data.preferedLanguage || "",
                    preferedCurrency: userResponse.data.preferedCurrency || "",

                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (user?.user.userId && user?.access_token) {
            getUserData();
        }
    }, [user?.user.userId, user?.access_token]);

    return useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address"),
            password: Yup.string()
                .min(8, '8 characters minimum')
                .matches(/[A-Z]/, '1 uppercase letter')
                .matches(/[a-z]/, '1 lowercase letter')
                .matches(/[0-9]/, 'Password requires a number')
                .matches(/[^\w]/, '1 special character, e.g.: !@#%&*^°'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords must match"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const formattedValues = {
                    ...values,
                    birthday: values?.birthday ? new Date(values.birthday).toISOString().split('T')[0] : null,
                };

                const response = await axios.patch(
                    `http://localhost:3001/user/${user?.user.userId}`,
                    formattedValues,
                    {
                        headers: {
                            Authorization: `Bearer ${user?.access_token}`,
                        }
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
