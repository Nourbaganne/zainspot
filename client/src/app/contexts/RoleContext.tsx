'use client';

import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../lib/axios/axiosInstance';

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
	const { data, isLoading, isError, error, refetch } = useQuery<Role[]>({
		queryKey: ['roles'],
		queryFn: async () => {
			const response = await axiosInstance.get('/role');
			return response.data;
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
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
export const useRoles = (): RolesContextType => {
	const context = useContext(RolesContext);
	if (context === undefined) {
		throw new Error('useRoles must be used within a RolesProvider');
	}
	return context;
};
