import Translation from '@/app/components/translation'
import Image from 'next/image'
import smsVerification from '@/app/assets/profile-details/smsVerification.svg';
import emailVerification from '@/app/assets/profile-details/emailVerification.svg';
import { handleDisableEmailVerification, handleEmailVerification } from '@/app/lib/email-verification';


interface AuthentificationProps {
    isEmailConfirmed: boolean;
    userId: number | undefined;
    access_token: string | undefined;
    refetch: () => void;
    email: string | undefined;
    setIsOpenDialog: (isOpen: boolean) => void;
}

const Authentification = ({isEmailConfirmed, userId, access_token, refetch, email, setIsOpenDialog}: AuthentificationProps) => {
    return (
        <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-2 '>
                <h1 className='text-span'>
                    <Translation translationKey='login_security_authentification_title' />
                </h1>
                <p className='text-span-foreground'>
                    <Translation translationKey='login_security_authentification_desc' />
                </p>
            </div>
            <div className='flex flex-col md:flex-row md:justify-between gap-4 md:gap-0 text-sm '>
                <div className='flex items-center gap-5'>
                    <Image src={smsVerification} alt='sms-verification' />
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-span'>
                            <Translation translationKey='login_security_smsAuth_title' />
                        </h1>
                        <p className='text-span-foreground'>
                            <Translation translationKey='login_security_smsAuth_desc' />
                        </p>
                    </div>
                </div>
                <button className='px-4 py-2 border-2 rounded-md border-primary text-primary'>
                    <Translation translationKey='login_security_button_title' />
                </button>
            </div>
            <div className='flex flex-col md:flex-row md:justify-between gap-4 md:gap-0 text-sm'>
                <div className='flex items-center gap-5'>
                    <Image src={emailVerification} alt='sms-verification' />
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-span'>
                            <Translation translationKey='login_security_emailAuth_title' />
                        </h1>
                        <p className='text-span-foreground'>
                            <Translation translationKey='login_security_emailAuth_desc' />
                        </p>
                    </div>
                </div>
                {
                    isEmailConfirmed ? (
                        <button
                            onClick={() =>
                                handleDisableEmailVerification(userId, access_token, refetch)
                            }
                            className='px-4 py-2 border-2 rounded-md border-button text-button-text'>
                            <Translation translationKey='login_security_disablebutton_title' />
                        </button>
                    ) : (
                        <button
                            onClick={() =>
                                handleEmailVerification(email, setIsOpenDialog)
                            }
                            className='px-4 py-2 border-2 rounded-md border-primary text-primary'>
                            <Translation translationKey='login_security_button_title' />
                        </button>
                    )
                }

            </div>
        </div>
    )
}

export default Authentification