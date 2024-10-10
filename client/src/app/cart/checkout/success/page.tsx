'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import IMG from '@/app/assets/cart/row-image.png';
import CONGRATS_IMG from '@/app/assets/cart/success/celebration-6VFgJeZ9bs.svg';
import { useEffect } from 'react';
import { useCart } from '@/app/contexts/CartContext';

export default function CheckoutSuccessPage() {
	const searchParams = useSearchParams();
	const sessionId = searchParams.get('session_id');

	const { clearCart } = useCart();

	useEffect(() => {
		console.log('Clearing cart');
		clearCart();
	}, [clearCart]);

	// Subscription.paymentId (references payment_history table)

	// TODO: save session id in the server for renewing the subscription(s) in the future

	return (
		<div className='flex-center flex-col'>
			<Image src={CONGRATS_IMG} className='w-full' height={300} alt='' />
			<div className='mt-6'>
				<h1 className='text-gray-900 text-2xl font-medium'>Congratulations!</h1>
				<p className='text-gray-500 mt-4'>
					You are now subscribed to ZS Gold London.
				</p>
				<p className='text-gray-500 mt-3'>
					View your subscription details{' '}
					<Link className='text-blue-600 underline hover:text-blue-400' href=''>
						here
					</Link>
				</p>
				<Link
					className='mt-6 btn font-semibold btn-outline-primary btn-uppercase uppercase border-2'
					href='/'
				>
					<span>Go Back Home</span>
					<FiArrowRight className='h-5 w-5' />
				</Link>
			</div>
		</div>
	);
}
