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
import { useContext, useState } from 'react';
import { AuthContext } from '@/app/contexts/authContext';
import City from '@/app/interfaces/City';
import { FiChevronLeft } from 'react-icons/fi';

export interface SelectedItem {
	duration: number;
	amount: number;
	optionType: 'gold' | 'classic';
	stripePriceId: string;
}

const CityDetails = ({ params }: { params: { city: string; id: string } }) => {
	const { user } = useContext(AuthContext);

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['city', params.id],
		queryFn: () => axiosInstance.get(`/city/${params.id}`),
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
		console.log('selected item', item);
		setSelectedItem(item);
	}

	function handleCheckout() {
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

		axiosInstance
			.post('stripe/create-checkout-session', {
				stripePriceId: selectedItem.stripePriceId,
				subscription: newSubscription,
				userId: user?.user.userId,
			})
			.then((res) => {
				window.location.href = res.data.url;
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

	return (
		city && (
			<div className='flex flex-col md:grid md:grid-cols-2 font-sans md:pt-5 text-text-foreground '>
				<div className='flex flex-col py-2 md:py-0 gap-8 md:gap-4'>
					<Link href={'/'} className='px-4 text-sm flex gap-1 hover:underline'>
						<FiChevronLeft className='h-5 w-5' />
						<Translation translationKey='citypage_return_button' />
					</Link>
					<div>
						<div className='px-4 md:px-0 text-text-foreground flex flex-col gap-2 '>
							<h1 className='font-bold text-4xl md:text-bold-56 font-sans leading-[3rem] pl-0 md:pl-4'>
								{city.city} ZainSpot
							</h1>
							<h1 className='md:text-3xl text-semibold-18 font-semibold text-end'>
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
							<p
								className='font-sans font-semibold text-lg md:text-[18px] leading-[27px]  tracking-wide'
								style={{ wordSpacing: '0.2em', textAlign: 'justify' }}
							>
								{city?.description}
							</p>
							<h1 className='text-center font-sans font-extrabold text-xl md:text-2xl'>
								Get the global edge from this rich heritage with your{' '}
								<span className='text-primary'> ZainSpot </span>
								<Translation translationKey='citypage_subtitle' />
							</h1>
							<p className='font-light px-0 md:px-6 leading-[23px] md:leading-[27px] font-sans'>
								{city?.catchphrase}
							</p>
							<div className='flex flex-col gap-3 bg-white-700 mx-auto mb-5 w-full h-[480px] overflow-hidden px-0 md:px-8'>
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
				<div className='flex flex-col gap-7 px-0 md:px-10 '>
					<ZsGold
						priceData={city?.goldPrice}
						onSelect={handleSelect}
						selectedItem={selectedItem}
					/>
					<ZsClassic
						selectedItem={selectedItem}
						pricesData={city?.classicPrice}
						onSelect={handleSelect}
					/>
					<div className='flex flex-col justify-center items-center gap-5 py-6'>
						<div className='flex flex-col justify-center items-center gap-5 md:flex-row w-full'>
							{!user?.user.userId && (
								<div className='flex gap-7 text-xl font-bold text-primary'>
									<button className='hover:underline uppercase'>
										<Translation translationKey='join' />
									</button>
									<button className='hover:underline uppercase'>
										<Translation translationKey='login' />
									</button>
								</div>
							)}
							<button
								onClick={handleCheckout}
								className='md:ml-auto flex flex-col items-center font-semibold text-secondary border-2 border-secondary rounded-md px-12'
							>
								Go to{' '}
								<span className='text-xl'>
									<Translation translationKey='secure_checkout' />
								</span>
							</button>
						</div>

						<Link
							href='/'
							className='text-lg font-bold text-primary hover:underline uppercase'
						>
							<Translation translationKey='select_more_cities' />
						</Link>
					</div>
				</div>
			</div>
		)
	);
};

export default CityDetails;
