'use client'

import Container from '@/app/components/Container';
import ImageInput from '@/app/owner/locations/components/imageInput';
import React, { useState } from 'react';
import BodyCard from '../../components/BodyCard';
import SendeLogo from '@/app/assets/owner/users/email/send.svg';
import SheduleLogo from '@/app/assets/owner/users/email/shedule.svg';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const INFOCARD_FORM = [
    { label: 'from', placeholder: 'ZainSpot Support' },
    { label: 'To', placeholder: 'John Doe' },
    { label: 'CC', placeholder: '---' },
    { label: 'BCC', placeholder: '---' },
    { label: 'Subject', placeholder: '---' },
];

const InfoCard = ({ fullname }: { fullname: string }) => {
    return (
        <div className='col-span-3 flex flex-col p-8 gap-4 bg-background border'>
            {
                INFOCARD_FORM.map((item, key) => (
                    <div key={key} className='grid grid-cols-7 items-center'>
                        <label htmlFor={item.label} className='text-sm text-span col-span-2'>{item.label}</label>
                        <input
                            type="text"
                            name={item.label}
                            id={item.label}
                            placeholder={item.label === 'To' ? fullname : item.placeholder}
                            className='border p-2 text-sm rounded-md w-full col-span-5' />
                    </div>
                ))
            }
        </div>
    )
}

const AttachmentCard = ({ attachment, setAttachment }: { attachment: string | undefined, setAttachment: (attachment: string | undefined) => void }) => {
    const handleFileSelect = (file: File | null) => {
        if (file) {
            setAttachment(URL.createObjectURL(file));
        } else {
            setAttachment(undefined);
        }
    };
    return (
        <div className='col-span-2 flex flex-col p-8 gap-2 border bg-background h-full'>
            <div className='flex justify-between  text-span px-6'>
                <h1 className='text-semibold-18 font-semibold'>Attachments (0)</h1>
                <p className='text-xl'>+</p>
            </div>
            <ImageInput
                value={attachment as string}
                onFileSelect={handleFileSelect}
            />
        </div>
    )
}

const Email = () => {
    const searchParams = useSearchParams();
    const fullname = searchParams.get('fullname') || 'Unknown User';
    const userId = searchParams.get('id');

    const [attachment, setAttachment] = useState<string | undefined>(undefined);

    return (
        <Container
            breadcrumbItems={[
                { label: 'ownerPage_header', href: '/owner' },
                { label: 'users', href: '/owner/users' },
                { label: fullname, href: `/owner/users/${userId}` },
                { label: 'Send Email' },
            ]}
            className='px-12'
        >
            <div className='flex flex-col gap-4 px-6'>
                <div className='flex gap-6 items-center'>
                    <h1 className='text-semibold-24 font-semibold text-span'>New Email</h1>
                    <p className='bg-span-background py-1 px-3 rounded-full text-sm text-span-foreground'>Unsaved</p>
                </div>
                <div className='grid grid-cols-5 gap-4'>
                    <InfoCard fullname={fullname} />
                    <AttachmentCard attachment={attachment} setAttachment={setAttachment} />
                </div>
                <div>
                    <BodyCard />
                </div>
                <div className='flex gap-3 justify-end'>
                    <button className='px-4 py-2 rounded-md border-2 border-button-gray text-button-gray text-sm'>
                        CANCEL
                    </button>
                    <button className='flex gap-2 justify-center items-center px-4 py-2 rounded-md border-2 border-primary text-primary text-sm'>
                        <Image src={SheduleLogo} alt='shedule-logo' className='w-4' />
                        SCHEDULE
                    </button>
                    <button className='flex gap-2 justify-center items-center px-4 py-2 rounded-md border-2 border-primary text-background bg-primary text-sm'>
                        <Image src={SendeLogo} alt='send-logo' className='w-4' />
                        SEND
                    </button>
                </div>
            </div>
        </Container>
    )
}

export default Email;
