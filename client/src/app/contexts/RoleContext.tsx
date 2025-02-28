'use client';
//need to be changed before deployment
import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../lib/axios/axiosInstance';
import { useLanguage } from './LanguageContext';
import { useAuth } from './authContext';

// Define the shape of your roles data
interface Role {
  id: number;
  name: string;
  // Add other relevant fields
}

interface RolesContextType {
  roles: Role[];
  isLoading: boolean;
  isError: boolean;
  error: any;
  refetch: () => void;
}

// Create the context
const RolesContext = createContext<RolesContextType | undefined>(undefined);

// Create a provider component
export const RolesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { language } = useLanguage();
  const { user } = useAuth();

  // Check if it's the test support user
  const isTestSupportUser = user?.email === 'support@test.com';

  const { data, isLoading, isError, error, refetch } = useQuery<Role[]>({
    queryKey: ['roles'],
    queryFn: async () => {
      // For test support user, return mock roles
      if (isTestSupportUser) {
        return [{
          id: 1,
          name: 'support'
        }];
      }
      // For real users, fetch from API
      const response = await axiosInstance.get(`/role?lang=${language.toLowerCase()}`);
      return response.data;
    },
    // Don't refetch for test support user
    staleTime: isTestSupportUser ? Infinity : 5 * 60 * 1000,
    // Prevent refetching on window focus for test support user
    refetchOnWindowFocus: !isTestSupportUser,
  });

  return (
    <RolesContext.Provider
      value={{
        roles: data || [],
        isLoading,
        isError,
        error,
        refetch,
      }}
    >
      {children}
    </RolesContext.Provider>
  );
};

// Custom hook for consuming the context
export const useRoles = () => {
  const context = useContext(RolesContext);
  if (!context) {
    throw new Error('useRoles must be used within a RolesProvider');
  }
  return context;
};
