import React from 'react'
import Container from '../components/Container'
import Translation from '../components/translation'

interface Cnt {
    title: string;
    desc: string;
}

interface Desc {
    title: string | string[];
    cnt: Cnt[];
}

interface AlphList {
    title?: string;
    desc?: string[];
}

interface Description {
    item?: string;
    alphList?: AlphList;
}

interface Term {
    title: string;
    description: (string | Desc | Description)[];
}

const terms: Term[] = [
    {
        title: 'terms_def_title',
        description: [
            {
                title: 'terms_def_desc',
                cnt: [
                    { title: 'terms_def_desc_zainspot_title', desc: 'terms_def_desc_zainspot_desc' },
                    { title: 'terms_def_desc_adress_title', desc: 'terms_def_desc_adress_desc' },
                    { title: 'terms_def_desc_services_title', desc: 'terms_def_desc_services_desc' },
                    { title: 'terms_def_desc_customer_title', desc: 'terms_def_desc_customer_desc' },
                    { title: 'terms_def_desc_mail_title', desc: 'terms_def_desc_mail_desc' },
                ]
            }
        ]
    },
    {
        title: 'terms_contract_title',
        description: [
            "terms_contract_desc_customer",
            "terms_contract_desc_agreement",
            "terms_contract_desc_rights",
        ]
    },
    {
        title: 'terms_mail_title',
        description: [
            {
                title: 'terms_mail_desc_zainspot',
                cnt: [
                    { title: "terms_mail_desc_forwading_title", desc: "terms_mail_desc_forwading_desc" },
                    { title: "terms_mail_desc_collection_title", desc: "terms_mail_desc_collection_desc" },
                    { title: "terms_mail_desc_percels_title", desc: "terms_mail_desc_percels_desc" },
                ]
            },
        ]
    },
    {
        title: 'terms_tel_title',
        description: [
            'terms_tel_desc_numbers',
            'terms_tel_desc_right',
            'terms_tel_desc_claim',
        ]
    },
    {
        title: 'terms_customer_title',
        description: [
            { item: 'terms_customer_desc_warrants' },
            { item: 'terms_customer_desc_notif' },
            {
                alphList: {
                    title: 'terms_customer_desc_services',
                    desc: [
                        "terms_customer_desc_services_activities",
                        "terms_customer_desc_services_harasing",
                        "terms_customer_desc_services_percels",
                    ]
                }
            }
        ]

    },
    {
        title: 'terms_charges_title',
        description: [
            "terms_charges_desc_fees",
            "terms_charges_desc_rights",
            "terms_charges_desc_payment",
        ]
    },
    {
        title: 'terms_limitation_title',
        description: [
            { item: "terms_limitation_desc_fees" },
            {
                alphList: {
                    title: "terms_limitation_desc_liability",
                    desc: [
                        "terms_limitation_desc_liability_lost",
                        "terms_limitation_desc_liability_damages",
                        "terms_limitation_desc_liability_services",
                    ]
                }
            },
            {
                item: "terms_limitation_desc_correspondance"
            }
        ]
    },
    {
        title: 'terms_law_title',
        description: [
            "terms_law_desc_agreement",
            "terms_law_desc_disputes",
        ]
    },
]

const renderDescription = (
    description: (string | Desc | Description)[],
    prefix: string,
    counter: { value: number }
): JSX.Element[] => {
    let results: JSX.Element[] = [];

    description.forEach((item) => {
        const currentPrefix = `${prefix}${counter.value}`;
        counter.value += 1;

        if (typeof item === 'string') {
            results.push(
                <li key={currentPrefix} className="font-light text-span leading-[27px]">
                    {currentPrefix} <Translation translationKey={item} />
                </li>
            );
        } else if ('title' in item) {
            results.push(
                <li key={currentPrefix} className="font-light text-span leading-[27px]">
                    <span>
                        {currentPrefix}{' '}
                        {typeof item.title === 'string' ? (
                            <Translation translationKey={item.title} />
                        ) : (
                            item.title.map((tite, key) => (
                                <span key={key}>
                                    <Translation translationKey={tite} />
                                </span>
                            ))
                        )}
                    </span>

                    {item.cnt && Array.isArray(item.cnt) && (
                        <ol>
                            {item.cnt.map((cntItem, index) => {
                                const nestedPrefix = `${prefix}${counter.value}`;
                                counter.value += 1;

                                return (
                                    <li key={`${nestedPrefix}-${index}`}>
                                        <span className="font-semibold">
                                            {nestedPrefix} <Translation translationKey={cntItem.title} />
                                        </span>
                                        <Translation translationKey={cntItem.desc} />
                                    </li>
                                );
                            })}
                        </ol>
                    )}
                </li>
            );
        } else if ('item' in item) {
            results.push(
                <li key={currentPrefix} className="font-light text-span leading-[27px]">
                    {currentPrefix} <Translation translationKey={item.item} />
                </li>
            );
        }

        if (typeof item !== 'string' && 'alphList' in item) {
            results.push(
                <li key={currentPrefix} className="font-light text-span leading-[27px]">
                    <strong>
                        {currentPrefix} <Translation translationKey={item.alphList.title} />
                    </strong>
                    <ol className="pl-3">
                        {item.alphList.desc && item.alphList.desc.map((desc, descIndex) => (
                            <li key={descIndex} className="text-span">
                                <Translation translationKey={desc} />
                            </li>
                        ))}
                    </ol>
                </li>
            );
        }
    });

    return results;
};




export default function TermsOfUse() {
    return (
        <Container
            breadcrumbItems={[
                { label: 'breadcrumb_home', href: '/' },
                { label: 'footer_title_termsofuse' },
            ]}
            withPaddingBottom={false}
        >
            <div className="flex flex-col gap-12">
                <div className="flex flex-col justify-center items-center gap-3">
                    <h1 className="font-bold text-3xl text-primary">
                        <Translation translationKey="footer_title_termsofuse" />
                    </h1>
                    <p className="text-span font-light text-sm font-regular text-center">
                        <Translation translationKey="privacyPage_desc" />
                    </p>
                </div>

                <div className="bg-background pt-8 px-5 sm:px-[50px] md:px-[150px] xl:px-[300px] pb-20 flex flex-col gap-10 text-sm">
                    <p className="font-regular text-sm text-span font-light leading-[27px]">
                        <Translation translationKey="terms_introduction" />
                    </p>
                    <ol className="list-decimal pl-6 flex flex-col gap-7">
                        {terms.map((term, termIndex) => {
                            const counter = { value: 1 };
                            const currentPrefix = `${termIndex + 1}.`;

                            return (
                                <li key={termIndex} className="text-semibold-24 text-primary">
                                    <h1 className="font-semibold pb-3 leading-[27px]">
                                        <Translation translationKey={term.title} />
                                    </h1>
                                    <ol className="flex flex-col gap-2 text-sm">
                                        {renderDescription(term.description, currentPrefix, counter)}
                                    </ol>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </Container>
    );
}


