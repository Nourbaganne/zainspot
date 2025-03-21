import Translation from '@/app/components/translation'
import Image from 'next/image'
import smsVerification from '@/app/assets/profile-details/smsVerification.svg';
import emailVerification from '@/app/assets/profile-details/emailVerification.svg';
import toast from 'react-hot-toast';
import axiosInstance from '@/app/lib/axios/axiosInstance';


interface AuthentificationProps {
    isEmailAuthenticated: boolean;
    isEmailConfirmed: boolean;
    userId: number | undefined;
    access_token: string | undefined;
    refetch: () => void;
    email: string | undefined;
}

const Authentification = ({ isEmailAuthenticated, isEmailConfirmed, userId, access_token, refetch, email }: AuthentificationProps) => {

    const handle2FactorEmailActivation = async () => {
        try {
            const toastId = toast.loading('Processing...');

            if (isEmailConfirmed) {
                const response = await axiosInstance.patch(`/user/${userId}/2FactorEmailActivation`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                });

                if (response.status === 200) {
                    if (isEmailAuthenticated === true) {
                        toast.success("User Desactivated Succeffully", { id: toastId });
                    } else {
                        toast.success("User Activated Succeffully", { id: toastId });
                    }
                    refetch()
                }
            }else{
                toast.error('You should activate your Email first!', {id: toastId})
            }

        } catch (error) {
            toast.error(error as string);
            console.log("error: ", error)
        }
    }

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
                    isEmailAuthenticated ? (
                        <button
                            onClick={handle2FactorEmailActivation}
                            className='px-4 py-2 border-2 rounded-md border-button text-button-text'>
                            <Translation translationKey='login_security_disablebutton_title' />
                        </button>
                    ) : (
                        <button
                            onClick={handle2FactorEmailActivation}
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