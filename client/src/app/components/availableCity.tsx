'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Translation from './translation';
import { useRouter } from 'next/navigation';

interface City {
	id: number;
	city: string;
	imageUrl: string;
}

interface Props {
	city: City;
	index: number;
}

const AvailableCity = ({ city, index }: Props) => {
	const router = useRouter();

	function handleClick() {
		router.push(`/${city.city}/${city?.id}`);
	}

	return (
		<button
			onClick={handleClick}
			className={`text-left relative flex bg-secondary-foreground hover:bg-background gap-4 items-center cursor-pointer group hover:shadow-lg `}
			key={index}
		>
			<div className='w-44 h-40 relative'>
				<Image
					src={city.imageUrl}
					alt={city.city}
					layout='fill'
					objectFit='cover'
				/>
			</div>
			<div className='flex flex-col gap-2'>
				<h1 className='font-semibold font-sans text-text-foreground'>
					<Translation translationKey='city_directionText' /> {city.city}
				</h1>
				<p className='text-primary font-sans font-medium text-sm'>
					<Translation translationKey='citypage_available_city' />
				</p>
				<p className='text-primary hidden group-hover:block underline'>
					<Translation translationKey='citypage_available_hovering' />
				</p>
			</div>
		</button>
	);
};

export default AvailableCity;
