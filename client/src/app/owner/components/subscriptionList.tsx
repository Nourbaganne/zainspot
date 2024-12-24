import upButton from '@/app/assets/owner/users/Up.svg';
import downButton from '@/app/assets/owner/users/Down.svg';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import Loader from '@/app/components/loader';
import Translation from '@/app/components/translation';
import { useEffect } from 'react';

interface SubscriptionItemProps {
    city: {
        location: {
            title: string,
        },
        city: string
        country: string,
    },
    optionType: string,
    price: number,
    duration: number,
    startDate: string,
    renewalDate: Date,
    renewalStatus: string,
}


const SubscriptionItem = ({
    city,
    optionType,
    price,
    duration,
    startDate,
    renewalDate,
    renewalStatus
}: SubscriptionItemProps) => {
    const formattedDate = new Date(startDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    const formattedTime = new Date(startDate).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="flex flex-wrap gap-2 md:gap-0 md:grid md:grid-cols-6 text-sm w-full sticky top-0 border-b text-span pb-4 pt-6 px-2 md:px-4">
            <p className="font-medium max-w-[30%] md:max-w-[100%]">{city.location.title}</p>

            <div className="flex flex-col">
                <h1 className="font-semibold">{city.city}</h1>
                <p className="text-xs text-span">{city.country}</p>
            </div>

            <div className="flex flex-col">
                <h1>{optionType}</h1>
                <p className="font-semibold">
                    {price} <span className="text-span font-light">
                        <Translation translationKey='monthly_subscription' />
                    </span>
                </p>
            </div>

            <div className="flex flex-col">
                <span>{formattedDate}</span>
                <span className="text-xs text-span">
                    <Translation translationKey='subscription_time' />
                    {formattedTime}
                </span>
            </div>

            <div>
                {renewalDate ? (
                    <p>
                        {new Date(renewalDate).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </p>
                ) : (
                    <p>
                        <Translation translationKey='subscription_noRenewal' />
                    </p>
                )}
            </div>

            <div>
                {renewalStatus === 'Upcoming' ? (
                    <p className="text-primary">{renewalStatus}</p>
                ) : (
                    <p className="text-alert">{renewalStatus}</p>
                )}
            </div>
        </div>

    );
};


const SubscriptionList = ({
    userId,
    access_token,
    setSubscriptions,
    setTotal,
}: {
    userId: number;
    access_token: string | undefined;
    setSubscriptions: (subscriptions: any[]) => void;
    setTotal: (total: number) => void;
}) => {
    const USER_LIST_HEADER = [
        { title: 'Location', hasFiltering: true },
        { title: 'City & Country', hasFiltering: true },
        { title: 'Payment', hasFiltering: false },
        { title: 'Subscription Date', hasFiltering: true },
        { title: 'Renewal Date', hasFiltering: true },
        { title: 'Renewal Status', hasFiltering: true },
    ];

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['subscriptions', userId],
        queryFn: () =>
            axiosInstance.get(`/subscriptions/${userId}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }),
    });

    useEffect(() => {
        if (data?.data) {
            const subscriptionStats = data?.data.map((sub: SubscriptionItemProps) => ({
                locationTitle: sub.city.location.title,
                city: sub.city.city,
                price: sub.price,
                startDate: sub.startDate,
                renewalStatus: sub.renewalStatus,
            }));

            const totalAmount = subscriptionStats.reduce(
                (total: number, subscription: SubscriptionItemProps) =>
                    total + subscription.price,
                0
            );

            setTotal(totalAmount);
            setSubscriptions(subscriptionStats);
        }
    }, [data?.data, setSubscriptions, setTotal]);

    if (isLoading) return <Loader />;
    if (isError) return <h1>{error.message}</h1>;

    return (
        <div className="flex flex-col gap-4 w-full">
            <h1 className="text-lg font-semibold">
                <Translation translationKey="userDetails_subscriptions" />
            </h1>

            {data?.data.length > 0 ? (
                <div className="bg-background border rounded-md w-full overflow-auto">
                    <div className="min-w-[600px] md:min-w-[900px]">
                        {/* Table Header */}
                        <div className="flex flex-wrap gap-2 md:gap-0 md:grid md:grid-cols-6 text-sm w-full sticky top-0 bg-background border-b-2 text-span pb-2 pt-4 px-2 md:px-4">
                            {USER_LIST_HEADER.map((item, index) => (
                                <div
                                    key={index}
                                    className={`${item.hasFiltering && 'flex items-center gap-1'}`}
                                >
                                    {item.hasFiltering && (
                                        <div className="flex flex-col gap-1">
                                            <button>
                                                <Image src={upButton} alt="up-users" />
                                            </button>
                                            <button>
                                                <Image src={downButton} alt="down-users" />
                                            </button>
                                        </div>
                                    )}
                                    {item.title}
                                </div>
                            ))}
                        </div>

                        {/* Subscription Items */}
                        {data?.data.map((sub: SubscriptionItemProps, index: number) => (
                            <SubscriptionItem
                                key={index}
                                city={sub.city}
                                optionType={sub.optionType}
                                price={sub.price}
                                duration={sub.duration}
                                startDate={sub.startDate}
                                renewalDate={sub.renewalDate}
                                renewalStatus={sub.renewalStatus}
                            />
                        ))}
                    </div>
                </div>

            ) : (
                <div>No Subscription yet</div>
            )}
        </div>
    );
};


export default SubscriptionList;
