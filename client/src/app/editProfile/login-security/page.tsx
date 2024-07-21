"use client"

import { Input } from '../../register/components/input'
import { useRegisterForm } from '../../lib/register-form'
import "react-phone-input-2/lib/style.css";
import save from '@/app/assets/profile-details/save.svg'
import Image from 'next/image'
import smsVerification from '@/app/assets/profile-details/smsVerification.svg'
import emailVerification from '@/app/assets/profile-details/emailVerification.svg'
import Layout from '../Layout';
import Translation from '@/app/components/translation';

const Page = () => {

    const formik = useRegisterForm()

    return (
        <Layout>
            <div className='flex flex-col p-4 px-6 gap-3 bg-background border'>
                <h1 className='font-bold'>
                    <Translation translationKey='login_security_header' />
                </h1>
                <form action="">
                    <div className='flex flex-col py-6 gap-8 border-b'>
                        <h1 className='text-span font-semibold'>
                            <Translation translationKey='login_security_password' />
                        </h1>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="relative w-full">
                                <Input
                                    type={"password"}
                                    labelKey="register_password_label"
                                    value={formik.values.password}
                                    name="password"
                                    handleChange={formik.handleChange}
                                    touched={formik.touched.password}
                                    errors={formik.errors.password}
                                    formik={formik}
                                />

                            </div>
                            <div className="relative w-full">
                                <Input
                                    type={"password"}
                                    labelKey="register_confirm_password_label"
                                    value={formik.values.confirmPassword}
                                    name="confirmPassword"
                                    handleChange={formik.handleChange}
                                    touched={formik.touched.confirmPassword}
                                    errors={formik.errors.confirmPassword}
                                    formik={formik}
                                />
                            </div>
                        </div>
                        <div className='flex md:justify-end'>
                            <button className='flex w-full md:w-auto gap-2 bg-button p-4 rounded-md text-background justify-center md:justify-end  transition-all duration-300'>
                                <Image src={save} alt='save-changes' />
                                <Translation translationKey='profile_details_saving_button' />
                            </button>
                        </div>
                    </div>

                </form>
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
                        <button className='px-4 py-2 border-2 rounded-md border-primary text-primary'>
                            <Translation translationKey='login_security_button_title' />
                        </button>

                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Page;