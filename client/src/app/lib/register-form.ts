  import { useFormik } from "formik";
  import * as Yup from "yup";
  import axiosInstance from "./axios/axiosInstance";
  import { toast } from "react-hot-toast";

  export const useRegisterForm = ({
    setIsOpenDialog,
    setError,
  }: {
    setIsOpenDialog: (isOpen: boolean) => void;
    setError: (error: string | null) => void;
  }) => {
    return useFormik({
      initialValues: {
        email: "",
        password: "",
        confirmPassword: "",
        businessNumber: "",
        businessName: "",
        tradeName: "",
        businessType: "",
        businessWebsite: "",
        country: "",
        fullStreetAdress: "",
        city: "",
        state: "",
        zipCode: "",
        interestRegion: "",
        name: "",
        middleName: "",
        lastName: "",
        gender: "",
        birthday: "",
        mediaProfile: "",
        preferedLanguage: "",
        preferedCurrency: "",
        recaptcha: "",
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
        tradeName: Yup.string().required("Trade name is required"),
        businessType: Yup.string().required("Business type is required"),
        country: Yup.string().required("Business country is required"),
        businessWebsite: Yup.string().url("Must be a valid URL"),
        city: Yup.string().required("City is required"),
        fullStreetAdress: Yup.string().required("Full street adress is required"),
        zipCode: Yup.number().required("Zip code is required"),
        state: Yup.string().required("State or Province or Department is required"),
        interestRegion: Yup.string().required("Regions of interest are required"),
        name: Yup.string().required("Name is required"),
        middleName: Yup.string(),
        lastName: Yup.string().required("Last name is required"),
        gender: Yup.string().required("Gender is required"),
        birthday: Yup.date().required("Your Birthday is required"),
        mediaProfile: Yup.string(),
        preferedLanguage: Yup.string(),
        preferedCurrency: Yup.string(),
        recaptcha: Yup.string().required("Please complete the reCAPTCHA verification"),
      }),
      onSubmit: async (values, { resetForm }) => {
        // Show loading toast
        const toastId = toast.loading('Registering...');

        try {
          const { confirmPassword, ...userData } = values;

          const formattedValues = {
            ...userData,
            birthday: userData.birthday
              ? new Date(userData.birthday).toISOString().split('T')[0]
              : null,
          };

          const response = await axiosInstance.post("/user/register", formattedValues);

          if (response.status === 201) {
            resetForm();
            setIsOpenDialog(true);
            setError(null);

            // Update toast to success 
            toast.success("Registration successful!", { id: toastId });
          }
        } catch (error) {
          setError('An unexpected error occurred during registration.');

          // Update toast to error
          toast.error('Registration failed. Please try again.', { id: toastId });
        } finally {
          // Remove loading toast if the promise completes
          toast.dismiss(toastId);
        }
      }
    });
  };
