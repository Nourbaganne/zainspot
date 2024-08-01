import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export const usePaymentForm = () => {
  return useFormik({
    initialValues: {
      paymentMethod: "",
      cardHolder: "",
      billingAdress: "",
      expiryDate: "",
      CVV: "",
    },
    validationSchema: Yup.object({
      paymentMethod: Yup.string().required("Payment method is required"),
      cardHolder: Yup.string().required("Card Holder is required"),
      billingAdress: Yup.string().required("Billing adress is required"),
      expiryDate: Yup.date() .required("Expiry date is required"),
      CVV: Yup.string().required("CVV is required"),
    }),
    onSubmit: async (values) => {
      console.log("payment data:", values)
    },
  });
};
