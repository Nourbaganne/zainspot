import { useFormik, FormikHelpers } from "formik";
import * as Yup from 'yup';
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import toast from "react-hot-toast";
import axiosInstance from "./axios/axiosInstance";

// Renamed to useUpdateUserPassword to follow the hook naming convention
export const useUpdateUserPassword = () => {
    const { user } = useContext(AuthContext);

    const initialValues = {
        password: "",  // Fixed typo in 'password'
        confirmPassword: ""
    };

    return useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
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
        onSubmit: async (values, { resetForm }) => {
            const toastId = toast.loading('Updating password....');
            try {
                const response = await axiosInstance.patch(`/user/${user?.user.userId}`, values, {
                    headers: {
                        Authorization: `Bearer ${user?.access_token}`,
                    }
                });

                if (response.status === 200) {
                    toast.success("Password updated successfully!", { id: toastId });
                    resetForm();
                }
            } catch (error) {
                toast.error("Error submitting form. Please try again", { id: toastId });
                console.log("error submitting form :", error);
                toast.dismiss();
            }
        }
    });
};
