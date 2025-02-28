import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AvailableCity from './availableCity';
import UnavailableCity from './unavailableCity';
import { getCities } from '../lib/getCitites';
import Loader from './loader';
import axiosInstance from '../lib/axios/axiosInstance';
import { AuthContext } from '../contexts/authContext';
import Subscription from '../interfaces/Subscription';

export interface City {
	id: number;
	city: string;
	hidden: boolean;
	imageUrl: string;
}

const Cities = () => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['cities'],
		queryFn: getCities,
		refetchOnMount: 'always',
		refetchOnWindowFocus: true,
	});
	const cities = data?.data.items || [];

	// get all subscriptions for current user
	const { user } = useContext(AuthContext);

	const [subscribedCities, setSubscribedCities] = useState<Set<number>>(
		new Set(),
	);
	function getSubscriptions() {
		if (!user) {
			console.log('no auth user');
			return;
		}
		axiosInstance
			.get('/subscriptions?user.id=' + user.user.userId)
			.then(function (res) {
				const subscriptions = res.data;
				// build subscribed by userId
				const currDate = new Date();
				const subscribedCities: Set<number> = new Set();
				for (let i = 0; i < subscriptions.length; i++) {
					if (
						new Date(subscriptions[i].endDate) > currDate &&
						subscriptions[i].paymentHistory.status === 'PAID'
					) {
						subscribedCities.add(subscriptions[i].city.id);
					}
				}
				setSubscribedCities(subscribedCities);
			})
			.catch(function (error) {
				console.error('Failed to get subscriptions', error);
			});
	}
	useEffect(getSubscriptions, [user]);

	useEffect(() => {
		console.log('subscribedCities', subscribedCities);
	}, [subscribedCities]);

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
						<UnavailableCity key={city.id} city={city} />
					) : (
						<AvailableCity
							key={city.id}
							city={city}
							isSubscribed={subscribedCities.has(city.id)}
						/>
					),
				)}
		</div>
	);
};

export default Cities;
