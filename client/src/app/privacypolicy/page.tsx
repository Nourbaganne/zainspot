import React from 'react'
import Container from '../components/Container'
import Translation from '../components/translation';

interface Description {
    item?: string;
    cnt?: string[];
}

interface Privacy {
    title: string;
    description: Description[];
}

const privacies: Privacy[] = [
    {
        title: 'privaciy_collectedInfo_title',
        description: [
            { item: 'privaciy_collectedInfo_desc' },
            { cnt: ["privaciy_collectedInfo_desc_name", "privaciy_collectedInfo_desc_contact", "privaciy_collectedInfo_desc_info", "privaciy_collectedInfo_desc_business"] },
            { item: "privaciy_collectedInfo_desc2" }
        ]
    },
    {
        title: 'privaciy_useInfo_title',
        description: [
            { item: 'privaciy_useInfo_desc' },
            {
                cnt: [
                    'privaciy_useInfo_desc_record',
                    'privaciy_useInfo_desc_product',
                    'privaciy_useInfo_desc_email',
                    'privaciy_useInfo_desc_payment',
                ]
            }
        ]
    },
    {
        title: 'privaciy_security_title',
        description: [
            { item: 'privaciy_security_desc' },
        ]
    },
    {
        title: 'privaciy_cookies_title',
        description: [
            { item: 'privaciy_cookies_desc' },
            {
                cnt: [
                    'privaciy_cookies_desc_navigation',
                    'privaciy_cookies_des_webTraffic'
                ]
            },
            { item: 'privaciy_cookies_des2' }
        ]
    },
    {
        title: 'privaciy_law_title',
        description: [
            { item: 'privaciy_law_desc' },
        ]
    },
    {
        title: 'privaciy_transfers_title',
        description: [{ item: 'privaciy_transfers_desc' }]
    },
    {
        title: 'privaciy_links_title',
        description: [{ item: 'privaciy_links_desc' }]
    },
    {
        title: 'privaciy_choice_title',
        description: [
            { item: 'privaciy_choice_desc' },
        ]
    },
    {
        title: 'privaciy_controlling_title',
        description: [
            { item: 'privaciy_controlling_desc' },
            { item: 'privaciy_controlling_desc2' },
        ]
    },
    {
        title: "privaciy_right_title",
        description: [
            { item: 'privaciy_right_desc' },
        ]
    },
    {
        title: 'privaciy_contact_title',
        description: [
            { item: 'privaciy_contact_desc' }
        ]
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
                    <h1 className='font-bold text-3xl text-primary'>
                        <Translation translationKey='privacyPage_header' />
                    </h1>
                    <p className='text-span font-light text-sm font-regular text-center'>
                        <Translation translationKey='privacyPage_desc' />
                    </p>
                </div>

                <div className='bg-background pt-8 px-5 sm:px-[50px] md:px-[150px] xl:px-[300px] pb-20 flex flex-col gap-10 text-sm '>
                    <ul className='pl-6 flex flex-col gap-7'>
                        {privacies.map((privacy, index) => (
                            <li key={index} className='text-semibold-24 text-primary '>
                                <h1 className='font-semibold pb-3 leading-[27px]'>
                                    <Translation translationKey={privacy.title} />
                                </h1>
                                <div className='flex flex-col gap-2 text-sm'>
                                    {privacy.description.map((item, itemIndex) => (
                                        <div key={itemIndex} className='text-span'>
                                            <p className='font-light text-span leading-[27px] pl-2' style={{ wordSpacing: '0.1em', textAlign: 'justify' }}>
                                                <Translation translationKey={item.item} />
                                            </p>
                                            {
                                                item.cnt && (
                                                    <ul className='pl-7 list-disc list-inside'>
                                                        {item.cnt.map((cnt, key) => <li key={key}><Translation translationKey={cnt} /></li>)}
                                                    </ul>
                                                )
                                            }
                                        </div>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Container>
    )
}


