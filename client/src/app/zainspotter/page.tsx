'use client';

import Link from 'next/link';
import { ZAINSPOTTER_DASHBOARD } from '../constants/dashboards';
import ProfileCard from '../components/profileCard';
import Translation from '../components/translation';
import { WithAuth } from '../lib/withAuth';
import Breadcrumb from './components/breadcrumb';
import SubsImage from '@/app/assets/cart/row-image.png';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';

interface SubscriptionCardProps {
	title: string;
	description: string;
	image?: any;
}
const SubscriptionCard = ({
	title,
	description,
	image,
}: SubscriptionCardProps) => {
	const { user } = useContext(AuthContext);

	return (
		<div className='bg-white rounded-xl flex items-center gap-6 border'>
			<div className='max-w-1/3 h-28 object-fit scale-105 rounded-lg overflow-hidden object-fit'>
				<Image src={SubsImage} alt='Subscription' className='h-full w-auto' />
			</div>
			<div className='py-4'>
				<h2 className='h4'>{title}</h2>
				<div className='mt-2'>
					<span className='text-gray-400'>{description}</span>
				</div>
			</div>
		</div>
	);
};

const Page = () => {
	const breadcrumbItems = [
		{ label: 'breadcrumb_home', href: '/' },
		{ label: 'breadcrumb_zainspotter' },
	];

	return (
		<div className='flex flex-col bg-background-foreground gap-8 px-4 md:px-6 xl:px-16 py-6 md:py-8 '>
			<Breadcrumb items={breadcrumbItems} />
			<div className='grid grid-cols-12 gap-8'>
				{/* Left (Some text) */}
				<div className='col-span-12 lg:col-span-7 xl:col-span-8'>
					<h1 className='h1'>My Zainspot</h1>
					<p className='mt-4 text-base max-w-3xl text-gray-400'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</p>
				</div>
				{/* Right (Subscriptions) */}
				<div className='col-span-12 lg:col-span-5 xl:col-span-4 flex flex-col gap-6'>
					{Array.from(Array(2).keys()).map((index) => (
						<SubscriptionCard
							key={index}
							title='London Zainspot'
							description='Mayfair 14 Berkeley Square'
						/>
					))}
					<div className='ml-auto'>
						<button className='btn btn-outline-primary btn-uppercase'>
							<span>View All</span>
							<FiArrowRight className='h-6 w-6' />
						</button>
					</div>
				</div>
			</div>
			<div className='flex flex-col md:grid md:grid-cols-3 gap-4 justify-center items-stretch  '>
				{ZAINSPOTTER_DASHBOARD.map((card, index) => (
					<Link href={`/zainspotter/${card.link}`} key={index} className='flex'>
						<ProfileCard
							logo={card.logo}
							hoverLogo={card.hoverLogo}
							title={card.title}
							description={card.description}
						/>
					</Link>
				))}
			</div>
			<div className='flex flex-col gap-4 text-span justify-center items-center text-sm md:py-8'>
				<p>
					<Translation translationKey='editProfile_desactivation' />
				</p>
				<button className='text-xs underline hover:no-underline'>
					<Translation translationKey='editProfile_desactivation_button' />
				</button>
			</div>
		</div>
	);
};

export default WithAuth(Page);
