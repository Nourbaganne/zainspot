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
			<div className='px-8 flex flex-col gap-8 text-center'>
				<h1 className='font-bold text-xl md:text-[32px]'>
					<Translation translationKey='how_it_works' />
				</h1>
				<div className='bg-white d-flex justify-center px-8'>
					<Image
						src={explanationImage}
						alt='explanation'
						className='mx-auto max-w-7xl w-full'
					/>
				</div>
			</div>
		</Container>
	);
};

export default page;
