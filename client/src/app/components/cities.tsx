import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AvailableCity from './availableCity';
import UnavailableCity from './unavailableCity';
import { getCities } from '../lib/getCitites';
import Loader from './loader';
import axiosInstance from '../lib/axios/axiosInstance';
import { AuthContext } from '../contexts/authContext';

interface City {
	id: number;
	city: string;
	hidden: boolean;
	imageUrl: string;
}

const Cities = () => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['cities'],
		queryFn: getCities,
	});
	const cities = data?.data.items || [];

	if (isLoading) {
		return <Loader />;
	}

	if (isError) {
		return <div>{error.message}</div>;
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:pl-4'>
			{Array.isArray(cities) &&
				cities.length > 0 &&
				cities.map((city: City) =>
					city.hidden ? (
						<UnavailableCity key={city.id} city={city} index={city?.id} />
					) : (
						<AvailableCity key={city.id} city={city} index={city?.id} />
					),
				)}
		</div>
	);
};

export default Cities;
