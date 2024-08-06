"use client"

import Image from 'next/image';
import Breadcrumb from '../components/breadcrumb';
import Layout from '../Layout'
import testImage from '@/app/assets/zainspotter/Image.svg'
import locationLogo from '@/app/assets/zainspotter/location_logo.svg'

const Page = () => {
    const breadcrumbItems = [
        { label: "Breadcrumb_home", href: "/" },
        { label: "Breadcrumb_zainspotter", href: "/zainspotter" },
        { label: "editProfile_services" }
    ];

    const SUBSCRIBED_SERVICES_DATA = [
        { img: testImage, title: "London ZainSpot", adress: "Mayfair 14 Berkley Square", businessAdress: "exemple.business@gmail.com", location: "Berkeley House 14 Berkeley Square, London W1J 6AF", type: "ZS Classic", duration: "12 months", price: "£23/Month", startDate: "23/05/2023", endDate: "23/05/2023" },
        { img: testImage, title: "London ZainSpot", adress: "Mayfair 14 Berkley Square", businessAdress: "exemple.business@gmail.com", location: "Berkeley House 14 Berkeley Square, London W1J 6AF", type: "ZS Classic", duration: "12 months", price: "£23/Month", startDate: "23/05/2023", endDate: "23/05/2023" },
        { img: testImage, title: "London ZainSpot", adress: "Mayfair 14 Berkley Square", businessAdress: "exemple.business@gmail.com", location: "Berkeley House 14 Berkeley Square, London W1J 6AF", type: "ZS Classic", duration: "12 months", price: "£23/Month", startDate: "23/05/2023", endDate: "23/05/2023" },
        { img: testImage, title: "London ZainSpot", adress: "Mayfair 14 Berkley Square", businessAdress: "exemple.business@gmail.com", location: "Berkeley House 14 Berkeley Square, London W1J 6AF", type: "ZS Classic", duration: "12 months", price: "£23/Month", startDate: "23/05/2023", endDate: "23/05/2023" },
        { img: testImage, title: "London ZainSpot", adress: "Mayfair 14 Berkley Square", businessAdress: "exemple.business@gmail.com", location: "Berkeley House 14 Berkeley Square, London W1J 6AF", type: "ZS Classic", duration: "12 months", price: "£23/Month", startDate: "23/05/2023", endDate: "23/05/2023" },
    ]

    return (
        <div className="flex flex-col gap-4 md:gap-6 bg-background-foreground md:px-16 md:py-8 py-6 px-2  md:pb-20">
            <Breadcrumb items={breadcrumbItems} />
            <Layout>
                <div className='flex flex-col p-4 px-6 gap-4 bg-background border pb-10 mb-20'>
                    <h1 className='font-bold'>
                        PAYMENT HISTORY
                    </h1>
                    <div className='flex flex-col gap-4 h-[850px] overflow-auto'>
                        {SUBSCRIBED_SERVICES_DATA.map((data, index) => (
                            <div key={index} className='flex flex-col gap-5 border-b pb-4 text-sm'>
                                <div className='grid grid-cols-4 md:grid-cols-7 w-full gap-2'>
                                    <Image src={data?.img} alt={`image-${index}`} className='col-span-2 md:col-span-1' />
                                    <div className='md:col-span-5 col-span-2 pl-0  md:pl-4  flex flex-col gap-2 md:gap-4'>
                                        <div className='flex flex-col md:flex-row gap-2'>
                                            <h1 className='font-semibold'>{data?.title}</h1>
                                            <p className='text-span font-light'>{data?.adress}</p>
                                        </div>
                                        <div className='hidden md:flex gap-2'>
                                            <h1 className='font-semibold'>Your Business Adress</h1>
                                            <p className='text-span font-light'>{data?.businessAdress}</p>
                                        </div>
                                        <div className='flex gap-2'>
                                            <Image src={locationLogo} alt={`location-${index}`} />
                                            <p>{data?.location}</p>
                                        </div>
                                    </div>
                                    <div className='col-span-4 flex flex-col md:hidden'>
                                            <h1>Your Business Adress</h1>
                                            <p className='text-span font-light'>{data?.businessAdress}</p>
                                    </div>
                                    <div className='col-span-4 flex flex-row md:flex-col md:-col-start-1 justify-between'>
                                        <div className='flex flex-col'>
                                            <h1 className='font-semibold'>{data?.type}</h1>
                                            <p className='text-span font-light text-xs'>{data?.duration}</p>
                                        </div>
                                        <h1 className=' font-semibold'>
                                            {data?.price}
                                        </h1>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4 md:gap-0 md:flex-row justify-between'>
                                    <div>
                                        <h1 className='flex gap-3 text-sm'>
                                            Start Date :
                                            <span className='text-span font-light'>{data?.startDate}</span>
                                        </h1>
                                        <h1 className='flex gap-3 text-sm'>
                                            End Date :
                                            <span className='text-span font-light'>{data?.endDate}</span>
                                        </h1>
                                    </div>
                                    <div className='flex flex-col md:flex-row gap-4'>
                                        <button className='p-3 rounded-md border-2 border-button text-[#B0B0B0] text-sm font-semibold'>
                                            Cancel Subscription
                                        </button>
                                        <button className='p-3 rounded-md border-2 border-primary text-primary text-sm font-semibold'>
                                            Edit Subscription
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Page;
