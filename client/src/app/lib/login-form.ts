import { useFormik } from "formik";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/useAuth";

export const useLoginForm = (setIsError: (error: string) => void) => {
    const router = useRouter();
    const { dispatch } = useAuth();

    return useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .required("Password is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post("http://localhost:3001/auth", values);
                if (response.status) {
                    dispatch({ type: 'LOGIN', payload: response.data });
                    router.push('/zainspotter');
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const errorMessage = error.response?.data?.message || "An error occurred";
                    setIsError(errorMessage);
                } else {
                    
                    setIsError("An unknown error occurred");
                }
            }
        },
    });
};
