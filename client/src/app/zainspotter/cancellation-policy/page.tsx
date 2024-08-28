'use client';

import Translation from '@/app/components/translation';
import Breadcrumb from '../components/breadcrumb';
import Layout from '../Layout';

const Page = () => {
	const breadcrumbItems = [
		{ label: 'breadcrumb_home', href: '/' },
		{ label: 'breadcrumb_zainspotter', href: '/zainspotter' },
		{ label: 'editProfile_cancellation' },
	];

	const REFUND_ELIGIBILITY_DATA = {
		overview: 'cancelation_eligibility_description_overview',
		description: [
			{ key: 'cancelation_eligibility_description_timeframe' },
			{ key: 'cancelation_eligibility_description_timeframe2' },
			{ key: 'cancelation_eligibility_description_annualSubs' },
		],
	};

	const CANCELATION_STEPS = [
		{ key: 'cancelation_step_1' },
		{ key: 'cancelation_step_2' },
		{ key: 'cancelation_step_3' },
		{ key: 'cancelation_step_4' },
		{ key: 'cancelation_step_5' },
		{ key: 'cancelation_step_6' },
		{ key: 'cancelation_step_7' },
	];
	return (
		<div className='flex flex-col gap-4 md:gap-6 bg-background-foreground md:px-16 md:py-8 py-6 px-2  md:pb-20'>
			<Breadcrumb items={breadcrumbItems} />
			<Layout>
				<div className='flex flex-col p-4 px-6 gap-4 bg-background border mb-20'>
					<h1 className='font-bold'>
						<Translation translationKey='editProfile_cancellation' />
					</h1>
					<div className='flex flex-col gap-4 text-sm'>
						<div className='flex flex-col gap-4 text-span'>
							<h1 className='font-semibold'>
								<Translation translationKey='cancelation_overview_title' />
							</h1>
							<p className='font-light'>
								<Translation translationKey='cancelation_overview_description' />
							</p>
						</div>
						<div className='flex flex-col gap-4 text-span'>
							<h1 className='font-semibold'>
								<Translation translationKey='cancelation_requiredPeriod_title' />
							</h1>
							<p className='font-light'>
								<Translation translationKey='cancelation_requiredPeriod_description' />
							</p>
						</div>
						<div className='flex flex-col gap-4 text-span'>
							<h1 className='font-semibold'>
								<Translation translationKey='cancelation_eligibility_title' />
							</h1>

							<ul className='list-disc pl-5 text-span font-light'>
								<h1>
									<Translation
										translationKey={REFUND_ELIGIBILITY_DATA.overview}
									/>
								</h1>
								{REFUND_ELIGIBILITY_DATA.description.map((data, index) => (
									<li className='ml-4' key={index}>
										<Translation translationKey={data.key} />
									</li>
								))}
							</ul>
						</div>
						<div className='flex flex-col gap-4 text-span'>
							<h1 className='font-semibold'>
								<Translation translationKey='cancelation_steps_title' />
							</h1>
							<div className='list-decimal text-span font-light'>
								{CANCELATION_STEPS.map((step, index) => (
									<li key={index}>
										<Translation translationKey={step.key} />
									</li>
								))}
							</div>
						</div>
						<div className='text-span font-light'>
							<Translation translationKey='cancelation_note_title' />
							<h1>
								<span className='text-text font-normal'>
									<Translation translationKey='cancelation_note_span' />
								</span>
								<Translation translationKey='cancelation_note_desc' />
							</h1>
						</div>
					</div>
				</div>
			</Layout>
		</div>
	);
};

export default Page;
