
import Image, { StaticImageData } from 'next/image'

const ProfileCard = ({ logo, title, description }: { logo: string | StaticImageData, title: string, description: string }) => {
    return (
        <div className='flex flex-col p-7 bg-background border gap-4 hover:shadow-md cursor-default group'>
            <div>
                <Image src={logo} alt='logo' className='group-hover:fill-primary' />
            </div>
            <h1 className='text-xl'>{title}</h1>
            <p className='text-span'>{description}</p>
        </div>
    )
}

export default ProfileCard
