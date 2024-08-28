'use client';

import Image from 'next/image';
import Container from '../components/Container';
import RowImage from '@/app/assets/cart/row-image.png';
import { FiArrowLeft, FiArrowRight, FiChevronRight, FiX } from 'react-icons/fi';

export default function CartPage() {
	function applyDiscountCode() {
		console.log('appy discount code');
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
				<h1 className='h1'>My Cart</h1>
				<div className='mt-6 mx-auto grid grid-cols-12 gap-12'>
					<div className='col-span-8'>
						<table className='text-center w-full'>
							<thead>
								<th className='text-left'>City</th>
								<th>Subscription</th>
								<th>Subtotal</th>
							</thead>
							{Array.from({ length: 2 }).map((_, index) => (
								<tr key={index}>
									<td className='text-left'>
										<div className='flex items-center gap-6'>
											<div className='max-w-48'>
												<Image
													src={RowImage}
													alt='Row Image'
													className='rounded-lg'
												/>
											</div>
											<div>
												<h2 className='text-xl font-semibold'>
													London ZainSpot
												</h2>
												<span className='text-gray-400 mt-2 block'>
													Mayfair 14 Berkeley Square
												</span>
											</div>
										</div>
									</td>
									<td>
										<div className='font-bold text-2xl'>
											<span>ZS Classic</span>
										</div>
										<div className='text-primary block mt-1'>
											<span>6 Months</span>
										</div>
									</td>
									<td>
										<div className='font-bold text-2xl'>
											<span>$24.00</span>
										</div>
										<div className='text-gray-400 block mt-1'>Per month</div>
									</td>
									<td>
										<button>
											<FiX className='text-gray-400 hover:text-gray-700' />
										</button>
									</td>
								</tr>
							))}
						</table>
						<div className='mt-8'>
							<button className='btn btn-outline-gray btn-lg btn-uppercase'>
								<FiArrowLeft className='h-6 w-6' />
								<span>Continue Shopping</span>
							</button>
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
										<td>Subtotal</td>
										<td className='font-bold'>$417.00</td>
									</div>
									<div className='flex-between mt-3'>
										<td>Discount (15%)</td>
										<td className='font-bold'>-$62.55</td>
									</div>
									<div className='flex-between mt-3'>
										<td>Tax (7%)</td>
										<td className='font-bold'>$29.19</td>
									</div>
								</div>
							</div>
							{/* Apply Discount Code */}
							<div className='py-3 border-b'>
								<button
									className='flex-between text-lg text-gray-400 py-3 hover:bg-gray-100 hover:text-gray-900 rounded-lg w-full px-4'
									onClick={applyDiscountCode}
								>
									<span>Apply Discount Code</span>
									<FiChevronRight />
								</button>
							</div>
							<div className='pt-6'>
								<div className='flex-between text-xl font-semibold'>
									<div>
										<span>Total</span>
									</div>
									<div>
										<span>$383.64</span>
									</div>
								</div>
								<button className='mt-6 btn btn-primary w-full btn-lg btn-uppercase'>
									<span>CHECKOUT</span>
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
