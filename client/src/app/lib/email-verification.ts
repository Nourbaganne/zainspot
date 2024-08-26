import axios from "axios";
import axiosInstance from "./axios/axiosInstance";


export const handleEmailVerification = async (email: string | undefined, setIsOpenDialog: (isOpen: boolean) => void) => {
  try {
    const response = await axiosInstance.post('/email-confirmation/send-verification', { email });
    if (response.status === 200) {
      console.log('Email sent');
      setIsOpenDialog(true);
    } else {
      console.log('Unexpected response status:', response.status);
    }
  } catch (error) {
    console.error('Error sending email verification:', error);
  }
};