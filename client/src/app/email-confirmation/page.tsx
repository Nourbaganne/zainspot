"use client";

import { Suspense, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { AuthContext } from '../contexts/authContext';
import Link from 'next/link';
import returnIcon from '@/app/assets/email-confirmation/returnIcon.svg';
import Image from 'next/image';
import axiosInstance from '../lib/axios/axiosInstance';

const EmailConfirmation = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [message, setMessage] = useState('Confirming email...');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const confirmEmail = async () => {
            if (token) {
                try {
                    const response = await axiosInstance.get(`/email-confirmation?token=${token}`);
                    setMessage('Email confirmed successfully!');
                } catch (error) {
                    setMessage('Failed to confirm email.');
                }
            }
        };

        confirmEmail();
    }, [token]);

    return (
        <Suspense>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col gap-5 max-w-sm w-full ">
                    {user ? (
                        <Link href="/zainspotter" className='flex gap-2 text-sm text-text-foreground hover:underline'>
                            <Image src={returnIcon} alt='return-icon' height={10} />
                            return to zainspotter
                        </Link>
                    ) :
                        <Link href="/login" className='flex gap-2 text-sm text-text-foreground hover:underline'>
                            <Image src={returnIcon} alt='return-icon' />
                            return to login page
                        </Link>
                    }
                    <h1 className="text-2xl font-bold  text-primary text-center">Email Confirmation</h1>
                    <p className="text-lg text-center">{message}</p>
                </div>
            </div>
        </Suspense>
    );
};

export default EmailConfirmation;
