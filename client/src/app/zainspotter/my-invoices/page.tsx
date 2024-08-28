'use client';

import Image from 'next/image';
import Breadcrumb from '../components/breadcrumb';
import Layout from '../Layout';
import upSort from '@/app/assets/invoices/Up.svg';
import downSort from '@/app/assets/invoices/Down.svg';
import downloadIcon from '@/app/assets/invoices/download-outline.svg';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import { useContext } from 'react';
import { AuthContext } from '@/app/contexts/authContext';
import { useCurrency } from '@/app/contexts/CurrencyContext';
import { MoneyValue } from '@/app/components/MoneyValue';

interface Invoice {
	id: number;
	dateIssued: string;
	dueDate: string;
	amount: number;
	status: string;
}

const Page = () => {
	const { user } = useContext(AuthContext);
	const { currency } = useCurrency();

	const breadcrumbItems = [
		{ label: 'breadcrumb_home', href: '/' },
		{ label: 'breadcrumb_zainspotter', href: '/zainspotter' },
		{ label: 'editProfile_Invoices' },
	];

	const { data, isLoading, error, isError } = useQuery({
		queryKey: ['invoices'],
		queryFn: () =>
			axiosInstance.get(`/invoices/${user?.user.userId}`, {
				headers: {
					Authorization: `Bearer ${user?.access_token}`,
				},
			}),
	});

	if (isLoading) {
		return <div>Loading ...</div>;
	}
	if (isError) {
		return <div>{error.message}</div>;
	}

	return (
		<div className='flex flex-col gap-4 md:gap-6 bg-background-foreground md:px-16 md:py-8 py-6 px-2  md:pb-20'>
			<Breadcrumb items={breadcrumbItems} />
			<Layout>
				<div className='flex flex-col p-4 px-6 gap-4 bg-background border pb-10 mb-20'>
					<h1 className='font-bold'>MY INVOICES</h1>
					<div className='overflow-x-auto'>
						{data?.data.length > 0 ? (
							<div className='min-w-max'>
								<div className='grid grid-cols-11 bg-background-foreground text-span text-sm items-center pl-2 py-3 sticky top-0'>
									<h1 className='col-span-3 '>Invoice N°</h1>
									<div className='col-span-2 flex items-center gap-2'>
										<div className='flex flex-col gap-1'>
											<button>
												<Image src={upSort} alt='upSort-dateIssued' />
											</button>
											<button>
												<Image src={downSort} alt='downSort-dateIssued' />
											</button>
										</div>
										<h1>Date Issued</h1>
									</div>
									<div className='col-span-2 flex items-center gap-2'>
										<div className='flex flex-col gap-1'>
											<button>
												<Image src={upSort} alt='upSort-dueDate' />
											</button>
											<button>
												<Image src={downSort} alt='downSort-dueDate' />
											</button>
										</div>
										<h1>Due Date</h1>
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
									{data?.data.map((invoice: Invoice, index: number) => (
										<div
											className='flex gap-3 md:gap-0 items-center border-b text-text font-light pl-4  py-5'
											key={index}
										>
											<ul
												key={index}
												className='w-full grid grid-cols-11 items-center'
											>
												<li className='col-span-3'>{invoice.id}</li>
												<li className='col-span-2 pl-4'>
													{new Date(invoice.dateIssued).toLocaleDateString()}
												</li>
												<li className='col-span-2 pl-4'>
													{new Date(invoice.dueDate).toLocaleDateString()}
												</li>
												<li className='col-span-2 pl-4'>
													<MoneyValue
														value={invoice.amount}
														fromCurrency='USD'
														toCurrency={currency}
														decimals={0}
													/>
												</li>
												<li
													className={`col-span-2 pl-4 flex items-center gap-2 ${
														invoice.status === 'Paid'
															? 'text-primary'
															: invoice.status === 'Unpaid'
															? 'text-yellow-500'
															: 'text-alert'
													}`}
												>
													<span
														className={`w-3 h-3 rounded-full ${
															invoice.status === 'Paid'
																? 'bg-primary'
																: invoice.status === 'Unpaid'
																? 'bg-yellow-500'
																: 'bg-alert'
														}`}
													></span>
													{invoice.status}
												</li>
											</ul>
											<div>
												<Image src={downloadIcon} alt={`download ${index}`} />
											</div>
										</div>
									))}
								</div>
							</div>
						) : (
							<div>no invoices yet</div>
						)}
					</div>
				</div>
			</Layout>
		</div>
	);
};

export default Page;
