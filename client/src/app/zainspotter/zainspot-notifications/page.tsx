'use client';

import { WithAuth } from '@/app/lib/withAuth';
import Breadcrumb from '../components/breadcrumb';
import Layout from '../Layout';
import Translation from '@/app/components/translation';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/app/contexts/authContext';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loader from '@/app/components/loader';
import toast from 'react-hot-toast';

const NOTIFICATIONS_DETAILS = [
	{
		header: 'notifications_marketing',
		info: [
			{
				key: 'newCityNotif',
				title: 'notifications_newCity_title',
				desc: 'notifications_newCity_desc',
			},
			{
				key: 'specialOfferNotif',
				title: 'notifications_offer_title',
				desc: 'notifications_offer_desc',
			},
			{
				key: 'marketingNotif',
				title: 'notifications_genMarketing_title',
				desc: "notifications_genMarketing_desc",
			},
		],
	},
	{
		header: 'notifications_greetings',
		info: [
			{
				key: 'birthdayNotif',
				title: 'notifications_birthday_title',
				desc: 'notifications_birthday_desc',
			},
			{
				key: 'greetingsNotif',
				title: 'notifications_seasGreeting_title',
				desc: 'notifications_seasGreeting_desc',
			},
		],
	},
	{
		header: 'notifications_payment',
		info: [
			{
				key: 'monthlyPaymentAlert',
				title: 'notifications_monthly_title',
				desc: 'notifications_monthly_desc',
			},
			{
				key: 'paymentReceipt',
				title: 'notifications_receipt_title',
				desc: 'notifications_receipt_desc',
			},
			{
				key: 'paymentFailure',
				title: 'notifications_failure_title',
				desc: 'notifications_failure_desc',
			},
		],
	},
	{
		header: 'notifications_issues',
		info: [
			{
				key: 'imminentPayment',
				title: 'notifications_expiration_title',
				desc: 'notifications_expiration_desc',
			},
			{
				key: 'paymentExpired',
				title: 'notifications_method_title',
				desc: 'notifications_method_desc',
			},
			{
				key: 'passwordReset',
				title: 'notifications_pass_title',
				desc: 'notifications_pass_desc',
			},
			{
				key: 'accModifications',
				title: 'notifications_account_title',
				desc: 'notifications_account_desc',
			},
			{
				key: 'securityIssues',
				title: 'notifications_sec_title',
				desc: 'notifications_sec_desc',
			},
			{
				key: 'manualHocNotif',
				title: 'notifications_hoc_title',
				desc: 'notifications_hoc_desc',
			},
		],
	},
];

const Page = () => {
	const breadcrumbItems = [
		{ label: 'breadcrumb_home', href: '/' },
		{ label: 'breadcrumb_zainspotter', href: '/zainspotter' },
		{ label: 'editProfile_notifications' },
	];

	const { user } = useContext(AuthContext);
	const [notificationSettings, setNotificationSettings] = useState<Record<string, boolean>>({});


	const { data, isLoading } = useQuery({
		queryKey: ['notifications'],
		queryFn: async () => {
		  const response = await axiosInstance.get(`notifications/${user.user.userId}`);
		  return response.data;
		},
	  });
	  
	  useEffect(() => {
		if (data) {
		  setNotificationSettings(data);
		}
	  }, [data]);


	const mutation = useMutation({
		mutationFn: async (notificationType: string) => {
			await axiosInstance.patch(`notifications/${user.user.userId}/${notificationType}`);
		},
		onMutate: (notificationType) => {
			setNotificationSettings((prev) => ({
				...prev,
				[notificationType]: !prev[notificationType],
			}));
		},
		onError: (error, notificationType) => {
			toast.error(`Error updating notification: ${error.message}`);
			setNotificationSettings((prev) => ({
				...prev,
				[notificationType]: !prev[notificationType],
			}));
		},
	});

	if (isLoading) return <Loader />;

	return (
		<div className='flex flex-col gap-4 md:gap-6 bg-background-foreground md:px-16 md:py-8 py-6 px-2  md:pb-20'>
			<Breadcrumb items={breadcrumbItems} />
			<Layout>
				<div className='flex flex-col p-4 px-6 gap-4 bg-background border mb-20'>
					<h1 className='font-bold'>
						<Translation translationKey='notifications_header' />
					</h1>
					{NOTIFICATIONS_DETAILS.map((section, index) => (
						<div
							key={index}
							className={`flex flex-col gap-5 pb-5 ${index !== NOTIFICATIONS_DETAILS.length - 1 && 'border-b'
								} `}
						>
							<p className='text-span text-sm font-semibold'>

								<Translation translationKey={section.header} />
							</p>
							<div className='flex flex-col gap-2 font-light'>
								{section.info.map((info, index) => (
									<div key={index} className='flex gap-2 '>
										<div className='flex items-start pt-[5px] '>
											<input
												type='checkbox'
												checked={notificationSettings[info.key]}
												onChange={() => mutation.mutate(info.key)}
												className='accent-primary'
											/>
										</div>
										<div className='flex flex-col'>
											<h1>
												<Translation translationKey={info.title} />
											</h1>
											<p className='text-span'>
												<Translation translationKey={info.desc} />
											</p>
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

export default WithAuth(Page, ['zainspotter']);
