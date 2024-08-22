"use client"

import { useQuery } from '@tanstack/react-query';
import Breadcrumb from '../components/breadcrumb';
import Layout from '../Layout';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import { useContext } from 'react';
import { AuthContext } from '@/app/contexts/authContext';
import Subscription from './component/subscription';


export interface SubscriptionProps {
    id: number,
    access_token: string | undefined,
    startDate: string,
    endDate: string,
    optionType: string,
    duration: number,
    price: number,
    city: {
        id: number,
        city: string,
        imageUrl: string,
        locationTitle: string
    },
    user: {
        email: string,
        businessNumber: number | undefined
    }
}

const Page = () => {
    const { user } = useContext(AuthContext);

    const breadcrumbItems = [
        { label: "Breadcrumb_home", href: "/" },
        { label: "Breadcrumb_zainspotter", href: "/zainspotter" },
        { label: "editProfile_services" }
    ];

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['subscriptions', user?.user.userId],
        queryFn: () => axiosInstance.get(`/subscriptions/${user?.user.userId}`, {
            headers: {
                Authorization: `Bearer ${user?.access_token}`
            }
        })
    });

    if (isLoading) return <h1>Loading ...</h1>;
    if (isError) return <h1>{error.message}</h1>;


    return (
        <div className="flex flex-col gap-4 md:gap-6 bg-background-foreground md:px-16 md:py-8 py-6 px-2 md:pb-20">
            <Breadcrumb items={breadcrumbItems} />
            <Layout>
                <div className='p-4 px-6 bg-background border pb-10 mb-20 flex flex-col gap-5'>
                    <h1 className='font-bold'>
                        Subscribed Services
                    </h1>
                    {data?.data.length > 0 ? (
                        <div className='flex flex-col gap-4'>
                            {data?.data.map((subscription: SubscriptionProps, index: number) => (
                                <Subscription
                                    key={index}
                                    id={subscription?.id}
                                    access_token={user?.access_token}
                                    startDate={subscription?.startDate}
                                    endDate={subscription?.endDate}
                                    optionType={subscription?.optionType}
                                    duration={subscription?.duration}
                                    price={subscription?.price}
                                    city={subscription?.city}
                                    user={subscription?.user} />
                            ))}
                        </div>
                    ) : (
                        <div>
                            no subscriptions yet
                        </div>
                    )}
                </div>
            </Layout>
        </div>
    );
}

export default Page;

