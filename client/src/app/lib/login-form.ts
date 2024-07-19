import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export const useLoginForm = () => {
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
        .required("Password is required")
        .min(8, '8 characters minimum')
        .matches(/[A-Z]/, '1 uppercase letter')
        .matches(/[a-z]/, '1 lowercase letter')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[^\w]/, '1 special character, e.g.: !@#%&*^°'),
    }),
    onSubmit: async (values, {resetForm}) => {
      resetForm()
    },
  });
};
