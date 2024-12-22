import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "./axios/axiosInstance";

interface useResetPasswordProps {
    setErrorMessage: (error: string | null) => void;
    setMessage: (errorMessage: string) => void;
    setIsPasswordReset: (isPasswordReset: boolean) => void;
    setIsLoading: (isLoading: boolean) => void;
    token: string | null;
}

export const useResetPassword = ({ setErrorMessage, setMessage, setIsPasswordReset, setIsLoading, token }: useResetPasswordProps) => {
    return useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required("Password is required")
                .min(8, 'Password must be at least 8 characters')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                .matches(/[0-9]/, 'Password must contain at least one digit')
                .matches(/[^\w]/, 'Password must contain at least one special character'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords must match")
                .required("Confirm password is required"),
        }),
        onSubmit: async (values, { setErrors, resetForm }) => {
            setIsLoading(true); // Set loading when form is submitted
            setErrorMessage(null); // Clear error messages

            try {
                const response = await axiosInstance.post('/reset-password/reset', { 
                    token, 
                    newPassword: values.password // Use formik values.password here
                });

                if (response.status === 200) {
                    setIsPasswordReset(true);
                    setMessage('Password has been reset successfully!');
                } else {
                    setErrorMessage('Failed to reset password. Please try again.');
                }
            } catch (error: any) {
                setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
            } finally {
                setIsLoading(false); // Set loading to false after submission
            }
        },
    });
};
