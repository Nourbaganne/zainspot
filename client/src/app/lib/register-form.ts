import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export const useRegisterForm = () => {
  return useFormik({
    initialValues: {
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

      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
      businessNumber: Yup.string(),
      businessName: Yup.string().required("Business name is required"),
      tradeName: Yup.string().required("Business name is required"),
      businessType: Yup.string().required("Business type is required"),
      country: Yup.string().required("Business country is required"),
      businessWebsite: Yup.string(),
      city: Yup.string().required("City is required"),
      state: Yup.string().required(
        "State or Province or Department is required"
      ),
      interestRegion: Yup.string().required("Regions of interest are required"),
      name: Yup.string().required("Name is required"),
      middleName: Yup.string(),
      lastName: Yup.string().required("Last name is required"),
      gender: Yup.string().required("Gender is required"),
      birthday: Yup.date(),
      mediaProfile: Yup.string(),
    }),
    onSubmit: async (values, {resetForm}) => {
      try {
        const formattedValues = {
          ...values,
          birthday: values.birthday ? new Date(values.birthday).toISOString().split('T')[0] : null,
        };

        const response = await axios.post("http://localhost:3001/user", formattedValues);
        
        resetForm();

      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });
};
