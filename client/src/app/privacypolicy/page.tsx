import React from 'react'
import Container from '../components/Container'

interface Description {
    item: string;
    desc: string;
}

interface Mission {
    title: string;
    description: string | Description[];
}

const missions: Mission[] = [
    {
        title: 'Introduction',
        description: 'ZainSpot ("we," "our," "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website and services. By accessing or using our services, you agree to the terms of this Privacy Policy.'
    },
    {
        title: 'Information We Collect',
        description: [
            { item: 'Personal Information:', desc: 'We collect information that can identify you, such as your name, email address, phone number, mailing address, and payment information, when you register for an account, subscribe to a plan, or contact us.' },
            { item: 'Non-Personal Information:', desc: 'We collect non-identifiable information such as IP addresses, browser types, and usage data to help us understand how our services are being used and to improve our offerings.' }
        ]
    },
    {
        title: 'How We Use Your Information',
        description: [
            { item: 'To Provide Services:', desc: 'We use your personal information to set up your account, process payments, manage subscriptions, and deliver the services you’ve requested.' },
            { item: 'To Communicate with You:', desc: 'We may use your information to send you important updates, newsletters, marketing communications, and customer service responses.' },
            { item: 'To Improve Our Services:', desc: 'We analyze usage data to understand user behavior, enhance our platform, and develop new features.' },
            { item: 'To Ensure Security:', desc: 'We use your information to detect and prevent fraud, abuse, and security risks.' }
        ]
    },
    {
        title: 'Sharing Your Information',
        description: [
            { item: 'Service Providers:', desc: 'We may share your information with third-party service providers who assist us in delivering our services (e.g., payment processors, email services). These providers are obligated to protect your information and use it only for the purposes we specify.' },
            {item: 'Legal Compliance:', desc: 'We may disclose your information if required to do so by law or in response to legal processes, such as a court order or subpoena.'},
            {item: 'Business Transfers:', desc: 'In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction.'}
        ]
    },
    {
        title: 'Cookies and Tracking Technologies',
        description: [
            { item: 'Cookies:', desc: 'We use cookies and similar technologies to track your activity on our website and enhance your user experience. You can control cookie preferences through your browser settings, but disabling cookies may limit some functionalities of our services.' },
            { item: 'Analytics:', desc: 'We use third-party analytics tools to analyze website traffic and usage. These tools collect information such as the pages you visit, the time spent on each page, and the links you click.' }
        ]
    },
    {
        title: 'Data Security',
        description: 'We implement industry-standard security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. Despite these measures, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.'
    },
    {
        title: 'Data Retention',
        description: 'We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, including any legal, accounting, or reporting requirements. If you close your account, we may retain your information as required by law or for legitimate business purposes.'
    },
    {
        title: 'Your Rights and Choices',
        description: [
            {item: 'Access and Update:', desc:'You can access and update your personal information through your account settings. If you need assistance, contact our customer support team.'},
            {item: 'Opt-Out:', desc:'You can opt-out of receiving marketing communications by following the unsubscribe link in our emails. Please note that you may still receive non-marketing communications related to your account or services.'},
            {item: 'Data Deletion:', desc:'You can request the deletion of your personal information by contacting us. We will comply with your request unless we are required to retain the information for legal or legitimate business purposes.'},
        ]
    },
    {
        title: 'International Users',
        description: 'If you are accessing our services from outside of [Your Country], please be aware that your information may be transferred to, stored, and processed in [Your Country] or other countries where our servers or third-party service providers are located. By using our services, you consent to such transfers.'
    },
    {
        title: "Children's Privacy",
        description: 'Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take steps to delete that information.'
    },
    {
        title: 'Changes to This Privacy Policy',
        description: 'We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any significant changes by posting the new policy on our website and updating the effective date. Your continued use of our services after the changes take effect constitutes your acceptance of the revised policy.'
    },
    {
        title: 'Contact Us',
        description: 'For any questions or concerns regarding these Terms of Use, please contact us at example@mail.com'
    }
]

export default function PrivacyPolicy() {
    return (
        <Container
            breadcrumbItems={[
                { label: 'breadcrumb_home', href: '/' },
                { label: 'footer_title_privacypolicy' },
            ]}
            withPaddingBottom={false}
        >
            <div className='flex flex-col gap-12'>
                <div className='flex flex-col justify-center items-center gap-3'>
                    <h1 className='font-bold text-3xl'>Privacy Policy</h1>
                    <p className='text-span font-light text-sm font-regular text-center'>
                        Effective: January 31, 2024
                    </p>
                </div>

                <div className='bg-background pt-8 px-5 md:px-[300px] pb-20 flex flex-col gap-10 text-sm '>
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
                                                <span className='font-light text-span leading-[27px] pl-2' style={{ wordSpacing: '0.1em', textAlign: 'justify' }}>
                                                    {item.desc}
                                                </span>
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


