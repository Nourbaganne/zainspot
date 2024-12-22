import Image from 'next/image';
import React, { ChangeEvent } from 'react';
import buttonIcon from '@/app/assets/payment-details/ellipsis-vertical.svg';
import PaypalLogo from '@/app/assets/payment-details/paypal.svg';
import CreditCardLogo from '@/app/assets/payment-details/visa_image.svg';
import axiosInstance from '@/app/lib/axios/axiosInstance';

type PaymentCardProps = {
	paymentMethod: any;
	selected: string;
	setSelected: (value: string) => void;
};

const PaymentCard: React.FC<PaymentCardProps> = ({
	paymentMethod,
	selected,
	setSelected,
}) => {
	const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
		const requestBody = {
			customer: paymentMethod.customer,
			paymentMethod: event.target.value,
		};
		axiosInstance
			.put('/stripe/customer-default-payment-method', requestBody)
			.then((res) => {
				if (res.status == 204) {
					setSelected(event.target.value);
					alert('Default Payment Method Updated Successfully');
				}
			});
	};

	return (
		<div
			className={`flex flex-col border rounded-md p-6 gap-5 justify-center ${
				selected === paymentMethod.id ? 'border-primary' : ''
			}`}
		>
			<div className='flex justify-between items-center'>
				<div className='flex gap-2 items-center'>
					<input
						type='radio'
						name='payment-method'
						id={paymentMethod.id}
						value={paymentMethod.id}
						onChange={handleRadioChange}
						checked={selected === paymentMethod.id}
						className={`w-4 h-4 accent-primary`}
					/>
					<label
						className='font-semibold capitalize'
						htmlFor={paymentMethod.id}
					>
						{paymentMethod.type}
					</label>
				</div>
				<div className='flex'>
					<Image
						src={paymentMethod.type == 'paypal' ? PaypalLogo : CreditCardLogo}
						alt='credit-card-logo'
					/>
					<button>
						<Image src={buttonIcon} alt='dropDown-button' />
					</button>
				</div>
			</div>
			<p className='text-span pl-5'>
				{paymentMethod.type === 'paypal'
					? paymentMethod.card.email
					: '**** ' + paymentMethod.card.last4}
			</p>
		</div>
	);
};

export default PaymentCard;
