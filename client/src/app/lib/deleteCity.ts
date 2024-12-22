import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { toast } from 'react-hot-toast';

export const useDeleteCity = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  return useMutation({
    mutationFn: (id: number) => axiosInstance.delete(`/city/${id}`, {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      }
    }),
    onMutate: () => {
      toast.loading('Deleting city...');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
      toast.dismiss(); 
      toast.success('City deleted successfully!');
    },
    onError: (error) => {
      toast.dismiss();
      console.error('Error deleting city:', error);
      toast.error('Failed to delete city');
    },
  });
};
