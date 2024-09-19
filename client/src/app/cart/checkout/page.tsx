// ! This page is NOT NEEDED since Stripe will handle the payment process

'use client';
import Container from '../../components/Container';
import { Input } from '@/app/register/components/input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Translation from '@/app/components/translation';
import WelcomeToBusinessSection from '@/app/components/WelcomeToBusiness';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MoneyValue } from '@/app/components/MoneyValue';
import { useCurrency } from '@/app/contexts/CurrencyContext';


interface SelectedPaymentProps {
	amount: number;
	tax: number;
}
export default function CheckoutPage() {
	const searchParams = useSearchParams();
	const [selectedPayment, setSelectedPayment] = useState<SelectedPaymentProps | null>();
	const { currency } = useCurrency();

	// Get the selectedPayment from the query string
	useEffect(() => {
		const payment = searchParams.get('selectedPayment');
		if (payment) {
			setSelectedPayment(JSON.parse(payment));
		}
	}, [searchParams]);


	const formik = useFormik({
		initialValues: {
			cardHolder: '',
			billingAddress: '',
			expireDate: '',
			cvv: '',
		},
		validationSchema: Yup.object({
			cardHolder: Yup.string().required('Card Holder is required'),
			billingAddress: Yup.string().required('Billing Address is required'),
			expireDate: Yup.string().required('Expire Date is required'),
			cvv: Yup.string().required('CVV is required'),
		}),
		onSubmit: function () {
			console.log('submit form');
		},
	});

	return (
		<Container
			breadcrumbItems={[
				{ label: 'breadcrumb_home', href: '/' },
				{ label: 'breadcrumb_cart', href: '/cart' },
				{ label: 'breadcrumb_checkout', href: '/cart/checkout' },
			]}
			className='bg-white'
			withPaddingBottom={true}
		>

			{/* Sections Container */}
			<div className='flex items-start'>
				{/* Left Section */}
				<WelcomeToBusinessSection />
				{/* Right Section */}
				<div className='flex-grow p-8'>
					<h1 className='h1 text-primary'>
						<Translation translationKey='secure_checkout' />
					</h1>
					{selectedPayment && (
						<div className='flex flex-col gap-2 mt-3'>
							<div className='flex flex-col gap-2 border-b pb-3'>
								<div className=' flex-between font-semibold'>
									<div>
										<span>London ZainSpot Subscription</span>
									</div>
									<div>
										<MoneyValue
											value={selectedPayment?.amount}
											fromCurrency="USD"
											toCurrency={currency}
											decimals={0}
										/>
									</div>
								</div>
								<div className=' flex-between font-semibold'>
									<div>
										<span>Manual Payment Fee</span>
									</div>
									<div>
										<MoneyValue
											value={selectedPayment?.tax}
											fromCurrency="USD"
											toCurrency={currency}
											decimals={0}
										/>
									</div>
								</div>
							</div>
							<div className=' flex-between text-2xl font-semibold'>
								<div>
									<span>Total</span>
								</div>
								<div>
									<MoneyValue
										value={selectedPayment?.tax + selectedPayment?.amount}
										fromCurrency="USD"
										toCurrency={currency}
										decimals={0}
									/>
								</div>
							</div>
						</div>
					)}


					<div className='mt-8'>
						<form onSubmit={formik.handleSubmit}>
							{/* Payment method options */}
							<div className='radio-container'>
								<input
									type='radio'
									id='credit'
									name='paymentMethod'
									value='credit'
									className='form-control'
									defaultChecked={true}
								/>
								<label htmlFor='credit' className='text-gray-500'>
									<Translation translationKey='checkout_credit_card_label' />
								</label>
							</div>

							<div className='mt-8 grid grid-cols-2 gap-10'>
								<Input
									type='text'
									labelKey='checkout_card_holder_label'
									value={formik.values.cardHolder}
									name='cardHolder'
									handleChange={formik.handleChange}
									touched={formik.touched.cardHolder}
									errors={formik.errors.cardHolder}
									formik={formik}
									placeholderValue='John'
									className='col-span-2'
								/>
								<Input
									type='text'
									labelKey='checkout_billing_address_label'
									value={formik.values.billingAddress}
									name='billingAddress'
									handleChange={formik.handleChange}
									touched={formik.touched.billingAddress}
									errors={formik.errors.billingAddress}
									formik={formik}
									placeholderValue='1234 Main St'
									className='col-span-2'
								/>
								<Input
									type='text'
									labelKey='checkout_expire_date_label'
									value={formik.values.expireDate}
									name='expireDate'
									handleChange={formik.handleChange}
									touched={formik.touched.expireDate}
									errors={formik.errors.expireDate}
									formik={formik}
									placeholderValue='MM/YY'
									className='col-span-2 md:col-span-1'
								/>
								<Input
									type='text'
									labelKey='checkout_cvv_label'
									value={formik.values.cvv}
									name='cvv'
									handleChange={formik.handleChange}
									touched={formik.touched.cvv}
									errors={formik.errors.cvv}
									formik={formik}
									placeholderValue='123'
									className='col-span-2 md:col-span-1'
								/>
							</div>

							<button
								type='submit'
								className='mt-8 btn btn-gray w-full text-lg font-medium'
							>
								<Translation translationKey='checkout_submit_button' />
							</button>
						</form>
					</div>
				</div>
			</div>
		</Container>
	);
}
