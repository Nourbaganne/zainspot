'use client';

import Breadcrumb from '../components/breadcrumb';
import Layout from '../Layout';
import { usePaymentForm } from '@/app/lib/payment-form';
import InputPassword from '@/app/components/inputPassword';
import SaveChangesButton from '@/app/components/saveChangesButton';
import PaypalLogo from '@/app/assets/payment-details/paypal.svg';
import creditCardLogo from '@/app/assets/payment-details/visa_image.svg';
import addButton from '@/app/assets/payment-details/add.svg';
import PaymentCard from './component/paymentCard';
import { useState } from 'react';
import Image from 'next/image';
import Translation from '@/app/components/translation';
import { WithAuth } from '@/app/lib/withAuth';

const Page = () => {
	const [selectedPayment, setSelectedPayment] = useState('');

	const breadcrumbItems = [
		{ label: 'breadcrumb_home', href: '/' },
		{ label: 'breadcrumb_zainspotter', href: '/zainspotter' },
		{ label: 'editProfile_Payment_details' },
	];

	const SAVED_PAYMENT_METHOD = ['Credit Card', 'Paypal', 'Direct Debit'];

	const PREFERED_PAYMENT_METHOD = [
		{ title: 'Credit Card', logo: creditCardLogo, info: '**** 8753' },
		{ title: 'Paypal', logo: PaypalLogo, info: 'exemple@gmail.com' },
	];

	const formik = usePaymentForm();

	const handlePaymentMethodClick = (method: string) => {
		formik.setFieldValue('paymentMethod', method);
	};

	return (
		<div className='flex flex-col gap-4 md:gap-6 bg-background-foreground md:px-16 md:py-8 py-6 px-2  md:pb-20'>
			<Breadcrumb items={breadcrumbItems} />
			<Layout>
				<div className='flex flex-col p-4 px-6 gap-3 bg-background border mb-20'>
					<h1 className='font-bold'>
						<Translation translationKey='payment_details_title' />
					</h1>
					<p className='text-span text-sm font-semibold'>
						<Translation translationKey='payment_details_subtitle' />
					</p>

					<form
						action=''
						className=' flex flex-col gap-8 pb-8 border-b'
						onSubmit={(e) => e.preventDefault()}
					>
						<div className='bg-background-foreground flex text-span-foreground rounded-md p-1 w-fit gap-2'>
							<div className='flex gap-2 md:font-semibold whitespace-nowrap md:whitespace-normal max-w-56 md:max-w-none  overflow-x-auto'>
								{SAVED_PAYMENT_METHOD.map((value, index) => (
									<div
										key={index}
										onClick={() => handlePaymentMethodClick(value)}
										className={`px-2 py-1 rounded-md cursor-pointer ${
											formik?.values.paymentMethod === value
												? 'bg-background text-text'
												: ''
										}`}
									>
										{value}
									</div>
								))}
							</div>
							<button className='border-l-2 text-xl px-2' type='button'>
								+
							</button>
						</div>

						<InputPassword
							labelKey='Card Holder'
							value={formik.values.cardHolder}
							name='cardHolder'
							touched={formik.touched.cardHolder}
							errors={formik.errors.cardHolder}
							formik={formik}
						/>
						<InputPassword
							labelKey='Billing Adress'
							value={formik.values.billingAdress}
							name='billingAdress'
							touched={formik.touched.billingAdress}
							errors={formik.errors.billingAdress}
							formik={formik}
						/>
						<div className='flex flex-col md:flex-row gap-4'>
							<InputPassword
								labelKey='Expiry Date'
								value={formik.values.expiryDate}
								name='expiryDate'
								touched={formik.touched.expiryDate}
								errors={formik.errors.expiryDate}
								formik={formik}
							/>
							<InputPassword
								labelKey='CVV'
								value={formik.values.CVV}
								name='CVV'
								touched={formik.touched.CVV}
								errors={formik.errors.CVV}
								formik={formik}
							/>
						</div>
						<SaveChangesButton />
					</form>

					<div className='flex flex-col gap-6 text-sm'>
						<div className='flex flex-col gap-2'>
							<h1 className='text-span font-semibold '>
								<Translation translationKey='payment_details_defaultPayment' />
							</h1>
							<p className='text-span-foreground'>
								<Translation translationKey='payment_details_defaultPayment_subtitle' />
							</p>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							{PREFERED_PAYMENT_METHOD.map((card, index) => (
								<PaymentCard
									title={card.title}
									logo={card.logo}
									info={card.info}
									selected={selectedPayment}
									setSelected={setSelectedPayment}
									key={index}
								/>
							))}
							<div
								className={`flex flex-col border rounded-md p-4 gap-5 justify-center items-center `}
							>
								<button className=' p-2 bg-[#DDDDDD] rounded-full w-auto opacity-35 '>
									<Image src={addButton} alt='add-card' />
								</button>
								<h1 className='text-span font-semibold'>
									<Translation translationKey='payment_details_addingCard' />
								</h1>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</div>
	);
};

export default WithAuth(Page, ['zainspotter']);
