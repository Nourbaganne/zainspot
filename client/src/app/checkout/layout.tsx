'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import IMG from '@/app/assets/cart/row-image.png';
import CONGRATS_IMG from '@/app/assets/cart/success/celebration-6VFgJeZ9bs.svg';
import { useEffect } from 'react';

interface Props {
	children: React.ReactNode;
}

export default function CheckoutSuccessPage({ children }: Props) {
	const searchParams = useSearchParams();
	// const sessionId = searchParams.get('session_id');

	return (
		<div className='py-24 max-w-xl mx-auto text-center'>
			{children}
			<div className='mt-10 border-t border-dashed w-full pt-8'>
				<p className='text-gray-500'>
					Interested in subscribing to more cities? We can help you go global!
				</p>
				<div className='mt-6 gap-y-4 flex flex-col'>
					{Array.from({ length: 2 }).map((_, i) => (
						<Link
							key={i}
							href='/'
							className='border rounded-lg overflow-hidden flex items-center gap-2 group'
						>
							<Image src={IMG} width={140} height={100} alt='' />
							<div className='ml-4 text-left'>
								<h2 className='text-lg font-semibold text-gray-800 group-hover:text-primary'>
									London ZainSpot
								</h2>
								<p className='text-gray-400 text-md'>
									Mayfair 14 Berkeley Square
								</p>
							</div>
							<div className='ml-auto px-6'>
								<FiArrowRight className='h-7 w-7 text-gray-800 group-hover:translate-x-2 group-hover:text-primary duration-75' />
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
