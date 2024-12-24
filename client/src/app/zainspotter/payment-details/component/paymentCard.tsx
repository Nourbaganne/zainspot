import Image from 'next/image';
import React, { ChangeEvent } from 'react';
import buttonIcon from '@/app/assets/payment-details/ellipsis-vertical.svg'

type PaymentCardProps = {
    title: string;
    logo: string;
    info: string;
    selected: string;
    setSelected: (value: string) => void;
};

const PaymentCard: React.FC<PaymentCardProps> = ({ title, logo, info, selected, setSelected }) => {
    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelected(event.target.value);
    };

    return (
        <div className={`flex flex-col border rounded-md p-6 gap-5 justify-center ${selected === title ? 'border-primary' : ''}`}>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <input
                        type="radio"
                        name="payment-method"
                        id={title}
                        value={title}
                        onChange={handleRadioChange}
                        checked={selected === title}
                        className={`w-4 h-4 accent-primary`}
                    />
                    <label className='font-semibold' htmlFor={title}>{title}</label>
                </div>
                <div className='flex'>
                    <Image src={logo} alt='credit-card-logo' />
                    <button>
                        <Image src={buttonIcon} alt='dropDown-button' />
                    </button>
                </div>
            </div>
            <p className='text-span pl-5'>{info}</p>
        </div>
    );
};

export default PaymentCard;
