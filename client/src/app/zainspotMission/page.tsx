import React from 'react'
import Container from '../components/Container'
import Translation from '../components/translation';


interface Mission {
    title: string;
    description: string
}

const missions: Mission[] = [
    {
        title: 'missions_globalBusiness_title',
        description: 'missions_globalBusiness_desc'
    },
    {
        title: 'missions_innovating_title',
        description: 'missions_innovating_desc'
    },
    {
        title: 'missions_barriers_title',
        description: 'missions_barriers_desc'
    },
    {
        title: 'missions_sustainability_title',
        description: 'missions_sustainability_desc'
    },
    {
        title: 'missions_economies_title',
        description: 'missions_economies_desc'
    },
    {
        title: 'missions_success_title',
        description: 'missions_success_desc'
    }
]

export default function MissionPage() {


    return (
        <Container
            breadcrumbItems={[
                { label: 'breadcrumb_home', href: '/' },
                { label: 'footer_title_zainspotmission' },
            ]}
            withPaddingBottom={false}
        >
            <div className='flex flex-col gap-12'>
                <div className='flex flex-col justify-center items-center gap-5'>
                    <h1 className='font-bold text-3xl'>
                        <Translation translationKey='zainspotMissions_title' />
                    </h1>
                    <p className='text-span font-light md:max-w-[716px] font-regular md:text-lg text-center'>
                        <Translation translationKey='zainspotMissions_desc' />
                    </p>
                </div>

                <div className='bg-background pt-8 px-5 md:px-64 pb-20 flex flex-col gap-10'>
                    {
                        missions.map((mission, index) => (
                            <div key={index} className='flex flex-col gap-3'>
                                <h1 className='text-semibold-24 font-semibold text-primary'>
                                    <Translation translationKey={mission.title} />
                                </h1>
                                <p className='font-regular text-span font-light leading-[27px] '
                                    style={{ wordSpacing: '0.1em', textAlign: 'justify' }}
                                >
                                    <Translation translationKey={mission.description} />
                                </p>
                            </div>
                        ))
                    }

                </div>
            </div>
        </Container>
    )
}
