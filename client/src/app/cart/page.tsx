'use client'
import React, { useContext, useEffect } from 'react'
import { MoneyValue } from '../components/MoneyValue'
import Container from '../components/Container'
import Translation from '../components/translation'
import Image from 'next/image'
import { useCurrency } from '../contexts/CurrencyContext'
import arrowImage from '../assets/cart/arrow-right.svg'
import deletImage from '../assets/cart/Tile.svg'
import arrowBack from '../assets/cart/arrow-back-outline.svg'
import Link from 'next/link'
import { CartSubscription, useCart } from '../contexts/CartContext'
import { AuthContext } from '../contexts/authContext'
import toast from 'react-hot-toast'
import axiosInstance from '../lib/axios/axiosInstance'
import { useRouter } from 'next/navigation'


const groupCitiesByDuration = (subcriptions: CartSubscription[]) => {
    const grouped = {
        "12": [] as CartSubscription[],
        "6": [] as CartSubscription[],
        "3": [] as CartSubscription[],
    };

    subcriptions.forEach(subcription => {
        const duration = subcription.duration || 12;
        if (duration === 12) grouped["12"].push(subcription);
        else if (duration === 6) grouped["6"].push(subcription);
        else if (duration === 3) grouped["3"].push(subcription);
    });

    return grouped;
};

const Page = () => {
    const router = useRouter()
    const { state, removeFromCart, clearCart } = useCart();
    const { user } = useContext(AuthContext);
    const { currency } = useCurrency();
    const groupedCities = groupCitiesByDuration(state.items);


    const handleRemoveFromCart = (subscription: CartSubscription) => {
        const isRemoved = removeFromCart(subscription);

        if (isRemoved) {
            toast.success('Item removed from cart')
            console.log('Item successfully removed from cart');
        } else {
            toast.error('Failed to remove item')
            console.log('Failed to remove item from cart or it was not found');
        }
    };

    const handleCheckout = async (duration: string) => {
        if (!user?.user.userId) {
            toast.error('Please login first');
            return;
        }

        const filteredItems = state.items.filter(item => String(item.duration) === duration);

        if (filteredItems.length === 0) {
            toast.error('Your cart is empty for this duration');
            return;
        }

        try {
            const reqbody = {
                stripePriceIds: filteredItems.map(item => (item.stripeId)),
                subscriptions: filteredItems.map(item => ({
                    cityId: item.cityId,
                    duration: item.duration,
                    price: item.price,
                    optionType: item.optionType,
                })),
                userId: user.user.userId,
            };



            const toastId = toast.loading('loading...');

            axiosInstance
                .post('stripe/create-checkout-session', reqbody)
                .then((res) => {
                    toast.success('success', { id: toastId })
                    console.log("res :", res.data.url)
                    router.replace(res.data.url);
                })
                .catch((err) => {
                    console.error(err);
                });




        } catch (error: any) {
            console.error('Checkout error:', error);
            toast.error(error.response?.data?.message || 'An error occurred during checkout');
        }
    };




    return (
        <Container
            breadcrumbItems={[
                { label: 'breadcrumb_home', href: '/' },
                { label: 'breadcrumb_cart' },
            ]}
            withPaddingBottom={false}>
            <div className='bg-background pt-8 px-5 md:px-20 pb-20 flex flex-col gap-8 items-start overflow-x-auto'>
                <h1 className='text-3xl font-bold text-text'>
                    <Translation translationKey='cart_my_cart_heading' />
                </h1>

                {["12", "6", "3"].map(duration => {
                    const cities = groupedCities[duration];
                    return cities.length > 0 && (
                        <div className='min-w-max w-full'>
                            <div key={duration} className='flex flex-col gap-4 w-full'>
                                <h2 className="text-xl font-bold text-text mt-4">
                                    {duration === "12" ? "12-Month Subscriptions" : `${duration}-Month Subscriptions`}
                                </h2>
                                <div className='grid grid-cols-5 lg:grid-cols-8 border-b pb-3 text-span font-regular border-span-background '>
                                    <p className='col-span-3 lg:col-span-4'>City</p>
                                    <p className='col-span-1 lg:col-span-2'>Subscription</p>
                                    <p className='col-span-1 lg:col-span-2 text-end pr-[74px]'>Subtotal</p>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {cities.map((city, index) => (
                                        <div key={index} className='border-b border-span-background grid grid-cols-5 lg:grid-cols-8 justify-center items-center pb-4'>
                                            <div className='col-span-3 lg:col-span-4 flex gap-4 items-center'>
                                                <Image src={city.cityImg} alt={city.cityName} width={190} height={0} className='rounded-lg shadow-md' />
                                                <div className='flex flex-col gap-1 '>
                                                    <h1 className='text-lg font-semibold text-text'>{city.cityName}{" "}Zainspot</h1>
                                                    <p className='text-span font-sans font-thin'>
                                                        {city.cityAdress.split(',')[0]} 
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='col-span-1 lg:col-span-2 flex flex-col justify-center'>
                                                <h1 className='text-text font-semibold text-lg'>
                                                    ZS{" "}{city.optionType}
                                                </h1>
                                                {
                                                    city.duration && (
                                                        <p className='text-primary text-sm pl-[10px]'>
                                                            {city.duration}{" "}months
                                                        </p>
                                                    )
                                                }
                                            </div>
                                            <div className='col-span-1 lg:col-span-2 flex justify-end gap-14 items-center'>
                                                <div className='flex flex-col justify-center'>
                                                    <h1 className='text-lg font-semibold flex justify-end'>
                                                        <MoneyValue
                                                            value={city.price}
                                                            fromCurrency='USD'
                                                            toCurrency={currency}
                                                            decimals={2}
                                                        />
                                                    </h1>
                                                    <p className='text-sm font-regular font-thin text-span'>
                                                        {city.duration < 12 ? "Per month" : "Single Payment"}
                                                    </p>
                                                </div>
                                                <button onClick={() => handleRemoveFromCart(city)}>
                                                    <Image src={deletImage} alt='deletImage' />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="flex gap-7 justify-end items-center mt-2">
                                        <div className='flex gap-3 justify-center items-center'>
                                            <p className=' text-span font-regular font-thin'>
                                                Total
                                            </p>
                                            <h1 className='text-xl text-text font-semibold'>
                                                <MoneyValue
                                                    value={cities.reduce((sum, city) => sum + city.price, 0)}
                                                    fromCurrency='USD'
                                                    toCurrency={currency}
                                                    decimals={2}
                                                />
                                            </h1>
                                        </div>

                                        <button onClick={() => handleCheckout(duration)} className='bg-primary p-2 rounded-md hover:bg-primary-foreground ease-in-out duration-150'>
                                            <Image src={arrowImage} alt='arrow-list' />
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}


                <Link href={"/"} className='flex gap-2 border-2 border-button py-2 px-3 rounded-md font-bold text-button-text'>
                    <Image src={arrowBack} alt='arrow-back' />
                    CONTINUE SHOPPING
                </Link>
            </div>
        </Container>
    )
}

export default Page;
