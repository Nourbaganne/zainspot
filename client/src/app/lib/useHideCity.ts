import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { toast } from 'react-hot-toast';

export const useHideCity = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  return useMutation({
    mutationFn: ({ id, hidden }: { id: number; hidden: boolean }) => {
      const toastId = toast.loading(hidden ? 'Unhiding city...' : 'Hiding city...');
      return axiosInstance
        .patch(`/city/${id}/hide`, null, {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        })
        .then((response) => {
          toast.success(hidden ? 'City Unhidden successfully' : 'City hidden successfully', { id: toastId });
          return response;
        })
        .catch((error) => {
          toast.error(hidden ? 'Error Unhiding city' : 'Error hiding city', { id: toastId });
          throw error;
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
    onError: (error) => {
      console.error('Error hiding city:', error);
    },
  });
};
