'use client'
import React, { useContext } from 'react';
import Image from 'next/image';
import logo from '@/app/assets/footer/zainspot.svg';
import { FOOTER_DATA } from '@/app/constants/footer';
import Translation from './translation';
import Link from 'next/link';
import { AuthContext } from '../contexts/authContext';

const Footer = () => {

	const { user } = useContext(AuthContext);

	return (
		<div className='flex flex-col gap-10 bg-primary text-background md:py-5 md:pt-10 md:px-20 justify-center p-6'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
				<div className='md:col-span-2 lg:col-span-4 xl:col-span-2'>
					<Image src={logo} alt='ZainSpot Logo' className='max-w-sm w-full' />
				</div>
				{FOOTER_DATA.map((titleData, index) => (
					<div key={index} className=''>
						<div className='font-semibold font-sans text-2xl'>
							<span>
								<Translation translationKey={titleData.translationKey} />
							</span>
						</div>
						<div className='mt-4'>
							{titleData.sections.map((section, index) => (
								section.translationKey === 'footer_title_gotomyzainspot' ? (
									user?.user.role.name === 'owner' ? (
										<Link
											key={index}
											href='/owner'
											className='block mt-3 text-secondary-foreground cursor-pointer hover:underline'
										>
											<Translation translationKey='footer_title_owner' />
										</Link>
									) : (
										<Link
											key={index}
											href={section.link}
											className='block mt-3 text-secondary-foreground cursor-pointer hover:underline'
										>
											<Translation translationKey={section.translationKey} />
										</Link>
									)

								) : (
									<Link
										key={index}
										href={section.link}
										className='block mt-3 text-secondary-foreground cursor-pointer hover:underline'
									>
										<Translation translationKey={section.translationKey} />
									</Link>
								)

							))}
						</div>
					</div>
				))}
			</div>
			<div className='flex flex-col text-sm md:flex-row gap-4 text-secondary-foreground font-regular'>
				<p>© 2024 ZainSpot</p>
				<p>
					<Translation translationKey='footer_privacy_policy' />
				</p>
			</div>
		</div>
	);
};

export default Footer;
