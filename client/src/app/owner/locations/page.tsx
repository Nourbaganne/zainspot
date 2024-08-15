'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Breadcrumb from '@/app/zainspotter/components/breadcrumb';
import Dialog from './components/dialog';
import worldImage from '@/app/assets/owner/locations/World Map.svg';
import eyeOffIcon from '@/app/assets/owner/locations/eye-off-outline.svg';
import plusIcon from '@/app/assets/owner/locations/plus.svg';
import searchIcon from '@/app/assets/owner/users/search-outline.svg';
import upButton from '@/app/assets/owner/users/Up.svg';
import downButton from '@/app/assets/owner/users/Down.svg';

const Locations = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const breadcrumbItems = [
    { label: "owner_dashboard", href: "/owner" },
    { label: "locations" },
  ];
  const LOCATION_LIST_HEADER = ['Location', 'City & Country', 'ZS Gold', 'ZS Classic'];

  return (
    <div className='flex flex-col gap-6 bg-background-foreground md:px-24 md:py-8 md:pb-20'>
      <Breadcrumb items={breadcrumbItems} />
      <Image src={worldImage} alt='world-map' />

      <div className='grid grid-cols-4 text-span'>
        <div className='flex items-center gap-4 text-sm'>
          <h1 className='flex items-center gap-1'>
            <span className='font-bold text-2xl'>6 </span> Countries
          </h1>
          <h1 className='flex items-center gap-1'>
            <span className='font-bold text-2xl'>8</span>
            Cities
          </h1>
          <h1 className='flex items-center gap-1'>
            <span className='font-bold text-2xl'>17</span>
            Locations
          </h1>
        </div>
        <div className='grid grid-cols-5 col-span-3'>
          <div className='flex col-span-3 bg-background gap-2 items-center p-2 text-span border border-button rounded-md'>
            <Image src={searchIcon} alt='search-user' />
            <input
              type="search"
              placeholder="Search Location"
              className="outline-none"
            />
          </div>
          <div className='flex col-span-2 justify-end gap-5'>
            <button className='border-2 border-primary rounded-lg px-3 py-2 flex items-center gap-2'>
              <Image src={eyeOffIcon} alt='eye off icon'></Image>
              View Hidden
            </button>
            <button
              className='bg-primary rounded-lg text-white px-3 py-2 flex items-center gap-2'
              onClick={handleDialogOpen}
            >
              <Image src={plusIcon} alt='plus icon'></Image>
              Create New
            </button>
          </div>
        </div>
      </div>
      <div className='flex flex-col py-6 bg-background pl-6 border rounded-md'>
        <div className='flex items-center border-b-2 text-span pb-4 pt-6 pl-4'>
          <div className='grid grid-cols-5 text-sm w-full pl-2'>
            {LOCATION_LIST_HEADER.map((item, index) => (
              <div key={index} className='flex items-center gap-2'>
                <div className='flex flex-col gap-1'>
                  <button>
                    <Image src={upButton} alt='up-users' />
                  </button>
                  <button>
                    <Image src={downButton} alt='down-users' />
                  </button>
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Dialog isOpen={isDialogOpen} onClose={handleDialogClose} />
    </div>
  );
};

export default Locations;
