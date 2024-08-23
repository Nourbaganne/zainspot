import { useFormik } from "formik";
import * as Yup from "yup";
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
        .required("Password is required")
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one digit')
        .matches(/[^\w]/, 'Password must contain at least one special character'),
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
      state: Yup.string().required("State or Province or Department is required"),
      interestRegion: Yup.string().required("Regions of interest are required"),
      name: Yup.string().required("Name is required"),
      middleName: Yup.string(),
      lastName: Yup.string().required("Last name is required"),
      gender: Yup.string().required("Gender is required"),
      birthday: Yup.date().required("Your Birthday is required"),
      mediaProfile: Yup.string(),
    }),
    onSubmit: async (values, { setErrors, resetForm }) => {
      try {
        const formattedValues = {
          ...values,
          birthday: values.birthday ? new Date(values.birthday).toISOString().split('T')[0] : null,
        };

        const response = await axiosInstance.post("/user/register", formattedValues).then((response) => {
          resetForm();
          setIsOpenDialog(true);
        }).catch((error) => {
          console.log("error", error.message)
        })


      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });
};
