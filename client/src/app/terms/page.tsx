import React from 'react'
import Container from '../components/Container'

interface Description {
    item: string;
    desc: string;
    cnt?: string[];
}

interface Mission {
    title: string;
    description: string | Description[];
}

const missions: Mission[] = [
    {
        title: 'Acceptance of Terms',
        description: 'By accessing and using the ZainSpot website and services, you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.'
    },
    {
        title: 'Eligibility',
        description: 'You must be at least 18 years old to use our services. By using our services, you confirm that you meet this requirement and have the legal authority to enter into this agreement.'
    },
    {
        title: 'Account Registration',
        description: 'To access certain features of our services, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to keep your account information updated.'
    },
    {
        title: 'Use of Services',
        description: [
            { item: 'Permitted Use:', desc: 'You are granted a limited, non-exclusive, non-transferable, and revocable license to use our services for lawful purposes only. You agree not to use our services for any illegal or unauthorized purpose.' },
            {
                item: 'Prohibited Use:', desc: 'You agree not to use ZainSpot for activities that could harm the service, other users, or third parties, including but not limited to:',
                cnt: ["Spamming or harassing others.", "Attempting to hack or interfere with our systems.", "Using the service to distribute harmful or illegal content."]
            }
        ]
    },
    {
        title: 'Subscription Plans and Payment',
        description: [
            { item: 'Plan Selection:', desc: 'ZainSpot offers various subscription plans. You agree to pay all fees associated with the plan you select.' },
            { item: 'Billing:', desc: 'Payments are due at the start of each billing cycle, and you authorize ZainSpot to charge your chosen payment method for the applicable fees.' },
            { item: 'Cancellations and Refunds:', desc: `Subscription cancellations must be made before the next billing cycle. Refunds are provided at ZainSpot s discretion and as outlined in our refund policy.` }
        ]
    },
    {
        title: 'Privacy',
        description: 'Your use of our services is also governed by our Privacy Policy, which describes how we collect, use, and protect your information. By using our services, you agree to the terms of our Privacy Policy.'
    },
    {
        title: 'Intellectual Property',
        description: 'All content and materials on the ZainSpot website, including text, graphics, logos, and software, are the intellectual property of ZainSpot or its licensors and are protected by copyright and other laws. You may not reproduce, distribute, or create derivative works from this content without our prior written consent.'
    },
    {
        title: 'Termination',
        description: 'ZainSpot reserves the right to terminate or suspend your account and access to our services at any time, with or without cause or notice. Upon termination, your right to use the services will immediately cease.'
    },
    {
        title: 'Limitation of Liability',
        description: 'To the fullest extent permitted by law, ZainSpot shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services. Our total liability to you for any claims arising from the use of our services is limited to the amount paid by you to ZainSpot in the 12 months preceding the claim.'
    },
    {
        title: 'Modifications to Terms',
        description: 'ZainSpot reserves the right to modify these Terms of Use at any time. We will notify users of significant changes via email or through our website. Continued use of the services after any changes have been made constitutes acceptance of the new terms.'
    },
    {
        title: 'Governing Law',
        description: 'These Terms of Use are governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law principles. Any disputes arising from these terms will be resolved in the courts.'
    },
    {
        title: 'Contact Information',
        description: 'For any questions or concerns regarding these Terms of Use, please contact us at example@mail.com'
    }
]

export default function TermsOfUse() {
    return (
        <Container
            breadcrumbItems={[
                { label: 'breadcrumb_home', href: '/' },
                { label: 'footer_title_termsofuse' },
            ]}
            withPaddingBottom={false}
        >
            <div className='flex flex-col gap-12'>
                <div className='flex flex-col justify-center items-center gap-3'>
                    <h1 className='font-bold text-3xl'>Terms of Use</h1>
                    <p className='text-span font-light text-sm font-regular text-center'>
                        Effective: January 31, 2024
                    </p>
                </div>

                <div className='bg-background pt-8 px-5 md:px-[300px]  pb-20 flex flex-col gap-10 text-sm '>
                    <ol className='list-decimal pl-6 flex flex-col gap-7'>
                        {missions.map((mission, index) => (
                            <li key={index} className='text-semibold-24 '>
                                <h1 className='font-semibold pb-3 leading-[27px]'>{mission.title}</h1>
                                {typeof mission.description === 'string' ? (
                                    <p className='font-regular text-sm text-span font-light leading-[27px]'
                                        style={{ wordSpacing: '0.1em', textAlign: 'justify' }}
                                    >
                                        {mission.description}
                                    </p>
                                ) : (
                                    <ul className='list-disc list-inside flex flex-col gap-2 text-sm'>
                                        {mission.description.map((item, itemIndex) => (
                                            <li key={itemIndex} className='text-text'>
                                                <strong>{item.item}</strong>
                                                <span className='font-light text-span leading-[27px]' style={{ wordSpacing: '0.1em', textAlign: 'justify' }}>
                                                    {item.desc}
                                                </span>

                                                {item.cnt && (
                                                    <ul className='list-disc list-inside pl-6'>
                                                        {item.cnt.map((cntItem, cntIndex) => (
                                                            <li key={cntIndex} className='font-light text-span leading-[27px]'>
                                                                {cntItem}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </Container>
    )
}


