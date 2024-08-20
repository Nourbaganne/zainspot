import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Translation from '@/app/components/translation';

const ProfileCard = ({ logo, hoverLogo, title, description }: { logo: string | StaticImageData, hoverLogo: string | StaticImageData, title: string, description: string }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className='flex flex-col p-7 bg-background border gap-4 hover:shadow-md group cursor-pointer w-full'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className=' stroke-cyan-500'>
                <Image src={isHovered ? hoverLogo : logo} alt='logo' className='stroke-cyan-500' />
            </div>
            <h1 className='text-xl font-bold'>
                <Translation translationKey={title} />
            </h1>
            <p className='text-span'>
                <Translation translationKey={description} />
            </p>
        </div>
    );
};

export default ProfileCard;
