"use client"

import Image from 'next/image';
import Breadcrumb from '../components/breadcrumb';
import Layout from '../Layout'
import upSort from '@/app/assets/invoices/Up.svg'
import downSort from '@/app/assets/invoices/Down.svg'
import downloadIcon from '@/app/assets/invoices/download-outline.svg'

const Page = () => {
    const breadcrumbItems = [
        { label: "Breadcrumb_home", href: "/" },
        { label: "Breadcrumb_zainspotter", href: "/zainspotter" },
        { label: "editProfile_Invoices" }
    ];

    const INVOICES_DATA = [
        { id: 26072024, dateIssued: "23/06/2024", dueDate: "23/06/2024", amount: '$25', status: "paid" },
        { id: 26072024, dateIssued: "23/06/2024", dueDate: "23/06/2024", amount: '$25', status: "unpaid" },
        { id: 26072024, dateIssued: "23/06/2024", dueDate: "23/06/2024", amount: '$25', status: "overdue" },
        { id: 26072024, dateIssued: "23/06/2024", dueDate: "23/06/2024", amount: '$25', status: "paid" },
        { id: 26072024, dateIssued: "23/06/2024", dueDate: "23/06/2024", amount: '$25', status: "paid" },
        { id: 26072024, dateIssued: "23/06/2024", dueDate: "23/06/2024", amount: '$25', status: "paid" },
        { id: 26072024, dateIssued: "23/06/2024", dueDate: "23/06/2024", amount: '$25', status: "paid" },
        { id: 26072024, dateIssued: "23/06/2024", dueDate: "23/06/2024", amount: '$25', status: "paid" },
        { id: 26072024, dateIssued: "23/06/2024", dueDate: "23/06/2024", amount: '$25', status: "paid" }
    ]
    return (
        <div className="flex flex-col gap-4 md:gap-6 bg-background-foreground md:px-16 md:py-8 py-6 px-2  md:pb-20">
            <Breadcrumb items={breadcrumbItems} />
            <Layout>
                <div className='flex flex-col p-4 px-6 gap-4 bg-background border pb-10 mb-20'>
                    <h1 className='font-bold'>
                        MY INVOICES
                    </h1>
                    <div className='flex flex-col'>
                        <div className='bg-background-foreground text-span grid grid-cols-11 text-sm items-center pl-2 py-3'>
                            <h1 className='col-span-3 '>
                                Invoice N°
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
                                    Date Issued
                                </h1>
                            </div>
                            <div className='col-span-2 flex items-center gap-2'>
                                <div className='flex flex-col gap-1'>
                                    <button>
                                        <Image src={upSort} alt='upSort-dueDate' />
                                    </button>
                                    <button>

                                        <Image src={downSort} alt='downSort-dueDate' />
                                    </button>
                                </div>
                                <h1>
                                    Due Date
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
                            {INVOICES_DATA.map((data, index) => (
                                <div className='flex items-center border-b text-text font-light pl-4  py-5' key={index}>
                                    <ul key={index} className='w-full grid grid-cols-11 items-center'>
                                        <li className='col-span-3'>
                                            {data.id}
                                        </li>
                                        <li className='col-span-2 pl-4'>
                                            {data.dateIssued}
                                        </li>
                                        <li className='col-span-2 pl-4'>
                                            {data.dueDate}
                                        </li>
                                        <li className='col-span-2 pl-4'>
                                            {data.amount}
                                        </li>
                                        <li className={`col-span-2 pl-4 flex items-center gap-2 ${data.status === 'paid' ? 'text-primary' : data.status === 'unpaid' ? 'text-yellow-500' : 'text-alert'}`}>
                                            <span className={`w-3 h-3 rounded-full ${data.status === 'paid' ? 'bg-primary' : data.status === 'unpaid' ? 'bg-yellow-500' : 'bg-alert'}`}></span>
                                            {data.status}
                                        </li>

                                    </ul>
                                    <div>
                                        <Image src={downloadIcon} alt={`download ${index}`} />
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>

                </div>
            </Layout>
        </div>
    )
}

export default Page;
