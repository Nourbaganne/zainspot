'use client';

import Image from 'next/image';
import Breadcrumb from '../components/breadcrumb';
import Layout from '../Layout';
import upSort from '@/app/assets/invoices/Up.svg';
import downSort from '@/app/assets/invoices/Down.svg';
import downloadIcon from '@/app/assets/invoices/download-outline.svg';
import alert from '@/app/assets/zainspotter/alert-circle-outline.svg';
import {
	useState,
	useRef,
	useEffect,
	MouseEvent as ReactMouseEvent,
	useContext,
} from 'react';
import Portal from './components/portal';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import { AuthContext } from '@/app/contexts/authContext';
import { MoneyValue } from '@/app/components/MoneyValue';
import { useCurrency } from '@/app/contexts/CurrencyContext';
import Loader from '@/app/components/loader';
import { WithAuth } from '@/app/lib/withAuth';

interface Subscription {
	country: string;
	type: string;
}

interface PaymentHistory {
	subscription: Subscription;
	date: string;
	method: string;
	amount: number;
	status: string;
}

const Page = () => {
	const [openFailedMenuIndex, setOpenFailedMenuIndex] = useState<number | null>(
		null,
	);
	const [menuPosition, setMenuPosition] = useState<{
		top: number;
		left: number;
	} | null>(null);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const { user } = useContext(AuthContext);
	const { currency } = useCurrency();

	const breadcrumbItems = [
		{ label: 'breadcrumb_home', href: '/' },
		{ label: 'breadcrumb_zainspotter', href: '/zainspotter' },
		{ label: 'editProfile_Payment_history' },
	];

	const handleAlertClick = (
		event: ReactMouseEvent<HTMLButtonElement>,
		index: number,
	) => {
		const buttonRect = event.currentTarget.getBoundingClientRect();
		const isMobile = window.innerWidth < 768;
		const menuWidth = isMobile ? 330 : 390;
		const menuPos = {
			top: buttonRect.bottom + window.scrollY,
			left: buttonRect.right + window.scrollX - menuWidth,
		};

		if (openFailedMenuIndex === index) {
			setOpenFailedMenuIndex(null);
			setMenuPosition(null);
		} else {
			setOpenFailedMenuIndex(index);
			setMenuPosition(menuPos);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setOpenFailedMenuIndex(null);
				setMenuPosition(null);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const { data, isError, error, isLoading } = useQuery({
		queryKey: ['payment-history'],
		queryFn: () =>
			axiosInstance.get(`/payment-history/${user?.user?.userId}`, {
				headers: {
					Authorization: `Bearer ${user?.access_token}`,
				},
			}),
	});

	if (isLoading) {
		return <Loader />;
	}
	if (isError) {
		return <div>{error.message}</div>;
	}

	return (
		<div className='flex flex-col gap-4 md:gap-6 bg-background-foreground md:px-16 md:py-8 py-6 px-2 md:pb-20'>
			<Breadcrumb items={breadcrumbItems} />
			<Layout>
				<div className='flex flex-col p-4 px-6 gap-4 bg-background border pb-10 mb-20'>
					<h1 className='font-bold'>PAYMENT HISTORY</h1>
					<div className='overflow-x-auto'>
						{data?.data.length > 0 ? (
							<div className='min-w-max'>
								<div className='grid grid-cols-11 bg-background-foreground text-span text-sm items-center pl-2 py-3 sticky top-0'>
									<h1 className='col-span-3'>Subscription</h1>
									<div className='col-span-2 flex items-center gap-2'>
										<div className='flex flex-col gap-1'>
											<button>
												<Image src={upSort} alt='upSort-dateIssued' />
											</button>
											<button>
												<Image src={downSort} alt='downSort-dateIssued' />
											</button>
										</div>
										<h1>Date</h1>
									</div>
									<div className='col-span-2'>
										<h1>Method</h1>
									</div>
									<div className='col-span-2 flex items-center gap-2'>
										<div className='flex flex-col gap-1'>
											<button>
												<Image src={upSort} alt='upSort-amount' />
											</button>
											<button>
												<Image src={downSort} alt='downSort-amount' />
											</button>
										</div>
										<h1>Amount</h1>
									</div>
									<div className='col-span-2 flex items-center gap-2'>
										<div className='flex flex-col gap-1'>
											<button>
												<Image src={upSort} alt='upSort-status' />
											</button>
											<button>
												<Image src={downSort} alt='downSort-status' />
											</button>
										</div>
										<h1>Status</h1>
									</div>
								</div>

								<div className='max-h-[340px] overflow-y-auto'>
									{data?.data.map((payment: PaymentHistory, index: number) => (
										<div
											className='flex gap-3 md:gap-0 items-center border-b text-text font-light pl-4 py-[14px]'
											key={index}
										>
											<ul className='w-full grid grid-cols-11 items-center'>
												<li className='col-span-3'>
													<div className='flex flex-col text-sm'>
														<h1 className='font-normal'>
															{payment.subscription.country}
														</h1>
														<span className='text-span'>
															{payment.subscription.type}
														</span>
													</div>
												</li>
												<li className='col-span-2 pl-4'>
													{new Date(payment.date).toLocaleDateString()}
												</li>
												<li className='col-span-2 pl-4'>{payment.method}</li>
												<li className='col-span-2 pl-4'>
													<MoneyValue
														value={payment.amount}
														fromCurrency='USD'
														toCurrency={currency}
														decimals={0}
													/>
												</li>
												<li
													className={`col-span-2 pl-4 flex items-center gap-2 ${
														payment.status === 'Complete'
															? 'text-primary'
															: payment.status === 'Pending'
															? 'text-yellow-500'
															: 'text-alert'
													}`}
												>
													<span
														className={`w-3 h-3 rounded-full ${
															payment.status === 'Complete'
																? 'bg-primary'
																: payment.status === 'Pending'
																? 'bg-yellow-500'
																: 'bg-alert'
														}`}
													></span>
													{payment.status}
												</li>
											</ul>
											<div ref={menuRef}>
												{payment.status === 'Failed' ? (
													<button
														onClick={(event) => handleAlertClick(event, index)}
													>
														<Image src={alert} alt={`alert-${index}`} />
													</button>
												) : (
													<button>
														<Image
															src={downloadIcon}
															alt={`download ${index}`}
														/>
													</button>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						) : (
							<div>there is no payments yet</div>
						)}
					</div>
				</div>
			</Layout>
			{openFailedMenuIndex !== null && menuPosition && (
				<Portal>
					<div
						ref={menuRef}
						className='absolute flex flex-col gap-4 py-6 px-8 bg-darkBackground text-background rounded shadow-lg z-10 w-full max-w-xs sm:max-w-sm'
						style={{ top: menuPosition.top, left: menuPosition.left }}
					>
						<h1 className='font-semibold'>Pay Manually</h1>
						<p className='flex flex-col text-sm font-light max-w-xs'>
							To continue using this service, you have to pay manually.
							<span>(Subscription fee + Manual payment fee)</span>
						</p>
						<div className='flex gap-3 font-normal text-xs justify-end'>
							<button
								onClick={() => setOpenFailedMenuIndex(null)}
								className='py-2 px-5 border-2 border-primary rounded-md text-primary'
							>
								Cancel
							</button>
							<button className='py-2 px-4 bg-primary text-background rounded-md'>
								Pay Manually
							</button>
						</div>
					</div>
				</Portal>
			)}
		</div>
	);
};

export default WithAuth(Page, 'zainspotter');
