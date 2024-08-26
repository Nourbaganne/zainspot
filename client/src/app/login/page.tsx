"use client"

import React, { useState } from 'react'
import { Input } from '../register/components/input'
import loginImage from "@/app/assets/register/login-image.svg";
import { useLoginForm } from '../lib/login-form'
import Image from "next/image";
import Translation from '../components/translation';
import Link from 'next/link';
import { withNoAuth } from '../lib/withNoAuth';
import InputPassword from '../components/inputPassword';

const Page = () => {
    const [isError, setIsError] = useState("");



    const formik = useLoginForm(setIsError);

    return (
        <div className='md:grid md:grid-cols-2 pt-6 pb-32'>
            <div className='hidden md:flex flex-col gap-6'>
                <h1 className="text-3xl font-bold text-text-foreground px-8">
                    <Translation translationKey="registerpage_title" />
                </h1>
                <Image
                    src={loginImage}
                    alt="login image"
                />
            </div>
            <div className='flex flex-col gap-10 px-12 '>
                <h1 className="font-bold text-2xl md:text-3xl  text-primary">
                    Login to Your Secure ZainSpot Account
                </h1>
                <form onSubmit={formik.handleSubmit} className='flex flex-col gap-8'>
                    <Input
                        type="text"
                        labelKey="register_email_label"
                        value={formik.values.email}
                        name="email"
                        handleChange={formik.handleChange}
                        touched={formik.touched.email}
                        errors={formik.errors.email}
                        formik={formik}
                    />
                    <div className="relative w-full">
                        <InputPassword
                            labelKey="register_password_label"
                            value={formik.values.password}
                            name="password"
                            touched={formik.touched.password}
                            errors={formik.errors.password}
                            formik={formik}
                        />
                    </div>
                    <button className='bg-button text-background w-full rounded-md py-3 text-xl font-semibold'>
                        Login to Zainspot
                    </button>
                </form>
                {isError && (
                    <h1 className='text-center text-alert'>{isError}</h1>
                )}

                <div className='flex justify-center gap-1 text-sm md:text-base'>
                    <h1 className='text-text-foreground'>Don’t Have an Account?</h1>
                    <Link href="/register" className='text-primary underline hover:no-underline'>
                        Join ZainSpot
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default withNoAuth(Page); 
