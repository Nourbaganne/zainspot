import React from 'react'
import Container from '../components/Container'
import Translation from '../components/translation';

interface Description {
    item: string;
    desc: string;
    cnt?: string[];
}

interface Term {
    title: string;
    description: string | Description[];
}

const terms: Term[] = [
    {
        title: 'terms_acceptance_title',
        description: 'terms_acceptance_desc'
    },
    {
        title: 'terms_eligibility_title',
        description: 'terms_eligibility_desc'
    },
    {
        title: 'terms_registration_title',
        description: 'terms_registration_desc'
    },
    {
        title: 'terms_services_title',
        description: [
            { item: 'terms_services_permittedUse_title', desc: 'terms_services_permittedUse_desc' },
            {
                item: 'terms_services_prohibitedUse_title', desc: 'terms_services_prohibitedUse_desc',
                cnt: ["terms_services_prohibitedUse_spamming", "terms_services_prohibitedUse_attempting", "terms_services_prohibitedUse_content"]
            }
        ]
    },
    {
        title: 'terms_subscription_title',
        description: [
            { item: 'terms_subscription_plan_title', desc: 'terms_subscription_plan_desc' },
            { item: 'terms_subscription_billing_title', desc: 'terms_subscription_billing_desc' },
            { item: 'terms_subscription_cancellation_title', desc: 'terms_subscription_cancellation_desc' }
        ]
    },
    {
        title: 'terms_privacy_title',
        description: 'terms_privacy_desc'
    },
    {
        title: 'terms_property_title',
        description: 'terms_property_desc'
    },
    {
        title: 'terms_termination_title',
        description: 'terms_termination_desc'
    },
    {
        title: 'terms_limitation_title',
        description: 'terms_limitation_desc'
    },
    {
        title: 'terms_modification_title',
        description: 'terms_modification_desc'
    },
    {
        title: 'terms_law_title',
        description: 'terms_law_desc'
    },
    {
        title: 'terms_contact_title',
        description: 'terms_contact_desc'
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

                <div className='bg-background pt-8 px-5 sm:px-[50px] md:px-[150px] xl:px-[300px]  pb-20 flex flex-col gap-10 text-sm '>
                    <ol className='list-decimal pl-6 flex flex-col gap-7'>
                        {terms.map((term, index) => (
                            <li key={index} className='text-semibold-24 '>
                                <h1 className='font-semibold pb-3 leading-[27px]'>
                                    <Translation translationKey={term.title} /> </h1>
                                {typeof term.description === 'string' ? (
                                    <p className='font-regular text-sm text-span font-light leading-[27px]'
                                        style={{ wordSpacing: '0.1em', textAlign: 'justify' }}
                                    >
                                        <Translation translationKey={term.description} />
                                    </p>
                                ) : (
                                    <ul className='list-disc list-inside flex flex-col gap-2 text-sm'>
                                        {term.description.map((item, itemIndex) => (
                                            <li key={itemIndex} className='text-text'>
                                                <strong>
                                                    <Translation translationKey={item.item} />
                                                </strong>
                                                <span className='font-light text-span leading-[27px]' style={{ wordSpacing: '0.1em', textAlign: 'justify' }}>
                                                 <Translation translationKey={item.desc} />  
                                                </span>

                                                {item.cnt && (
                                                    <ul className='list-disc list-inside pl-6'>
                                                        {item.cnt.map((cntItem, cntIndex) => (
                                                            <li key={cntIndex} className='font-light text-span leading-[27px]'>
                                                               <Translation translationKey={cntItem} />
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


