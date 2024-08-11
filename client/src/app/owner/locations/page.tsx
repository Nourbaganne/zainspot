import Breadcrumb from '@/app/zainspotter/components/breadcrumb';
import Image from 'next/image';
import React from 'react';
import worldImage from '@/app/assets/owner/locations/World Map.svg';
import eyeOffIcon from '@/app/assets/owner/locations/eye-off-outline.svg';
import plusIcon from '@/app/assets/owner/locations/plus.svg';

const Locations = () => {
  const breadcrumbItems = [
    { label: "owner_dashboard", href: "/owner" },
    { label: "Locations" },
  ];

  return (
    <div className='flex flex-col gap-6 bg-background-foreground md:px-24 md:py-8 md:pb-20'> 
      <Breadcrumb items={breadcrumbItems} />
      <Image src={worldImage} alt='world-map'></Image>

      <div className='grid grid-cols-3 text-span'>
        <div className='flex gap-2'>
          <span className='font-bold'>6 </span> Countries
          <span>8 Cities</span>
          <span>17 Locations</span>
        </div>
        <div className='grid grid-cols-2 col-span-2'>
          <input type="text" placeholder="Search.." className='col-span-1'></input>
          <div className='flex justify-end gap-5'>
            <button className='border-2 border-primary rounded-lg px-3 py-2 flex items-center gap-2'>
              <Image src={eyeOffIcon} alt='eye off icon'></Image> 
              View Hidden
            </button>
            <button className='bg-primary rounded-lg text-white px-3 py-2 flex items-center gap-2'>
              <Image src={plusIcon} alt='plus icon'></Image> 
              Create New
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Locations