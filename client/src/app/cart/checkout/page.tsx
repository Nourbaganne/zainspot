'use client';

import Image from 'next/image';
import Container from '../../components/Container';
import LoginImage from '@/app/assets/register/login-image.svg';
import { Input } from '@/app/register/components/input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Translation from '@/app/components/translation';

export default function CheckoutPage() {
	// Fields are: Card Holder, Billing Address, Expire Date, CVV
	// We also have 2 radios for card type: Paypal or Direct Debit
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

	function handleSubmit() {
		console.log('submit form');
	}

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
				<div className='hidden lg:block w-1/2'>
					<h2 className='h1 text-gray-600 mb-4 px-2'>
						Welcome To Business Without Borders
					</h2>
					<Image src={LoginImage} alt='Checkout' className='w-full' />
				</div>
				{/* Right Section */}
				<div className='flex-grow p-8'>
					<h1 className='h1 text-primary'>Secure Checkout</h1>
					<div className='mt-6 flex-between text-2xl font-semibold'>
						<div>
							<span>Total</span>
						</div>
						<div>
							<span>$383.62</span>
						</div>
					</div>
					<div className='mt-8'>
						<form onSubmit={handleSubmit}>
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
							<div className='col-span-2 flex flex-col gap-6 mt-8'>
								<div className='radio-container'>
									<input
										type='radio'
										id='paypal'
										name='cardType'
										value='credit'
										className='form-control'
									/>
									<label
										htmlFor='paypal'
										className='text-gray-500'
										defaultChecked={true}
									>
										<Translation translationKey='checkout_paypal_label' />
									</label>
								</div>
								<div className='radio-container'>
									<input
										type='radio'
										id='directCard'
										name='cardType'
										value='credit'
										className='form-control'
									/>
									<label
										htmlFor='directCard'
										className='text-gray-500'
										defaultChecked={true}
									>
										<Translation translationKey='checkout_direct_card_label' />
									</label>
								</div>
							</div>
							<button
								type='submit'
								className='mt-8 btn btn-gray w-full text-lg py-2 font-medium'
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
