'use client';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { IoIosWarning } from 'react-icons/io';

export default function CheckoutCancelPage() {
	const searchParams = useSearchParams();
	const sessionId = searchParams.get('session_id');
	// since payment failed, delete subscription
	// find payment_history by stripeSessionId
	// find associated subscription
	// delete subscription
	function deleteSubscription() {
		axiosInstance
			.delete(`subscriptions/${sessionId}`)
			.then(function (response) {
				if (response.status == 200) {
					console.log('Subscription deleted');
				}
			})
			.catch(function (error) {
				console.log('Error:', error);
			});
	}
	useEffect(deleteSubscription, [sessionId]);

	return (
		<div>
			<div className='text-center flex-center flex-col'>
				<div className='h-24 w-24 bg-red-600 flex-center rounded-full'>
					<IoIosWarning className='text-white text-6xl' />
				</div>
				<div className='mt-6'>
					<h1 className='text-gray-900 text-2xl font-medium'>Oh, no..</h1>
					<p className='text-gray-500 mt-4'>Your payment was unsuccessful.</p>
					<p className='text-gray-500 mt-3'>
						If you believe there is an issue,{' '}
						<Link
							className='text-blue-600 underline hover:text-blue-400'
							href=''
						>
							contact us
						</Link>
					</p>
					<Link
						className='mt-6 btn font-semibold btn-outline-primary btn-uppercase border-2'
						href='/'
					>
						Try Again
					</Link>
				</div>
			</div>
		</div>
	);
}
