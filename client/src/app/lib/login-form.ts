import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation"; 
import { useAuth } from "../contexts/useAuth";

export const useLoginForm = () => {
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
                if (response.status === 201) {
                    dispatch({ type: 'LOGIN', payload: response.data.access_token });
                    router.push('/zainspotter');
                }
            } catch (error) {
                console.log(error);
            }
        },
    });
};
