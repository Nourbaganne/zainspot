'use client';

import Image from 'next/image';
import Link from 'next/link';
import locationLogo from '@/app/assets/city-details/location-logo.svg';
import Translation from '@/app/components/translation';
import ZsGold from '../components/zsGold';
import ZsClassic from '../components/zsClassic';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import Loader from '@/app/components/loader';
import Map from '@/app/components/map';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/app/contexts/authContext';
import City from '@/app/interfaces/City';
import { FiArrowRight, FiChevronLeft } from 'react-icons/fi';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/contexts/LanguageContext';
import HighlightText from '../components/highlightText';

export interface SelectedItem {
	duration: number;
	amount: number;
	optionType: 'gold' | 'classic';
	stripePriceId: string;
}

const CityDetails = ({ params }: { params: { city: string; id: string } }) => {
	const router = useRouter();
	const { user } = useContext(AuthContext);
	const { language } = useLanguage();

	const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

	function checkIfSubscribed() {
		if (!user) {
			return;
		}

		if (user.user) {
			axiosInstance
				.get(`/subscriptions?user.id=${user.user.userId}&city.id=${params.id}`)
				.then((res) => {
					const subscriptions = res.data;

					for (let i = 0; i < subscriptions.length; i++) {
						const subscription = subscriptions[i];
						const endDate = new Date(subscription.endDate);
						const currentDate = new Date();
						if (
							endDate > currentDate &&
							subscription.paymentHistory.status == 'PAID'
						) {
							setIsSubscribed(true);
							setSelectedItem({
								amount: subscription.price / subscription.duration,
								duration: subscription.duration,
								optionType: subscription.optionType,
								stripePriceId: subscription.stripePriceId,
							});
							break;
						}
					}
				});
		}
	}

	useEffect(checkIfSubscribed, [user]);

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['city', params.id],
		queryFn: () =>
			axiosInstance.get(`/city/${params.id}?lang=${language.toLowerCase()}`),
	});

	const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

	// amout is the price
	// duration is in months
	function handleSelect(item: {
		duration: number;
		amount: number;
		optionType: 'gold' | 'classic';
		stripePriceId: string;
	}) {
		if (isSubscribed) {
			alert('You are already subscribed');
			return;
		}
		setSelectedItem(item);
	}

	function handleCheckout() {
		if (isSubscribed) {
			alert('You are already subscribed');
			return;
		}

		if (!user?.user.userId) {
			alert('Please login first');
			return;
		}

		if (!selectedItem) {
			alert('Please select an option first');
			return;
		}

		const startDate = new Date();
		const newSubscription = {
			startDate,
			endDate: new Date(
				startDate.setMonth(startDate.getMonth() + selectedItem.duration),
			),
			optionType: selectedItem.optionType,
			duration: selectedItem.duration,
			price: selectedItem.amount * selectedItem.duration,
			userId: user?.user.userId,
			cityId: parseInt(params.id),
		};

		if (!selectedItem.stripePriceId) {
			console.log(
				'Please assign a Stripe Price ID to the selected item by editing the city price for this option',
			);
			alert('Check console for error');
			return;
		}

		const reqBody = {
			stripePriceId: selectedItem.stripePriceId,
			subscription: newSubscription,
			userId: user.user.userId,
		};
		console.log('reqBody', reqBody);

		axiosInstance
			.post('stripe/create-checkout-session', reqBody)
			.then((res) => {
				router.replace(res.data.url);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	if (isLoading) {
		return <Loader />;
	}

	if (isError) {
		return <div>{error.message}</div>;
	}

	const city: City = data?.data;

	const formatDescription = (text: string) => {
		return text.split('.').map((sentence, index) => (
			<React.Fragment key={index}>
				{sentence.trim()}
				{index < text.split('.').length - 1 && <span>.</span>}
				{index < text.split('.').length - 1 && <br />}
			</React.Fragment>
		));
	};

	return (
		city && (
			<div className='flex flex-col md:grid md:grid-cols-5 font-sans md:pt-5 md:pb-14 md:px-10 text-text-foreground '>
				<div className='col-span-3 flex flex-col py-2 md:py-0 gap-8 md:gap-4'>
					<Link href={'/'} className='px-4 text-sm flex gap-1 hover:underline'>
						<FiChevronLeft className='h-5 w-5' />
						<Translation translationKey='citypage_return_button' />
					</Link>
					<div>
						<div className='px-4 md:px-0 text-text-foreground flex flex-col md:flex-row md:items-center md:gap-2  '>
							<h1 className='font-bold text-4xl md:text-semibold-36 font-sans leading-[3rem] '>
								{city.city}
								<Translation translationKey='zainspot_title' />
							</h1>
							<h1 className='md:text-xl font-regular self-end md:self-center '>
								{city?.location?.title.split(',')[0]}
							</h1>
						</div>
						<div className='flex overflow-hidden'>
							<Image
								src={city.imageUrl as string}
								alt='image'
								width={800}
								height={300}
							/>
						</div>
						<div className='flex flex-col px-4 md:px-2 gap-7 pt-4 text-text-foreground'>

							<HighlightText text={city?.catchphrase} />
							<p
								className='font-regular text-description-foreground text-lg md:text-[16px] leading-[27px] tracking-wide'
								style={{ wordSpacing: '0.2em', textAlign: 'justify' }}
							>
								{city?.description && formatDescription(city.description)}
							</p>
							<div className='flex flex-col gap-3 bg-white-700 mx-auto mb-5 w-full h-[480px] overflow-hidden'>
								<div className='flex gap-1 items-center'>
									<Image src={locationLogo} alt='location-logo' />
									<h1 className='font-semibold font-sans'>
										{city?.location?.title}
									</h1>
								</div>
								<Map address={city?.location?.locationLink} />
							</div>
						</div>
					</div>
				</div>
				<div className='col-span-2 flex flex-col gap-7 px-4 md:px-6 pt-0 md:pt-6 '>
					<ZsGold
						priceData={city?.goldPrice}
						onSelect={handleSelect}
						selectedItem={selectedItem}
						isSubscribed={isSubscribed}
					/>
					<ZsClassic
						isSubscribed={isSubscribed}
						selectedItem={selectedItem}
						pricesData={city?.classicPrice}
						onSelect={handleSelect}
					/>
					<div className='flex items-start gap-5 py-6'>
						<div className='flex flex-col gap-2 w-full'>
							<Link
								href='/'
								className='flex text-sm items-center font-bold text-primary border-2 rounded-md border-primary px-4 py-[5px] md:px-6 md:py-4 uppercase'
							>
								<Translation translationKey='select_another_city' />{' '}
							</Link>
							{!user?.user.userId && (
								<div className='flex gap-6 pl-4 text-lg font-bold text-primary'>
									<Link href='/register' className='hover:underline uppercase'>
										<Translation translationKey='join' />
									</Link>
									<Link href='/login' className='hover:underline uppercase'>
										<Translation translationKey='login' />
									</Link>
								</div>
							)}
						</div>
						<button
							onClick={handleCheckout}
							className={
								'flex flex-col text-sm items-center font-medium border-2 rounded-md px-6 py-4 uppercase w-full ' +
								(selectedItem && !isSubscribed
									? 'text-white bg-primary border-primary rounded-md '
									: 'border-gray-300 text-gray-400') +
								(isSubscribed ? ' cursor-not-allowed uppercase' : '')
							}
						>
							{isSubscribed && (
								'Already'
							)}
							<span className=' font-bold'>
								{isSubscribed ? (
									'Subscribed'
								) : (
									<div className='flex items-center justify-center gap-4'>
										<Translation translationKey='secure_checkout' />
										<FiArrowRight size={18}/>
									</div>
								)}
							</span>
						</button>
					</div>
				</div>
			</div>
		)
	);
};

export default CityDetails;
