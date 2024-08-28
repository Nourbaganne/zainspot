'use client';

import Breadcrumb from '../components/breadcrumb';
import Layout from '../Layout';

const Page = () => {
	const breadcrumbItems = [
		{ label: 'breadcrumb_home', href: '/' },
		{ label: 'breadcrumb_zainspotter', href: '/zainspotter' },
		{ label: 'editProfile_notifications' },
	];

	const NOTIFICATIONS_DETAILS = [
		{
			header: 'Marketing Emails',
			info: [
				{
					title: 'New City/Address',
					desc: 'Notifications about newly added locations or addresses available for subscription.',
				},
				{
					title: 'Special Offers',
					desc: 'Information on special discounts, promotions, and limited-time offers.',
				},
				{
					title: 'General Marketing',
					desc: "Updates about ZainSpotter's services, features, and company news.",
				},
			],
		},
		{
			header: 'Greetings',
			info: [
				{
					title: 'Birthday',
					desc: 'Personalized birthday wishes and possibly special offers on your special day.',
				},
				{
					title: 'Seasonal Greetings',
					desc: 'Festive greetings during holidays and seasons, which may include exclusive discounts.',
				},
			],
		},
		{
			header: 'Payment Alerts',
			info: [
				{
					title: 'Monthly Payment Alert',
					desc: 'Reminder of upcoming subscription payments.',
				},
				{
					title: 'Payment Receipt',
					desc: 'Confirmation of successful payment transactions.',
				},
				{
					title: 'Payment Failure',
					desc: 'Alert regarding any issues with processing your payment.',
				},
			],
		},
		{
			header: 'Account Issues',
			info: [
				{
					title: 'Imminent Payment Method Expiration',
					desc: 'Notification when your saved payment method is about to expire.',
				},
				{
					title: 'Payment Method Expired',
					desc: 'Alert that your saved payment method has expired and needs updating.',
				},
				{
					title: 'Password Reset',
					desc: 'Instructions and confirmation when you request a password reset.',
				},
				{
					title: 'Account Modifications (Password, Payment Method)',
					desc: 'Notifications about changes to your account password. Alerts when a payment method is added, removed, or updated.',
				},
				{
					title: 'Security Issues/Security-Related Events',
					desc: 'Alerts about suspicious login attempts, security breaches, or other security-related incidents.',
				},
				{
					title: 'Manual Ad Hoc Notifications',
					desc: 'Important messages and alerts sent manually by the ZainSpotter team for specific issues or updates.',
				},
			],
		},
	];

	return (
		<div className='flex flex-col gap-4 md:gap-6 bg-background-foreground md:px-16 md:py-8 py-6 px-2  md:pb-20'>
			<Breadcrumb items={breadcrumbItems} />
			<Layout>
				<div className='flex flex-col p-4 px-6 gap-4 bg-background border mb-20'>
					<h1 className='font-bold'>Zainspot Notifications</h1>
					{NOTIFICATIONS_DETAILS.map((data, index) => (
						<div
							key={index}
							className={`flex flex-col gap-5 pb-5 ${
								index !== NOTIFICATIONS_DETAILS.length - 1 && 'border-b'
							} `}
						>
							<p className='text-span text-sm font-semibold'>{data.header}</p>
							<div className='flex flex-col gap-2 font-light'>
								{data.info.map((info, index) => (
									<div key={index} className='flex gap-2 '>
										<div className='flex items-start pt-[5px] '>
											<input
												type='checkbox'
												name=''
												id=''
												className='accent-primary'
											/>
										</div>
										<div className='flex flex-col'>
											<h1 className=' '>{info.title}</h1>
											<p className='text-span'>{info.desc}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</Layout>
		</div>
	);
};

export default Page;
