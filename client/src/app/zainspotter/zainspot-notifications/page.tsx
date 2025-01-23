'use client';

import { WithAuth } from '@/app/lib/withAuth';
import Breadcrumb from '../components/breadcrumb';
import Layout from '../Layout';
import Translation from '@/app/components/translation';

const Page = () => {
	const breadcrumbItems = [
		{ label: 'breadcrumb_home', href: '/' },
		{ label: 'breadcrumb_zainspotter', href: '/zainspotter' },
		{ label: 'editProfile_notifications' },
	];

	const NOTIFICATIONS_DETAILS = [
		{
			header: 'notifications_marketing',
			info: [
				{
					title: 'notifications_newCity_title',
					desc: 'notifications_newCity_desc',
				},
				{
					title: 'notifications_offer_title',
					desc: 'notifications_offer_desc',
				},
				{
					title: 'notifications_genMarketing_title',
					desc: "notifications_genMarketing_desc",
				},
			],
		},
		{
			header: 'notifications_greetings',
			info: [
				{
					title: 'notifications_birthday_title',
					desc: 'notifications_birthday_desc',
				},
				{
					title: 'notifications_seasGreeting_title',
					desc: 'notifications_seasGreeting_desc',
				},
			],
		},
		{
			header: 'notifications_payment',
			info: [
				{
					title: 'notifications_monthly_title',
					desc: 'notifications_monthly_desc',
				},
				{
					title: 'notifications_receipt_title',
					desc: 'notifications_receipt_desc',
				},
				{
					title: 'notifications_failure_title',
					desc: 'notifications_failure_desc',
				},
			],
		},
		{
			header: 'notifications_issues',
			info: [
				{
					title: 'notifications_expiration_title',
					desc: 'notifications_expiration_desc',
				},
				{
					title: 'notifications_method_title',
					desc: 'notifications_method_desc',
				},
				{
					title: 'notifications_pass_title',
					desc: 'notifications_pass_desc',
				},
				{
					title: 'notifications_account_title',
					desc: 'notifications_account_desc',
				},
				{
					title: 'notifications_sec_title',
					desc: 'notifications_sec_desc',
				},
				{
					title: 'notifications_hoc_title',
					desc: 'notifications_hoc_desc',
				},
			],
		},
	];

	return (
		<div className='flex flex-col gap-4 md:gap-6 bg-background-foreground md:px-16 md:py-8 py-6 px-2  md:pb-20'>
			<Breadcrumb items={breadcrumbItems} />
			<Layout>
				<div className='flex flex-col p-4 px-6 gap-4 bg-background border mb-20'>
					<h1 className='font-bold'>
						<Translation translationKey='notifications_header' />
					</h1>
					{NOTIFICATIONS_DETAILS.map((data, index) => (
						<div
							key={index}
							className={`flex flex-col gap-5 pb-5 ${index !== NOTIFICATIONS_DETAILS.length - 1 && 'border-b'
								} `}
						>
							<p className='text-span text-sm font-semibold'>
								
								<Translation translationKey={data.header} />
							</p>
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
