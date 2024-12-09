import toast from "react-hot-toast";
import axiosInstance from "./axios/axiosInstance";


interface RoleChangesProps {
    access_token: string | undefined;
    userId: number | undefined;
    updatedRole: number;
    refetch: () => Promise<any>
}

export const HandleRoleChanges = async ({
    access_token,
    userId,
    updatedRole,
    refetch
}: RoleChangesProps) => {
    const loadingToastId = toast.loading('Updating user role...');
    try {
        const response = await axiosInstance.patch(
            `/user/${userId}`,
            {
                role: {
                    id: updatedRole,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        if (response.status === 200) {
            toast.success('User Role is updated successfully!', { id: loadingToastId });
            refetch();
        } else {
            toast.error('Failed to update user role.', { id: loadingToastId });
        }
    } catch (error: any) {
        toast.dismiss(loadingToastId);
        if (error.response?.status === 403) {
            toast.error('Access Denied!');
        } else {
            toast.error('Failed to update user role.');
        }
        console.error('Error updating user role:', error);
    }
};

