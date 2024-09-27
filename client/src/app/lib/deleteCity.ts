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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
      toast.success('City deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting city:', error);
    },
  });
};
