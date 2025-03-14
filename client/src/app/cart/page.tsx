import React from 'react'
import { MoneyValue } from '../components/MoneyValue'
import Container from '../components/Container'
import Translation from '../components/translation'
import Image from 'next/image'



const citiesTest = [
    {
        img: "https://res.cloudinary.com/dk1upobue/image/upload/v1737478529/cities/yvl9gztz3byucbu2utg4.jpg",
        title: "London",
        adress: "Mayfair 14 Berkeley Square",
        subscription: {
            type: "Classic",
            duration: "6 months"
        },
        payment: {
            price: 25,
            monthly: true
        }
    },
    {
        img: "https://res.cloudinary.com/dk1upobue/image/upload/v1737478529/cities/yvl9gztz3byucbu2utg4.jpg",
        title: "New York",
        adress: "Rockefeller Centre",
        subscription: {
            type: "Gold",
        },
        payment: {
            price: 392,
            monthly: false
        }
    },
]
const page = () => {

    return (
        <Container
            breadcrumbItems={[
                { label: 'breadcrumb_home', href: '/' },
                { label: 'breadcrumb_cart' },
            ]}
            withPaddingBottom={false}>
            <div className='bg-background pt-8 px-5 md:px-20 pb-20 flex flex-col gap-8'>
                <h1 className='text-3xl font-bold text-text'>
                    <Translation translationKey='cart_my_cart_heading' />
                </h1>

                <div className='flex flex-col gap-4'>
                    <div className='grid grid-cols-8 border-b pb-2 text-span border-span-background '>
                        <p className='col-span-4'>City</p>
                        <p className='col-span-2'>Subscription</p>
                        <p className='col-span-2'>Subtotal</p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        {citiesTest.map((city, index) => (
                            <div key={index} className=' border-b border-span-background grid grid-cols-8 justify-center items-center pb-4'>
                                <div className='col-span-4 flex gap-4 items-center'>
                                    <Image src={city.img} alt={city.title} width={190} height={0} className='rounded-lg shadow-md' />
                                    <div className='flex flex-col gap-1 '>
                                        <h1 className='text-lg font-semibold text-text'>{city.title}{" "}Zainspot</h1>
                                        <p className='text-span font-sans font-thin'>{city.adress}</p>
                                    </div>
                                </div>
                                <div className='col-span-2 flex flex-col justify-centers'>
                                    <h1 className='text-text font-semibold text-lg'>
                                        ZS{" "}{city.subscription.type}
                                    </h1>
                                    {
                                        city.subscription.duration && (
                                            <p className='text-primary text-sm pl-[10px]'>
                                                {city.subscription.duration}
                                            </p>
                                        )
                                    }

                                </div>
                                <div className='col-span-2 flex justify-between items-center'>
                                    <div className='flex flex-col '>
                                        <h1 className='text-lg font-semibold'>
                                            {/* <MoneyValue
                                                value={city.payment.price}
                                                fromCurrency='USD'
                                                toCurrency={currency}
                                                decimals={0}
                                            /> */}
                                        </h1>
                                        <p>
                                            {city.payment.monthly ?
                                                (
                                                    <p className='text-sm font-thin text-span'>
                                                        Per month
                                                    </p>
                                                ) : (
                                                    <p className='text-sm font-thin text-span'>
                                                        Single Payment
                                                    </p>
                                                )

                                            }
                                        </p>
                                    </div>
                                    <button>
                                        Pay NOW
                                    </button>
                                    <button>
                                        X
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </Container>
    )
}

export default page