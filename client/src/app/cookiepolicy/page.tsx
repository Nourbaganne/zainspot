import React from 'react';
import Container from '../components/Container';
import Translation from '../components/translation';

interface Lst {
    subtitle: string;
    desc: string;
}

interface Description {
    item: string;
    desc: string;
}

interface Privacy {
    title: string;
    description: string[] | Lst[] | Description[];
}

const privacies: Privacy[] = [
    {
        title: 'cookie_zainspot_title',
        description: ['cookie_zainspot_desc'],
    },
    {
        title: 'cookie_disabling_title',
        description: ['cookie_disabling_desc', 'cookie_disabling_desc'],
    },
    {
        title: 'cookie_uses_title',
        description: [
            { subtitle: 'cookie_uses_account_title', desc: 'cookie_uses_account_desc' },
            { subtitle: 'cookie_uses_login_title', desc: 'cookie_uses_login_desc' },
            { subtitle: 'cookie_uses_email_title', desc: 'cookie_uses_email_desc' },
            { subtitle: 'cookie_uses_form_title', desc: 'cookie_uses_form_desc' },
        ],
    },
    {
        title: 'cookie_types_title',
        description: [
            { item: 'cookie_types_essential_title', desc: 'cookie_types_essential_desc' },
            { item: 'cookie_types_analytics_title', desc: 'cookie_types_analytics_desc' },
            { item: 'cookie_types_marketing_title', desc: 'cookie_types_marketing_desc' },
            { item: 'cookie_types_personalization_title', desc: 'cookie_types_personalization_desc' },
        ],
    },
];

export default function PrivacyPolicy() {
    const renderDescription = (description: Privacy['description']) => {
        if (Array.isArray(description)) {
            if (typeof description[0] === 'string') {
                return description.map((desc, index) => (
                    <p key={index} className="font-light text-span leading-[27px] pl-2">
                        <Translation translationKey={desc as string} />
                    </p>
                ));
            } else if ('subtitle' in description[0]) {
                return (
                    <ol className="list-decimal list-outside pl-7 ">
                        {description.map((item, index) => (
                            <li key={index} className="text-primary text-lg font-medium pb-2">
                                <h2>
                                    <Translation translationKey={(item as Lst).subtitle} />
                                </h2>
                                <p className='font-light text-sm text-span leading-[27px]'>
                                    <Translation translationKey={(item as Lst).desc} />
                                </p>
                            </li>
                        ))}
                    </ol>
                );
            } else if ('item' in description[0]) {
                return (
                    <ul className="pl-3">
                        {description.map((item, index) => (
                            <li key={index} className="flex flex-col gap-1 pb-2">
                                <h2 className="text-primary text-lg font-medium">
                                    <Translation translationKey={(item as Description).item} />
                                </h2>
                                <p className='font-light text-span leading-[27px]'>
                                    <Translation translationKey={(item as Description).desc} />
                                </p>
                            </li>
                        ))}
                    </ul>
                );
            }
        }
        return null;
    };

    return (
        <Container
            breadcrumbItems={[
                { label: 'breadcrumb_home', href: '/' },
                { label: 'cookie_header' },
            ]}
            withPaddingBottom={false}
        >
            <div className="flex flex-col gap-12">
                <div className="flex flex-col justify-center items-center gap-3">
                    <h1 className="font-bold text-3xl text-primary">
                        <Translation translationKey="cookie_header" />
                    </h1>
                    <p className="text-span font-light text-sm font-regular text-center">
                        <Translation translationKey="privacyPage_desc" />
                    </p>
                </div>

                <div className="bg-background pt-8 px-5 sm:px-[50px] md:px-[150px] xl:px-[300px] pb-20 flex flex-col gap-10 text-sm">
                    <ul className="pl-6 flex flex-col gap-7">
                        {privacies.map((privacy, index) => (
                            <li key={index} className="text-semibold-24 text-primary">
                                <h1 className="font-semibold pb-3 leading-[27px]">
                                    <Translation translationKey={privacy.title} />
                                </h1>
                                <div className="flex flex-col gap-2 text-sm">
                                    {renderDescription(privacy.description)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Container>
    );
}
