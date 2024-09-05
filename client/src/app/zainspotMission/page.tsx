import React from 'react'
import Container from '../components/Container'


interface Mission {
    title: string;
    description: string
}

const missions: Mission[] = [
    {
        title: 'Empowering Global Business Expansion',
        description: 'At ZainSpot, our mission is to empower businesses of all sizes to expand their presence on a global scale without the traditional costs and complexities. We believe that every business, regardless of its size or location, deserves the opportunity to establish a prestigious international presence.'
    },
    {
        title: 'Innovating for Efficiency',
        description: 'We aim to continually innovate by leveraging the latest technologies, including plugins and apps, to streamline our services and provide cost-effective solutions. Our goal is to save our clients time and resources, allowing them to focus on what they do best—growing their business.'
    },
    {
        title: 'Breaking Down Barriers',
        description: 'We are committed to breaking down the barriers that prevent small and medium-sized enterprises from reaching their full potential in the global market. By providing affordable and accessible virtual office services, we help businesses navigate the challenges of international expansion, offering them the tools and resources needed to succeed in diverse and emerging markets.'
    },
    {
        title: 'Sustainability and Inclusivity',
        description: 'At the heart of ZainSpot s mission is a commitment to sustainability and inclusivity. We strive to create a service that not only meets the needs of our clients but also contributes to a more equitable and sustainable global economy.'
    },
    {
        title: 'Supporting Emerging Economies',
        description: 'ZainSpot is dedicated to supporting businesses in emerging economies and the poorest countries. We offer localized services with language and currency options to ensure that our clients can operate effectively in their target markets. Our focus on these regions reflects our commitment to fostering economic growth and creating opportunities where they are needed most.'
    },
    {
        title: 'Your Success is Our Success',
        description: 'We measure our success by the success of our clients. When your business grows and thrives, so does ZainSpot. We are dedicated to being a reliable partner in your journey, providing consistent support, flexible solutions, and a global network that you can trust.'
    }
]

export default function MissionPage() {

    return ( 
        <Container
            breadcrumbItems={[
                { label: 'Home', href: '/' },
                { label: 'Zainspot Mission' },
            ]}
            withPaddingBottom={false}
        >
            <div className='flex flex-col gap-12'>
                <div className='flex flex-col justify-center items-center gap-5'>
                    <h1 className='font-bold text-3xl'>Zainspot Mission</h1>
                    <p className='text-span font-light md:max-w-[716px] font-regular md:text-lg text-center'>
                        Get to know ZainSpot&apos;s values and goals, how we connect with our customers on a deeper level by emphasizing the company&apos;s dedication to empowerment, inclusivity, and innovation.
                    </p>
                </div>

                <div className='bg-background pt-8 px-5 md:px-64 pb-20 flex flex-col gap-10'>
                    {
                        missions.map((mission, index) => (
                            <div key={index} className='flex flex-col gap-3'>
                                <h1 className='text-semibold-24 font-semibold'>{mission.title}</h1>
                                <p className='font-regular text-span font-light leading-[27px] '
                                    style={{ wordSpacing: '0.1em', textAlign: 'justify' }}
                                >{mission.description}</p>
                            </div>
                        ))
                    }

                </div>
            </div>
        </Container>
    )
}
