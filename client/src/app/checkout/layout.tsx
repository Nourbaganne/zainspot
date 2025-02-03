'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import IMG from '@/app/assets/cart/row-image.png';
import { useState, useEffect, useContext } from 'react';
import axiosInstance from '../lib/axios/axiosInstance';
import { getCities } from '../lib/getCitites';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../contexts/authContext';
import Subscription from '../interfaces/Subscription';
import City from '../interfaces/City';

interface Props {
	children: React.ReactNode;
}

export default function CheckoutSuccessPage({ children }: Props) {
	// const searchParams = useSearchParams();
	// const sessionId = searchParams.get('session_id');

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['cities'],
		queryFn: getCities,
	});

	const cities = data?.data.items || [];

	const { user } = useContext(AuthContext);

	const subscriptionsRequest = useQuery({
		queryKey: ['subscriptions'],
		queryFn: () =>
			axiosInstance.get(`/subscriptions?user.id=${user.user.userId}`),
	});

	const subscriptions = subscriptionsRequest.data?.data || [];

	// loop through subscriptions and exclude cities that user has subscribed to
	const [availableCities, setAvailableCities] = useState<City[]>([]);
	function getAvailableCities() {
		console.log('cities', cities);
		let availableCities = cities.filter((city: City) => {
			const subscribed = subscriptions.find(
				(subscription: Subscription) =>
					subscription.city.id === city.id &&
					new Date(subscription.endDate) > new Date(),
			);
			return !subscribed && !city.hidden;
		});

		console.log('all available cities', availableCities);
		availableCities = availableCities.slice(0, 2);
		setAvailableCities(availableCities);
	}
	useEffect(getAvailableCities, []);

	if (!user) {
		return <p>Unauthorized</p>;
	}

	if (subscriptionsRequest.isLoading || isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Failed to get locations data!</p>;
	}
	if (subscriptionsRequest.error) {
		return <p>Failed to get subscriptions data!</p>;
	}

	return (
		<div className='py-24 max-w-xl mx-auto text-center'>
			<div>{availableCities.length}</div>
			{children}
			{availableCities.length > 0 && (
				<div className='mt-10 border-t border-dashed w-full pt-8'>
					<p className='text-gray-500'>
						Interested in subscribing to more cities? We can help you go global!
					</p>
					<div className='mt-6 gap-y-4 flex flex-col'>
						{availableCities.map((city: City) => (
							<Link
								key={city.id}
								href={`/${city.city}/${city.id}`}
								className='border rounded-lg overflow-hidden flex items-center gap-2 group'
							>
								<Image
									src={city.imageUrl as string}
									width={140}
									height={100}
									alt={city.city}
								/>
								<div className='ml-4 text-left'>
									<h2 className='text-lg font-semibold text-gray-800 group-hover:text-primary'>
										{city.city}
									</h2>
									<p className='text-gray-400 text-md'>{city.location.title}</p>
								</div>
								<div className='ml-auto px-6'>
									<FiArrowRight className='h-7 w-7 text-gray-800 group-hover:translate-x-2 group-hover:text-primary duration-75' />
								</div>
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
