"use client"

import Image from 'next/image';
import Breadcrumb from '../components/breadcrumb';
import Layout from '../Layout';
import upSort from '@/app/assets/invoices/Up.svg';
import downSort from '@/app/assets/invoices/Down.svg';
import downloadIcon from '@/app/assets/invoices/download-outline.svg';
import alert from '@/app/assets/zainspotter/alert-circle-outline.svg';
import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from 'react';
import Portal from './components/portal';

const Page = () => {
    const [openFailedMenuIndex, setOpenFailedMenuIndex] = useState<number | null>(null);
    const [menuPosition, setMenuPosition] = useState<{ top: number, left: number } | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const breadcrumbItems = [
        { label: "Breadcrumb_home", href: "/" },
        { label: "Breadcrumb_zainspotter", href: "/zainspotter" },
        { label: "editProfile_Payment_history" }
    ];

    const PAYMENT_HISTORY_DATA = [
        { subscription: [{ country: "New York, USA" }, { type: "ZS Classic" }], date: "23/06/2024", method: "Credit Card", amount: '$25', status: "Complete" },
        { subscription: [{ country: "Mumbai, India" }, { type: "ZS Classic" }], date: "23/06/2024", method: "Credit Card", amount: '$25', status: "Pending" },
        { subscription: [{ country: "Dubai, UAE" }, { type: "ZS Gold" }], date: "23/06/2024", method: "Credit Card", amount: '$25', status: "Failed" },
        { subscription: [{ country: "Mumbai, India" }, { type: "ZS Gold" }], date: "23/06/2024", method: "PayPal", amount: '$25', status: "Complete" },
        { subscription: [{ country: "New York, USA" }, { type: "ZS Classic" }], date: "23/06/2024", method: "Credit Card", amount: '$25', status: "Complete" },
        { subscription: [{ country: "New York, USA" }, { type: "ZS Classic" }], date: "23/06/2024", method: "Credit Card", amount: '$25', status: "Complete" },
        { subscription: [{ country: "New York, USA" }, { type: "ZS Classic" }], date: "23/06/2024", method: "Credit Card", amount: '$25', status: "Failed" },
        { subscription: [{ country: "New York, USA" }, { type: "ZS Classic" }], date: "23/06/2024", method: "Credit Card", amount: '$25', status: "Complete" }
    ];

    const handleAlertClick = (event: ReactMouseEvent<HTMLButtonElement>, index: number) => {
        const buttonRect = event.currentTarget.getBoundingClientRect();
        const menuWidth = 390;
        const menuPos = { top: buttonRect.bottom + window.scrollY, left: buttonRect.right + window.scrollX - menuWidth };
        
        if (openFailedMenuIndex === index) {
            setOpenFailedMenuIndex(null);
            setMenuPosition(null);
        } else {
            setOpenFailedMenuIndex(index);
            setMenuPosition(menuPos);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenFailedMenuIndex(null);
                setMenuPosition(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-col gap-4 md:gap-6 bg-background-foreground md:px-16 md:py-8 py-6 px-2 md:pb-20">
            <Breadcrumb items={breadcrumbItems} />
            <Layout>
                <div className='flex flex-col p-4 px-6 gap-4 bg-background border pb-10 mb-20'>
                    <h1 className='font-bold'>
                        PAYMENT HISTORY
                    </h1>
                    <div className='flex flex-col'>
                        <div className='bg-background-foreground text-span grid grid-cols-11 text-sm items-center pl-2 py-3'>
                            <h1 className='col-span-3 '>
                                Subscription
                            </h1>
                            <div className='col-span-2 flex items-center gap-2'>
                                <div className='flex flex-col gap-1'>
                                    <button>
                                        <Image src={upSort} alt='upSort-dateIssued' />
                                    </button>
                                    <button>
                                        <Image src={downSort} alt='downSort-dateIssued' />
                                    </button>
                                </div>
                                <h1>
                                    Date
                                </h1>
                            </div>
                            <div className='col-span-2'>
                                <h1>
                                    Method
                                </h1>
                            </div>
                            <div className='col-span-2 flex items-center gap-2'>
                                <div className='flex flex-col gap-1'>
                                    <button>
                                        <Image src={upSort} alt='upSort-amount' />
                                    </button>
                                    <button>
                                        <Image src={downSort} alt='downSort-amount' />
                                    </button>
                                </div>
                                <h1>
                                    Amount
                                </h1>
                            </div>
                            <div className='col-span-2 flex items-center gap-2'>
                                <div className='flex flex-col gap-1'>
                                    <button>
                                        <Image src={upSort} alt='upSort-status' />
                                    </button>
                                    <button>
                                        <Image src={downSort} alt='downSort-status' />
                                    </button>
                                </div>
                                <h1>
                                    Status
                                </h1>
                            </div>
                        </div>

                        <div className='max-h-[340px] overflow-auto'>
                            {PAYMENT_HISTORY_DATA.map((data, index) => (
                                <div className='flex items-center border-b text-text font-light pl-4  py-[14px]' key={index}>
                                    <ul className='w-full grid grid-cols-11 items-center'>
                                        <li className='col-span-3'>
                                            {data.subscription.map((subs, subIndex) => (
                                                <div key={subIndex} className='flex flex-col text-sm'>
                                                    <h1 className='font-normal'>{subs.country}</h1>
                                                    <span className='text-span'>{subs.type}</span>
                                                </div>
                                            ))}
                                        </li>
                                        <li className='col-span-2 pl-4'>
                                            {data.date}
                                        </li>
                                        <li className='col-span-2 pl-4'>
                                            {data.method}
                                        </li>
                                        <li className='col-span-2 pl-4'>
                                            {data.amount}
                                        </li>
                                        <li className={`col-span-2 pl-4 flex items-center gap-2 ${data.status === 'Complete' ? 'text-primary' : data.status === 'Pending' ? 'text-yellow-500' : 'text-alert'}`}>
                                            <span className={`w-3 h-3 rounded-full ${data.status === 'Complete' ? 'bg-primary' : data.status === 'Pending' ? 'bg-yellow-500' : 'bg-alert'}`}></span>
                                            {data.status}
                                        </li>
                                    </ul>
                                    <div ref={menuRef}>
                                        {data.status === "Failed" ? (
                                            <button onClick={(event) => handleAlertClick(event, index)}>
                                                <Image src={alert} alt={`alert-${index}`} />
                                            </button>
                                        ) : (
                                            <button>
                                                <Image src={downloadIcon} alt={`download ${index}`} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
            {openFailedMenuIndex !== null && menuPosition && (
                <Portal>
                    <div
                        ref={menuRef}
                        className="absolute flex flex-col gap-4 py-6 px-8 bg-darkBackground text-background rounded shadow-lg z-10"
                        style={{ top: menuPosition.top, left: menuPosition.left }}
                    >
                        <h1 className='font-semibold'>Pay Manually</h1>
                        <p className='flex flex-col text-sm font-light max-w-xs'>
                            To continue using this service, you have to pay manually.
                            <span>(Subscription fee + Manual payment fee)</span>
                        </p>
                        <div className='flex gap-3 font-normal text-xs justify-end'>
                            <button onClick={() => setOpenFailedMenuIndex(null)} className='py-2 px-5 border-2 border-primary rounded-md text-primary'>
                                Cancel
                            </button>
                            <button className='py-2 px-4 bg-primary text-background rounded-md'>
                                Pay Manually
                            </button>
                        </div>
                    </div>
                </Portal>
            )}
        </div>
    );
};

export default Page;
