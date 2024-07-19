"use client"

import React, { useState } from 'react'
import { Input } from '../../register/components/input'
import { useRegisterForm } from '../../lib/register-form'
import "react-phone-input-2/lib/style.css";
import save from '@/app/assets/profile-details/save.svg'
import Image from 'next/image'
import smsVerification from '@/app/assets/profile-details/smsVerification.svg'
import emailVerification from '@/app/assets/profile-details/emailVerification.svg'
import Layout from '../Layout';

const Page = () => {

    const formik = useRegisterForm()

    return (
        <Layout>
            <div className='col-span-6 flex flex-col p-4 px-6 gap-3 bg-background border'>
                <h1 className='font-bold'>LOGIN & SECURITY</h1>
                <form action="">
                    <div className='flex flex-col py-6 gap-8 border-b'>
                        <h1 className='text-span font-semibold'>Password</h1>
                        <div className="flex gap-6">
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
                        <div className='flex justify-end'>
                            <button className='flex gap-2 bg-button p-4 rounded-md text-background justify-end  transition-all duration-300'>
                                <Image src={save} alt='save-changes' />
                                Save changes
                            </button>
                        </div>
                    </div>

                </form>
                <div className='flex flex-col gap-8'>
                    <div className='flex flex-col gap-2 '>
                        <h1 className='text-span'>Two-factor Authentication</h1>
                        <p className='text-span-foreground'>Select your preferred 2FA method</p>
                    </div>
                    <div className='flex justify-between text-sm '>
                        <div className='flex items-center gap-5'>
                            <Image src={smsVerification} alt='sms-verification' />
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-span'>SMS Authentification</h1>
                                <p className='text-span-foreground'>You will receive your authentication code by SMS to your account</p>
                            </div>
                        </div>
                        <button className='px-4 py-2 border-2 rounded-md border-primary text-primary'>
                            ENABLE
                        </button>

                    </div>
                    <div className='flex justify-between text-sm'>
                        <div className='flex items-center gap-5'>
                            <Image src={emailVerification} alt='sms-verification' />
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-span'>SMS Authentification</h1>
                                <p className='text-span-foreground'>You will receive your authentication code by SMS to your account</p>
                            </div>
                        </div>
                        <button className='px-4 py-2 border-2 rounded-md border-primary text-primary'>
                            ENABLE
                        </button>

                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Page