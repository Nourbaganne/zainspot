import React from 'react'
import Container from '../components/Container'
import Translation from '../components/translation';

interface Description {
    item: string;
    desc: string;
}

interface Privacy {
    title: string;
    description: string | Description[];
}

const privacies: Privacy[] = [
    {
        title: 'privacies_introduction_title',
        description: 'privacies_introduction_desc'
    },
    {
        title: 'privacies_info_title',
        description: [
            { item: 'privacies_personal_title', desc: 'privacies_personal_desc' },
            { item: 'privacies_nonPersonal_title', desc: 'privacies_nonPersonal_desc' }
        ]
    },
    {
        title: 'privacies_useInfo_title',
        description: [
            { item: 'privacies_useInfo_provideServices_title', desc: 'privacies_useInfo_provideServices_desc' },
            { item: 'privacies_useInfo_comunication_title', desc: 'privacies_useInfo_comunication_desc' },
            { item: 'privacies_useInfo_improveServices_title', desc: 'privacies_useInfo_improveServices_desc' },
            { item: 'privacies_useInfo_security_title', desc: 'privacies_useInfo_security_desc' }
        ]
    },
    {
        title: 'privacies_sharingInfo_title',
        description: [
            { item: 'privacies_sharingInfo_services_title', desc: 'privacies_sharingInfo_services_desc' },
            { item: 'privacies_sharingInfo_compliance_title', desc: 'privacies_sharingInfo_compliance_desc' },
            { item: 'privacies_sharingInfo_business_title', desc: 'privacies_sharingInfo_business_desc' }
        ]
    },
    {
        title: 'privacies_cookies_title',
        description: [
            { item: 'privacies_cookies_cookie_title', desc: 'privacies_cookies_cookie_desc' },
            { item: 'privacies_cookies_analytics_title', desc: 'privacies_cookies_analytics_desc' }
        ]
    },
    {
        title: 'privacies_security_title',
        description: 'privacies_security_desc'
    },
    {
        title: 'privacies_retention_title',
        description: 'privacies_retention_desc'
    },
    {
        title: 'privacies_rights_title',
        description: [
            { item: 'privacies_rights_access_title', desc: 'privacies_rights_access_desc' },
            { item: 'privacies_rights_optOut_title', desc: 'privacies_rights_optOut_desc' },
            { item: 'privacies_rights_deletioln_title', desc: 'privacies_rights_deletioln_desc' },
        ]
    },
    {
        title: 'privacies_internationalUsers_title',
        description: 'privacies_internationalUsers_desc'
    },
    {
        title: "privacies_children_title",
        description: 'privacies_children_desc'
    },
    {
        title: 'privacies_changes_title',
        description: 'privacies_changes_desc'
    },
    {
        title: 'privacies_contact_title',
        description: 'privacies_contact_desc'
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
                    <h1 className='font-bold text-3xl'>
                        <Translation translationKey='privacyPage_header' />
                    </h1>
                    <p className='text-span font-light text-sm font-regular text-center'>
                        <Translation translationKey='privacyPage_desc' />
                    </p>
                </div>

                <div className='bg-background pt-8 px-5 sm:px-[50px] md:px-[150px] xl:px-[300px] pb-20 flex flex-col gap-10 text-sm '>
                    <ol className='list-decimal pl-6 flex flex-col gap-7'>
                        {privacies.map((privacy, index) => (
                            <li key={index} className='text-semibold-24 text-primary '>
                                <h1 className='font-semibold pb-3 leading-[27px]'>
                                    <Translation translationKey={privacy.title} />
                                </h1>
                                {typeof privacy.description === 'string' ? (
                                    <p className='font-regular text-sm text-span font-light leading-[27px]'
                                        style={{ wordSpacing: '0.1em', textAlign: 'justify' }}
                                    >
                                        <Translation translationKey={privacy.description} />
                                    </p>
                                ) : (
                                    <ul className='list-disc list-inside flex flex-col gap-2 text-sm'>
                                        {privacy.description.map((item, itemIndex) => (
                                            <li key={itemIndex} className='text-text'>
                                                <strong>
                                                    <Translation translationKey={item.item} />
                                                </strong>
                                                <span className='font-light text-span leading-[27px] pl-2' style={{ wordSpacing: '0.1em', textAlign: 'justify' }}>
                                                    <Translation translationKey={item.desc} />
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


