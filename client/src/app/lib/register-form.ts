import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import axiosInstance from "./axios/axiosInstance";

export const useRegisterForm = ({ setIsOpenDialog }: { setIsOpenDialog: (isOpen: boolean) => void; }) => {
  const router = useRouter();


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
      preferedLanguage: "",
      preferedCurrency: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Helping text is here")
        .min(8, 'Helping text is here')
        .matches(/[A-Z]/, 'Helping text is here')
        .matches(/[a-z]/, 'Helping text is here')
        .matches(/[0-9]/, 'Helping text is here')
        .matches(/[^\w]/, 'Helping text is here'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
      businessNumber: Yup.string().required("Business Phone Number is required"),
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
      birthday: Yup.date().required("Your Birthday is required"),
      mediaProfile: Yup.string(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const formattedValues = {
          ...values,
          birthday: values.birthday ? new Date(values.birthday).toISOString().split('T')[0] : null,
        };

        const response = await axiosInstance.post("/user/register", formattedValues);
        if (response.status === 201) {
          resetForm();
          setIsOpenDialog(true)
          // router.push('/login');

        }

      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });
};
