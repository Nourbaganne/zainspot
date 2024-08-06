"use client"
import Breadcrumb from '@/app/zainspotter/components/breadcrumb';
import React, { useState } from 'react';
import RoleCard from '../components/roleCard';
import searchIcon from '@/app/assets/owner/users/search-outline.svg'
import Image from 'next/image';

const Users = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('View All');

  const breadcrumbItems = [
    { label: "Owner Dashboard", href: "/owner" },
    { label: "Users" },
  ];

  const USERS_HEADER_DATA = [
    { title: 'ZainSpotters', value: 10107, editPermissions: false, stats: { increase: true, purcentage: 2.15 } },
    { title: 'Admins', value: 3, editPermissions: true, stats: { increase: true, purcentage: 2.15 } },
    { title: 'Managers', value: 1, editPermissions: true, stats: { increase: false, purcentage: 2.15 } }
  ]

  const FILTERING_TYPE = ["View All", "Zainspotters", "Admins", "Managers"];

  return (
    <div className='flex flex-col gap-6 bg-background-foreground md:px-24 md:py-8 md:pb-20'>
      <Breadcrumb items={breadcrumbItems} />
      <div className='grid gap-x-8 gap-y-4 grid-cols-1 md:grid-cols-3'>
        {USERS_HEADER_DATA.map((data, index) => (
          <RoleCard key={index} title={data?.title} value={data?.value} editPermissions={data?.editPermissions} stats={data?.stats} />
        ))}
      </div>
      <div className='flex flex-col pt-5 gap-10'>
        <h1 className='flex gap-2 font-semibold text-xl'>
          All Users <span className='font-normal'>(10,111)</span>
        </h1>
        <div className='flex justify-between'>
          <div className='bg-span-background flex text-span-foreground rounded-md p-1 w-fit gap-2'>
            <div className='flex gap-2 md:font-semibold whitespace-nowrap md:whitespace-normal max-w-56 md:max-w-none overflow-x-auto'>
              {FILTERING_TYPE.map((value, index) => (
                <div
                  key={index}
                  className={`px-2 py-1 rounded-md cursor-pointer ${selectedFilter === value ? 'bg-background text-text' : ''}`}
                  onClick={() => setSelectedFilter(value)}
                >
                  {value}
                </div>
              ))}
            </div>
            <button className='border-l border-l-button text-xl px-2' type="button">
              +
            </button>
          </div>

          <div className='flex gap-5 items-center '>
            <div className='flex bg-background gap-2 items-center p-2 text-span border border-button rounded-md'>
              <Image src={searchIcon} alt='search-user' />
              <input type="text" name="" id="" placeholder='Search User' className='w-80 outline-none' />
            </div>
            <div className='flex gap-3 text-xs font-semibold'>
              <button className='py-3 px-4 border-2 border-button  text-button-text rounded-md'>Deselect All</button>
              <button className='py-3 px-4 border-2 border-primary rounded-md text-primary'>Select All</button>
              <button className='py-3 px-4 bg-button text-background rounded-md'>Desactivate User</button>
            </div>

          </div>

        </div>
        <div className='flex flex-col pl-12 py-10 border border-button rounded-md bg-background'>
          <div className='flex gap-36 text-sm text-span border-b-2 pb-3' >
            <div className='flex gap-2 items-center'>
              <input type="checkbox" name="" id="" />
              <div>
                User
              </div>
            </div>
            <div>
              Email & Number
            </div>
            <div>
              Subscriptions
            </div>
            <div>
              Renewals
            </div>
            <div>
              Role
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
