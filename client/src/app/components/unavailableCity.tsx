import Image from 'next/image';
import Translation from './translation';
interface City {
	id: number;
	city: string;
	imageUrl: string;
}
const UnavailableCity = ({ city }: { city: City }) => {
	return (
		<div className=' flex bg-secondary-foreground gap-4 items-center '>
			<div className='w-44 h-40 relative'>
				<Image
					src={city.imageUrl}
					alt={city.city}
					layout='fill'
					objectFit='cover'
					sizes='100%'
				/>
			</div>
			<div className='flex flex-col gap-2'>
				<h1 className='font-semibold font-sans text-text-foreground'>
					{city.city}
				</h1>
				<p className='text-primary font-sans font-medium text-sm'>
					<Translation translationKey='citypage_unavailable_city' />
				</p>
			</div>
		</div>
	);
};

export default UnavailableCity;
