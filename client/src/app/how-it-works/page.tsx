import Container from '../components/Container';
import Image from 'next/image';
import explanationImage from '@/app/assets/howitworks/how-it-works.svg';
import Translation from '../components/translation';

const page = () => {
	return (
		<Container
			breadcrumbItems={[
				{ label: 'breadcrumb_home', href: '/' },
				{ label: 'footer_title_howitworks' },
			]}
			withPaddingBottom={false}
		>
			<div className='flex flex-col gap-8 text-center'>
				<div className='flex flex-col px-8  gap-6'>
					<h1 className='font-bold text-xl md:text-[32px] text-primary'>
						<Translation translationKey='how_it_works' />
					</h1>
					<span className='text-span'>
						Dive into the world of Zainspot and Go Global!
					</span>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 p-6 md:px-20 md:pt-20 md:pb-28 gap-3 md:gap-16 bg-background relative">
					<div className="flex flex-col gap-8 text-span text-start">
						<h1 className="text-[32px] font-bold">Title Here</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
						<p>
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
						</p>
					</div>
					<div className="flex">
						<div className="w-full bg-[#D9D9D9]"></div>
					</div>
				</div>

				{/* <div className='bg-white d-flex justify-center px-8'>
					<Image
						src={explanationImage}
						alt='explanation'
						className='mx-auto max-w-7xl w-full'
					/>
				</div> */}
			</div>
		</Container>
	);
};

export default page;
