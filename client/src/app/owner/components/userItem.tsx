import React from 'react';
import detailsButton from '@/app/assets/owner/users/arrow-right.svg'
import Image from 'next/image';
import Link from 'next/link';

interface UserItemProps {
    id: number,
    user: {
        name: string;
        desc: string;
    };
    contact: {
        email: string;
        phoneNumber: string;
    };
    subscriptions: string[] | null;
    renewals: {
        upcoming: boolean;
        date: string;
    };
    role: string;
    setSelectedUsers: (email: string) => void;
    isSelected: boolean;
}

const UserItem: React.FC<UserItemProps> = ({ id, user, contact, subscriptions, renewals, role, setSelectedUsers, isSelected }) => {
    return (
        <>
            <td className='flex gap-4 items-center'>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => setSelectedUsers(contact.email)}
                    className='accent-primary' />
                <div className='flex flex-col gap-1'>
                    <h1 className='font-semibold'>{user.name}</h1>
                    <p className='text-span font-light'>{user.desc}</p>
                </div>
            </td>
            <td className='flex flex-col gap-1 font-light'>
                <p>{contact.email}</p>
                <p>{contact.phoneNumber}</p>
            </td>
            <td>
                {
                    subscriptions ? (
                        <div className='flex gap-1'>
                            {subscriptions.map((sub, index) => (
                                <h1 key={index} className='bg-background-foreground rounded-md text-text font-light py-1 px-2 text-md'>
                                    {sub}
                                </h1>))}
                        </div>
                    ) : (
                        <p className='text-md text-text font-light'>
                            N/A
                        </p>
                    )

                }
            </td>
            <td className={`flex gap-1 ${renewals.upcoming ? 'text-primary' : 'text-alert-dark'}`}>
                <h1 className='font-semibold'>
                    {
                        renewals.upcoming ? (
                            "Upcoming"
                        ) : (
                            "Failed"
                        )
                    }
                </h1>

                <span className='font-light'>
                    ({renewals.date})
                </span>
            </td>
            <td className='flex items-center justify-between'>
                <select name="" id="" className=' bg-background-foreground border-none rounded-md'>
                    <option value={role}>{role}</option>
                </select>
                <Link href={`/owner/users/${id}`} className='flex text-secondary gap-2 text-xs font-semibold hover:underline ml-auto'>
                    Details
                    <Image src={detailsButton} alt='details-button' />
                </Link>
            </td>
        </>
    );
};

export default UserItem;
