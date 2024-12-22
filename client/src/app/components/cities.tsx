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

	const { user } = useContext(AuthContext);

	const [subscriptions, setSubscriptions] = useState([]);

	useEffect(() => {
		if (!user) return;

		// get subscriptions for the user
		if (user.user) {
			axiosInstance.get(`/subscriptions/${user.user.userId}`).then((res) => {
				setSubscriptions(res.data);
			});
		}

		// build validSubscriptionsByCityId
		const validSubscriptionsByCityId = subscriptions.reduce((acc, sub) => {
			const currentDate = new Date();
			if (sub.cityId && currentDate < new Date(sub.endDate)) {
				acc[sub.cityId] = sub;
			}
			return acc;
		}, {});
		console.log('validSubscriptionsByCityId', validSubscriptionsByCityId);
	}, [user]);

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
