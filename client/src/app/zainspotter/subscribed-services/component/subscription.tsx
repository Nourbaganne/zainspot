import React from 'react';
import { SubscriptionProps } from '../page';
import Image from 'next/image';
import locationLogo from '@/app/assets/zainspotter/locationLogo.svg';
import { useCurrency } from '@/app/contexts/CurrencyContext';
import { MoneyValue } from '@/app/components/MoneyValue';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import { useQueryClient } from '@tanstack/react-query';

const Subscription = ({
    id,
    access_token,
    startDate,
    endDate,
    optionType,
    duration,
    price,
    city,
    user
}: SubscriptionProps) => {
    const { currency } = useCurrency();
    const queryClient = useQueryClient();

    const handleCancelSubscription = async () => {
        try {
            const response = await axiosInstance.delete(`/subscriptions/remove/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });
            if (response.status === 200) {
                console.log("Subscription canceled");
                queryClient.invalidateQueries({queryKey: ['subscriptions']});
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <div className='flex flex-col gap-4 border-b pb-4 text-text'>
            <div className='grid grid-cols-2 md:grid-cols-8 gap-4 md:gap-0'>
                <Image src={city?.imageUrl} alt={`img-${city?.id}`} width={200} height={200} className='col-span-1 md:col-span-2' />
                <div className='md:col-span-5 flex flex-col gap-3'>
                    <div className='flex flex-col md:flex-row gap-1 pl-4 md:pl-0 md:items-center'>
                        <h1 className='text-sm md:text-md font-bold'>{city.name} ZainSpot</h1>
                        <span className='font-light text-span text-xs'>
                            {city?.locationTitle?.split(',')[0]}
                        </span>
                    </div>
                    <div className='hidden text-sm md:flex gap-2'>
                        <h1 className='font-semibold'>Your Business Address:</h1>
                        <p className='text-span font-light'>{user?.email}</p>
                    </div>
                    {user?.businessNumber && (
                        <div className='text-sm hidden md:flex gap-2'>
                            <h1 className='font-semibold'>Your Local Phone Number:</h1>
                            <p className='text-span font-light'>{user?.businessNumber}</p>
                        </div>
                    )}
                    <div className='flex gap-2 text-xs pl-4 md:pl-0'>
                        <Image src={locationLogo} alt='location-logo' />
                        <p className='text-text-foreground text-xs'>{city?.locationTitle}</p>
                    </div>
                </div>
                <div className='md:hidden text-sm flex flex-col gap-1'>
                    <h1 className='font-semibold'>Your Business Address:</h1>
                    <p className='text-span font-light'>{user?.email}</p>
                </div>
                {user?.businessNumber && (
                    <div className='text-sm col-span-2 md:hidden flex flex-col gap-1'>
                        <h1 className='font-semibold'>Your Local Phone Number:</h1>
                        <p className='text-span font-light'>{user?.businessNumber}</p>
                    </div>
                )}
                <div className='md:items-end col-span-2 md:col-span-1 flex flex-row md:flex-col justify-between'>
                    <div>
                        <h1 className='font-semibold'>{optionType}</h1>
                        <p className='text-xs text-span'>{duration} month</p>
                    </div>
                    <div className='font-semibold'>
                        <MoneyValue
                            value={price}
                            fromCurrency="USD"
                            toCurrency={currency}
                            decimals={0}
                        />
                        /Month
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row md:justify-between gap-4 md:gap-0 text-sm'>
                <div className='flex flex-col'>
                    <div className='flex gap-1'>
                        <h1>Start Date:</h1>
                        <p className='font-light'>
                            {new Date(startDate).toLocaleDateString()}
                        </p>
                    </div>
                    <div className='flex gap-1'>
                        <h1>End Date:</h1>
                        <p className='font-light'>
                            {new Date(endDate).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className='text-xs font-semibold flex flex-col md:flex-row gap-3'>
                    <button onClick={handleCancelSubscription} className='p-3 rounded-md border-2 border-button text-button-text'>
                        Cancel Subscription
                    </button>
                    <button className='p-3 rounded-md border-2 border-primary text-primary'>
                        Edit Subscription
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Subscription;
