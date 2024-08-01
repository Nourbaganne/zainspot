import Image from 'next/image'
import Translation from './translation'
import save from '@/app/assets/profile-details/save.svg'


const SaveChangesButton = () => {
    return (
        <div className='flex md:justify-end'>
            <button type='submit' className='flex w-full md:w-auto gap-2 bg-button p-4 rounded-md text-background justify-center md:justify-end  transition-all duration-300'>
                <Image src={save} alt='save-changes' />
                <Translation translationKey='profile_details_saving_button' />
            </button>
        </div>
    )
}

export default SaveChangesButton