import toast from "react-hot-toast";
import axiosInstance from "./axios/axiosInstance";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { hasAccess } from "./hasAccess";

interface activationProps {
  id: number | undefined;
  selectedUserIds: number[];
  setSelectedUsers?: (selectedUser: number[]) => void;
  access_token: string | undefined;
  refetch: () => Promise<any>;
  userPermissions: any[] | undefined;
}

export const handleUserActivation = async ({ id, selectedUserIds, setSelectedUsers, access_token, refetch, userPermissions }: activationProps) => {

  if (hasAccess(userPermissions, 'update:user')) {
    try {
      const toastId = toast.loading('Processing...');
      const response = await axiosInstance.patch(`user/${id}/activation`, {
        ids: selectedUserIds,
      }, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.status === 200) {
        toast.success('User(s) Activation/Deactivation Successful', { id: toastId });
        if (setSelectedUsers) {
          setSelectedUsers([]);
        }
        refetch();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
      toast.error(errorMessage);
      console.error('Error:', error);
    }
  } else {
    toast.error("Access Denied");
  }

};
