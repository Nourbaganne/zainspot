import toast from "react-hot-toast";
import axiosInstance from "./axios/axiosInstance";

export const handleEmailVerification = async (
  email: string | undefined,
  setIsOpenDialog: (isOpen: boolean) => void
) => {
  const loadingToastId = toast.loading('Sending verification email...');

  try {
    const response = await axiosInstance.post('/email-confirmation/send-verification', { email });

    if (response.status === 200) {
      toast.success('Verification email sent successfully', { id: loadingToastId });
      setIsOpenDialog(true);
      setTimeout(() => {
        setIsOpenDialog(false);
      }, 6000);
    } else {
      toast.error('Failed to send verification email', { id: loadingToastId });
      console.log('Unexpected response status:', response.status);
    }
  } catch (error) {
    toast.error('Error sending email verification', { id: loadingToastId });
    console.error('Error sending email verification:', error);
  } finally {
    toast.dismiss(loadingToastId);
  }
};

export const handleDisableEmailVerification = async (
  userId: number | undefined,
  accessToken: string | undefined,
  refetchUserData: () => void
) => {
  const loadingToastId = toast.loading('Disabling email verification...');

  try {
    const response = await axiosInstance.patch(`/user/${userId}`, { isEmailConfirmed: false }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });

    if (response.status === 200) {
      toast.success('Email disabled successfully', { id: loadingToastId });
      refetchUserData();
    } else {
      toast.error('Failed to disable email', { id: loadingToastId });
    }
  } catch (error) {
    toast.error('Error disabling email', { id: loadingToastId });
    console.error(error);
  } finally {
    toast.dismiss(loadingToastId);
  }
};
