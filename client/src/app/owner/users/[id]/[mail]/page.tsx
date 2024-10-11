'use client'

import Container from '@/app/components/Container';
import React, { useState } from 'react';
import TextEditor from '../../components/BodyCard';
import SendeLogo from '@/app/assets/owner/users/email/send.svg';
import SheduleLogo from '@/app/assets/owner/users/email/shedule.svg';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import InfoCard from '../../components/infoCard';
import AttachmentCard from '../../components/attachmentCard';
import Translation from '@/app/components/translation';

interface Attachment {
    filename: string;
    content: string;
}

const Email = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || 'Unknown User';
    const userId = searchParams.get('id');
    const fullname = searchParams.get('fullname') || 'Unknown User';

    // State Management
    const [formData, setFormData] = useState({
        from: 'ZainSpot Support',
        to: email,
        cc: '',
        bcc: '',
        subject: '',
    });

    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const [body, setBody] = useState('');
    const [status, setStatus] = useState<{
        loading: boolean;
        message: string;
        error: boolean;
    }>({
        loading: false,
        message: '',
        error: false,
    });

    const handleSubmit = async () => {
        if (!formData.to || !formData.subject || !body) {
            setStatus({
                loading: false,
                message: 'Please fill in all required fields.',
                error: true,
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validateEmails = (emails: string) => {
            return emails.split(',').every(email => emailRegex.test(email.trim()));
        };

        if (formData.cc && !validateEmails(formData.cc)) {
            setStatus({
                loading: false,
                message: 'Please enter valid CC email addresses.',
                error: true,
            });
            return;
        }

        if (formData.bcc && !validateEmails(formData.bcc)) {
            setStatus({
                loading: false,
                message: 'Please enter valid BCC email addresses.',
                error: true,
            });
            return;
        }

        setStatus({ loading: true, message: '', error: false });
        try {
            const response = await fetch('http://localhost:3001/sendMail/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: formData.from !== 'ZainSpot Support' ? formData.from : undefined,
                    to: formData.to,
                    cc: formData.cc ? formData.cc.split(',').map(email => email.trim()) : undefined,
                    bcc: formData.bcc ? formData.bcc.split(',').map(email => email.trim()) : undefined,
                    subject: formData.subject,
                    text: body.replace(/<[^>]+>/g, ''),
                    html: body,
                    attachments: attachments.length > 0 ? attachments : undefined,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setStatus({ loading: false, message: result.message, error: false });
                setFormData({
                    from: 'ZainSpot Support',
                    to: email,
                    cc: '',
                    bcc: '',
                    subject: '',
                });
                setAttachments([]);
                setBody('');
            } else {
                setStatus({ loading: false, message: result.message, error: true });
            }
        } catch (error: any) {
            console.error('Error sending email:', error);
            setStatus({
                loading: false,
                message: error.message || 'Something went wrong',
                error: true,
            });
        }
    };

    return (
        <Container
            breadcrumbItems={[
                { label: 'ownerPage_header', href: '/owner' },
                { label: 'users', href: '/owner/users' },
                { label: fullname, href: `/owner/users/${userId}` },
                { label: 'sendMail_header' },
            ]}
            className='px-12'
        >
            <div className='flex flex-col gap-4 px-6'>
                <div className='flex gap-6 items-center'>
                    <h1 className='text-semibold-24 font-semibold text-span'>New Email</h1>
                    <p className='bg-span-background py-1 px-3 rounded-full text-sm text-span-foreground'>
                        <Translation translationKey={status.loading ? 'mailform_status_sending' : status.error ? 'mailform_status_error' : 'mailform_status'} />
                    </p>
                </div>
                {status.message && (
                    <div
                        className={`p-4 rounded ${status.error
                            ? 'bg-red-100 text-red-700'
                            : 'bg-green-100 text-green-700'
                            }`}
                    >
                        {status.message}
                    </div>
                )}
                <div className='grid grid-cols-5 gap-4'>
                    <InfoCard formData={formData} setFormData={setFormData} fullname={email} />
                    <AttachmentCard
                        attachments={attachments}
                        setAttachments={setAttachments}
                    />
                </div>
                <div>
                    <TextEditor body={body} setBody={setBody} />
                </div>
                <div className='flex gap-3 justify-end'>
                    <button
                        onClick={() => {
                            setFormData({
                                from: 'ZainSpot Support',
                                to: email,
                                cc: '',
                                bcc: '',
                                subject: '',
                            });
                            setAttachments([]);
                            setBody('');
                            setStatus({ loading: false, message: '', error: false });
                        }}
                        className='px-4 py-2 rounded-md border-2 border-button-gray text-button-gray text-sm'
                    >
                        <Translation translationKey='cancellation_btn' />
                    </button>
                    <button
                        onClick={() => {

                            setStatus({
                                loading: false,
                                message: 'Scheduling feature not implemented yet',
                                error: false,
                            });
                        }}
                        className='flex gap-2 justify-center items-center px-4 py-2 rounded-md border-2 border-primary text-primary text-sm'
                    >
                        <Image src={SheduleLogo} alt='schedule-logo' className='w-4' />
                        <Translation translationKey='schedule_btn' />
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={status.loading}
                        className='flex gap-2 justify-center items-center px-4 py-2 rounded-md border-2 border-primary text-background bg-primary text-sm'
                    >
                        <Image src={SendeLogo} alt='send-logo' className='w-4' />
                        <Translation translationKey='send_btn' />
                    </button>
                </div>
            </div>
        </Container>
    );
};

export default Email;
