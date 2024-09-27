import toast from "react-hot-toast";
import axiosInstance from "./axios/axiosInstance";


export const handleEmailVerification = async (email: string | undefined, setIsOpenDialog: (isOpen: boolean) => void) => {
  try {
    const response = await axiosInstance.post('/email-confirmation/send-verification', { email });
    
    if (response.status === 200) {
      setIsOpenDialog(true);
      setTimeout(() => {
        setIsOpenDialog(false);
      }, 6000); 
    } else {
      console.log('Unexpected response status:', response.status);
    }
  } catch (error) {
    console.error('Error sending email verification:', error);
  }
};


export const handleDisableEmailVerification = async (
  userId: number | undefined,
  accessToken: string | undefined,
  refetchUserData: () => void 
) => {
  try {
    const response = await axiosInstance.patch(`/user/${userId}`, { isEmailConfirmed: false }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });

    if (response.status === 200) {
      toast.success('Email disabled successfully');
      refetchUserData(); 
    }
  } catch (error) {
    console.error(error);
  }
};
