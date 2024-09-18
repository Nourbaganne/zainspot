import Image from 'next/image';
import LoginImage from '@/app/assets/register/login-image.svg';

export default function WelcomeToBusinessSection() {
	return (
		<div className='hidden lg:col-span-1 lg:w-full md:block w-1/2 pt-2'>
			<h2 className='h1 text-text-foreground mb-4 mx-2'>
				Welcome To Business Without Borders!
			</h2>
			<Image src={LoginImage} alt='Checkout' className='w-full' />
		</div>
	);
}
