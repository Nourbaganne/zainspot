'use client';

import Image from 'next/image';
import Container from '../components/Container';
import RowImage from '@/app/assets/cart/row-image.png';
import { FiArrowLeft, FiArrowRight, FiChevronRight, FiX } from 'react-icons/fi';
import Translation from '../components/translation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axiosInstance from '../lib/axios/axiosInstance';
import { getCities } from '../lib/getCitites';
import { useQuery } from '@tanstack/react-query';
import { useCart } from '../contexts/CartContext';
import City from '../interfaces/City';
import Loader from '../components/loader';
import Link from 'next/link';

// const fakeItems = [
// 	{
// 		name: 'London ZainSpot',
// 		description: 'Mayfair 14 Berkeley Square',
// 		image: RowImage,
// 		subscription: 'ZS Classic',
// 		subscriptionDuration: '6 Months',
// 		price: '$25.00',
// 		paymentTypeName: 'Per month',
// 	},
// 	{
// 		name: 'New York ZainSpot',
// 		description: 'Rockefeller Center',
// 		image: RowImage,
// 		subscription: 'ZS Gold',
// 		price: '$392.00',
// 		paymentTypeName: 'Single payment',
// 	},
// ];

export default function CartPage() {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['cities'],
		queryFn: getCities,
	});
	const cities = data?.data.items || [];
	const { state, removeFromCart } = useCart();
	const { items } = state;

	if (isLoading) {
		return <Loader />;
	}

	const totalPrice = items[0] ? items[0].price : 0;

	const citiesById: any = {};
	cities.forEach((city: City) => {
		if (!city.id) return; // city id is sure to be present, but new city doesn't have id and interface returning error
		citiesById[city.id] = city;
	});

	function applyDiscountCode() {
		alert('Apply Discount Code is under development');
		// Probably will show a modal where the user can enter discount code
		// Discount code will be sent to the server to validate
		// Discount will be applied to the total in the server
	}

	function handleCheckout() {
		if (!items[0]) {
			alert('Cart is empty!');
			return;
		}

		// TODO: change to handle multiple cart items
		let priceId = null;
		if (items[0].optionType == 'gold') {
			priceId = citiesById[items[0].cityId].goldPrice.stripePriceId;
		} else {
			priceId =
				citiesById[items[0].cityId].classicPrice.perMonth[0].stripePriceId;
		}

		console.log('Stripe Price ID:', priceId);

		axiosInstance
			.post('/stripe/create-checkout-session', { priceId })
			.then(function (response) {
				console.log(response);
				console.log(response.data);
				window.location = response.data.url;
			})
			.catch(function (error) {
				console.error(error);
			});
	}

	return (
		<Container
			breadcrumbItems={[
				{ label: 'breadcrumb_home', href: '/' },
				{ label: 'breadcrumb_cart' },
			]}
			withPaddingBottom={false}
		>
			<div className='bg-white w-full pt-6 px-12 pb-16'>
				<h1 className='h1'>
					<Translation translationKey='cart_my_cart_heading' />
				</h1>
				<div className='mt-6 mx-auto grid grid-cols-12 gap-12'>
					<div className='col-span-8'>
						{items.length == 0 && (
							<div className='text-red-400 font-medium'>
								No items added to cart.
							</div>
						)}
						{items.length > 0 && (
							<table className='text-center w-full'>
								<thead>
									<th className='text-left'>City</th>
									<th>Subscription</th>
									<th className='text-right'>Subtotal</th>
								</thead>
								{items.map((item, index) => (
									<tr key={index}>
										<td className='text-left'>
											<div className='flex items-center gap-6'>
												<div className='max-w-48'>
													<Image
														src={citiesById[item.cityId].imageUrl}
														width={350}
														height={200}
														alt='Row Image'
														className='rounded-lg'
													/>
												</div>
												<div>
													<h2 className='text-xl font-semibold'>
														{citiesById[item.cityId].city}
													</h2>
													<span className='text-gray-400 mt-2 block'>
														{citiesById[item.cityId].description}
													</span>
												</div>
											</div>
										</td>
										<td>
											<div className='font-bold text-2xl'>
												<span className='capitalize'>ZS {item.optionType}</span>
											</div>
											{item.duration && item.duration != 12 && (
												<div className='text-primary block mt-1'>
													<span>{item.duration} Months</span>
												</div>
											)}
										</td>
										<td className='text-right'>
											<div className='font-bold text-2xl'>
												<span>${item.price}</span>
											</div>
											<div className='text-gray-500 block mt-1'>
												{item.duration == 12 ? 'Single Payment' : 'Per month'}
											</div>
										</td>
										<td className='text-right'>
											<button onClick={() => removeFromCart(item)}>
												<FiX className='text-gray-400 hover:text-gray-700 h-6 w-6' />
											</button>
										</td>
									</tr>
								))}
							</table>
						)}
						<div className='mt-8'>
							<Link
								href='/'
								className='btn btn-outline-gray btn-lg btn-uppercase'
							>
								<FiArrowLeft className='h-6 w-6' />
								<span>
									<Translation translationKey='continue_shopping' />
								</span>
							</Link>
						</div>
					</div>
					<div className='col-span-4'>
						<div className='card py-6 px-8'>
							{/* Card Title */}
							<h2 className='h2 pb-6 border-b'>Summary</h2>
							{/* Numbers */}
							<div className='py-6 border-b'>
								<div className='text-lg'>
									<div className='flex-between'>
										<td>
											<Translation translationKey='subtotal' />
										</td>
										<td className='font-bold'>$417.00</td>
									</div>
									<div className='flex-between mt-3'>
										<td>
											<Translation translationKey='discount' /> (15%)
										</td>
										<td className='font-bold'>-$62.55</td>
									</div>
									<div className='flex-between mt-3'>
										<td>
											<Translation translationKey='tax' /> (7%)
										</td>
										<td className='font-bold'>$29.19</td>
									</div>
								</div>
							</div>
							{/* Apply Discount Code */}
							<div className='py-3 border-b'>
								<button
									className='flex-between text-lg text-gray-700 font-medium py-2 hover:text-gray-400 w-full'
									onClick={applyDiscountCode}
								>
									<span>Apply Discount Code</span>
									<FiChevronRight className='h-6 w-6' />
								</button>
							</div>
							<div className='pt-6'>
								<div className='flex-between text-xl font-semibold'>
									<div>
										<span>
											<Translation translationKey='total' />
										</span>
									</div>
									<div>
										{/* Total price from items */}$<span>{totalPrice}</span>
									</div>
								</div>
								{/* Checkout Button */}
								<button
									id='checkout-and-portal-button'
									className='mt-6 btn btn-primary w-full btn-lg btn-uppercase'
									type='button'
									onClick={handleCheckout}
								>
									<span>
										<Translation translationKey='checkout' />
									</span>
									<FiArrowRight className='h-6 w-6' />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
}
