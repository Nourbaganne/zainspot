'use client';

import Image from 'next/image';
import header from './assets/home/headerImg.svg';
import star from './assets/home/star.svg';
import check from './assets/home/check-icon.svg';
import close from './assets/home/close-icon.svg';
import { zainspotFeatures, ignoredFeatures } from './constants/home';
import Translation from './components/translation';
import Cities from './components/cities';

function Home() {
	return (
		<div className='flex flex-col work-sans'>
			<div className='relative flex flex-col'>
				<Image
					className='absolute z-0 w-full h-full object-cover'
					src={header}
					alt='header-image'
				/>
				<div className='flex flex-col z-10 px-4 lg:w-full lg:pl-14 gap-10 py-14'>
					<h1 className='lg:text-[57px] text-3xl font-sans font-bold text-background lg:leading-tight '>
						<Translation translationKey='homepage_header_title' />
						<span className='text-primary'>
							<Translation translationKey='homepage_header_span' />
						</span>
					</h1>
					<div className='flex flex-col rounded-md p-4 lg:max-w-fit py-0 lg:py-16 lg:pt-5 gap-4 font-semibold font-sans lg:ml-20 self-end'>
						<div className='grid grid-cols-1 text-primary gap-4'>
							{zainspotFeatures.map((feature, index) => (
								<div
									className='flex text-lg items-center gap-2 text-primary font-bold'
									key={index}
								>
									<Image src={check} alt='check-feature' />
									<Translation
										translationKey={`homepage_header_features[${index}]`}
									/>
								</div>
							))}
						</div>
						<div className='flex flex-col gap-3 lg:gap-4'>
							{ignoredFeatures.map((igf, index) => (
								<div className='flex gap-1 font-bold text-lg' key={index}>
									<Image src={close} alt='ignore-feature' />
									<h1 className='text-span'>
										<Translation
											translationKey={`homepage_header_ignoredFeatures[${index}]`}
										/>
									</h1>
								</div>
							))}
						</div>
					</div>
					<h1 className='lg:text-[36px] text-xl font-semibold font-sans text-background pl-2 lg:pl-8 lg:leading-tight'>
						<Translation translationKey='homepage_header_summary' />
						<span className='text-primary lg:text-[46px]'>
							<Translation translationKey='homepage_header_zainspot' />
						</span>
					</h1>
				</div>
			</div>
			<div className="bg-primary p-6 flex flex-col lg:flex-row lg:items-start items-center lg:pl-20 lg:py-10 font-semibold font-sans text-background text-2xl lg:text-[45px] gap-4 lg:leading-tight">
				<div className='flex lg:pt-4'>
					{Array(5)
						.fill(null)
						.map((_, index) => (
							<Image
								key={index}
								src={star}
								alt="star"
								className="w-6 mr-1 last:mr-0"
							/>
						))}
				</div>
				<Translation translationKey="homepage_description" />
			</div>

			<div className='flex flex-col py-12 lg:px-14 px-5 gap-9 '>
				<p className='font-sans font-[590px] text-text-foreground text-xl lg:text-2xl '>
					<Translation translationKey='homepage_cities_description' />
				</p>
				<div className='flex flex-col lg:pl-12 gap-5'>
					<h1 className='text-span text-2xl lg:text-4xl font-semibold font-sans flex gap-2'>
						<Translation translationKey='homepage_cities_title' />
						<span className='text-primary italic'>
							<Translation translationKey='homepage_cities_title_span' />
						</span>
					</h1>
					<Cities />
				</div>
			</div>
		</div>
	);
}

export default Home;
