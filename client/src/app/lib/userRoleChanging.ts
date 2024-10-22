import toast from "react-hot-toast";
import axiosInstance from "./axios/axiosInstance";
import React from 'react'; // Ensure React is imported for type definitions

interface Counts {
    value: number;
    increasmentValue: number;
}

interface InitialCounts {
    zainspotter: Counts;
    admin: Counts;
    owner: Counts;
}

interface RoleChangesProps {
    access_token: string | undefined;
    userId: number | undefined;
    updatedRole: number;
    previousRole?: number;
    setInitialCounts?: React.Dispatch<React.SetStateAction<InitialCounts>>;
}

export const HandleRoleChanges = async ({
    access_token,
    userId,
    updatedRole,
    previousRole,
    setInitialCounts,
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

            if (setInitialCounts !== undefined) {
                setInitialCounts((prevCounts: InitialCounts) => {
                    // Create a deep copy to avoid mutating state directly
                    const updatedCounts: InitialCounts = {
                        zainspotter: { ...prevCounts.zainspotter },
                        admin: { ...prevCounts.admin },
                        owner: { ...prevCounts.owner },
                    };

                    // Decrement the count of the previous role
                    switch (previousRole) {
                        case 1: // Owner
                            updatedCounts.owner.value = Math.max(updatedCounts.owner.value - 1, 0);
                            break;
                        case 2: // Admin
                            updatedCounts.admin.value = Math.max(updatedCounts.admin.value - 1, 0);
                            break;
                        case 3: // Zainspotter
                            updatedCounts.zainspotter.value = Math.max(updatedCounts.zainspotter.value - 1, 0);
                            break;
                        default:
                            console.warn(`Unhandled previousRole ID: ${previousRole}`);
                    }

                    // Increment the count of the updated role
                    switch (updatedRole) {
                        case 1: // Owner
                            updatedCounts.owner.value += 1;
                            break;
                        case 2: // Admin
                            updatedCounts.admin.value += 1;
                            break;
                        case 3: // Zainspotter
                            updatedCounts.zainspotter.value += 1;
                            break;
                        default:
                            console.warn(`Unhandled updatedRole ID: ${updatedRole}`);
                    }

                    return updatedCounts;
                });
            }

        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        toast.error('Failed to update user role.', { id: loadingToastId });
        console.error('Error updating user role:', error);
    }
};
