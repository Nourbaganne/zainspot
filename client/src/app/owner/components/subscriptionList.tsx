import upButton from '@/app/assets/owner/users/Up.svg';
import downButton from '@/app/assets/owner/users/Down.svg';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/app/lib/axios/axiosInstance';

interface SubscriptionItemProps {
    city: {
        locationTitle: string,
        city: string
        country: string,
    },
    optionType: string,
    price: number,
    duration: number,
    startDate: string,
    renewal: {
        date: Date,
        status: string
    }
}



const SubscriptionItem = ({
    city,
    optionType,
    price,
    duration,
    startDate,
    renewal

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
        <div className='grid grid-cols-6 text-sm gap-6 items-center py-4'>
            <p className='font-light max-w-40'>{city.locationTitle}</p>
            <div className='flex flex-col gap-1'>
                <h1 className='font-semibold'>{city.city}</h1>
                <p className='text-span'>{city.country}</p>
            </div>
            <div className='flex flex-col gap-1'>
                <h1>{optionType}</h1>
                <p className='font-semibold'>{price} <span className='text-span font-light '>/Month</span></p>
            </div>
            <div className='font-light flex flex-col gap-1 '>
                {formattedDate}
                <span>
                    at {formattedTime}
                </span>
            </div>

            <div>
                {renewal.date ? (
                    <p>
                        {new Date(renewal?.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                ) : (
                    <p>no</p>
                )}

            </div>
            <div className=' font-medium'>
                {renewal?.status === 'Upcoming' ? (
                    <p className='text-primary'>{renewal.status}</p>
                ) : (
                    <p className='text-alert'>{renewal.status}</p>
                )}
            </div>

        </div>
    )
}


const SubscriptionList = ({ userId, access_token }: { userId: number, access_token: string | undefined }) => {
    const USER_LIST_HEADER = [
        { title: 'Location', hasFiltering: true },
        { title: 'City & Country', hasFiltering: true },
        { title: 'Payment', hasFiltering: false },
        { title: 'Subscription Date', hasFiltering: true },
        { title: 'Renewal Date', hasFiltering: true },
        { title: 'Renewal Status', hasFiltering: true },
    ]


    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['subscriptions', userId],
        queryFn: () => axiosInstance.get(`/subscriptions/${userId}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
    });

    if (isLoading) return <h1>Loading ...</h1>
    if (isError) return <h1>{error.message}</h1>


    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-lg font-semibold'>Subscriptions & Payments</h1>
            <div className='flex flex-col py-6 bg-background pl-6 border rounded-md'>
                <div className=' grid grid-cols-6 text-sm  w-full border-b-2 text-span pb-4 pt-6   pl-4'>
                    {USER_LIST_HEADER.map((item, index) => (
                        <div key={index} className={`${item.hasFiltering && 'flex items-center gap-2'}`}>
                            {item.hasFiltering && (
                                <div className='flex flex-col gap-1'>
                                    <button>
                                        <Image src={upButton} alt='up-users' />
                                    </button>
                                    <button>
                                        <Image src={downButton} alt='down-users' />
                                    </button>
                                </div>
                            )}
                            {item.title}
                        </div>
                    ))}
                </div>
                {data?.data ? (
                    <>
                        {data?.data.map((sub: SubscriptionItemProps, index: number) => (
                            <SubscriptionItem
                                key={index}
                                city={sub.city}
                                optionType={sub.optionType}
                                price={sub.price}
                                duration={sub.duration}
                                startDate={sub.startDate}
                                renewal={sub.renewal} />
                        ))}
                    </>
                ) : (
                    <div>No Subscription yet</div>
                )}
            </div>
        </div>
    )
}

export default SubscriptionList