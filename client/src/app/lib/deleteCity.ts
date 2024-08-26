import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';

export const useDeleteCity = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  return useMutation({
    mutationFn: (id: number) => axiosInstance.delete(`/cities/${id}`, {
        headers: {
            Authorization: `Bearer ${user?.access_token}`,
        }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
    onError: (error) => {
      console.error('Error deleting city:', error);
    },
  });
};
