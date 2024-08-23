'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Breadcrumb from '@/app/zainspotter/components/breadcrumb';
import Dialog from './components/dialog';
import worldImage from '@/app/assets/owner/locations/World Map.svg';
import visibleLogo from '@/app/assets/owner/locations/visibleCitiesLogo.svg';
import eyeOffIcon from '@/app/assets/owner/locations/eye-off-outline.svg';
import plusIcon from '@/app/assets/owner/locations/plus.svg';
import searchIcon from '@/app/assets/owner/users/search-outline.svg';
import upButton from '@/app/assets/owner/users/Up.svg';
import downButton from '@/app/assets/owner/users/Down.svg';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import nextIcon from '@/app/assets/owner/users/chevron-forward.svg';
import previousIcon from '@/app/assets/owner/users/chevron-back.svg';
import CityItem from './components/cityItem';


interface PerMonth {
  duration: number;
  amount: number;
  tax: number
}

export interface CityProps {
  id: number,
  city: string,
  country: string,
  hidden: boolean,
  location: { title: string; };
  goldPrice: { value: number; tax: number };
  classicPrice: { perMonth: PerMonth[] };
}

const Locations = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchCity, setSearchCity] = useState<string>('');
  const [debouncedSearchCity, setDebouncedSearchCity] = useState<string>(searchCity);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchCity(searchCity);
    }, 800);

    return () => {
      clearTimeout(handler);
    };
  }, [searchCity]);

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

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['cities', currentPage, debouncedSearchCity],
    queryFn: () => axiosInstance.get(`/cities?page=${currentPage}&name=${debouncedSearchCity}`),
  });

  if (isLoading) return <h1>Loading ...</h1>;
  if (isError) return <h1>{error.message}</h1>;

  const generatePageNumbers = () => {
    const totalPages = data?.data.totalPages || 1;
    const maxButtons = 5;
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (startPage > 1) pageNumbers.unshift(1, '...');
    if (endPage < totalPages) pageNumbers.push('...', totalPages);

    return pageNumbers;
  };


  const filteredCities = data?.data.items.filter((city: CityProps) => isHidden === city.hidden);


  return (
    <div className='flex flex-col gap-6 bg-background-foreground md:px-24 md:py-8 md:pb-20'>
      <Breadcrumb items={breadcrumbItems} />
      <Image src={worldImage} alt='world-map' />

      <div className='grid grid-cols-4 text-span'>
        <div className='flex items-center gap-4 text-sm'>
          <h1 className='flex items-center gap-1'>
            <span className='font-bold text-2xl'>6</span> Countries
          </h1>
          <h1 className='flex items-center gap-1'>
            <span className='font-bold text-2xl'>8</span> Cities
          </h1>
          <h1 className='flex items-center gap-1'>
            <span className='font-bold text-2xl'>17</span> Locations
          </h1>
        </div>
        <div className='grid grid-cols-5 col-span-3'>
          <div className='flex col-span-3 bg-background gap-2 items-center p-2 text-span border border-button rounded-md'>
            <Image src={searchIcon} alt='search-user' />
            <input
              type="search"
              placeholder="Search Location"
              className="outline-none border-none w-full"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            />
          </div>
          <div className='flex col-span-2 justify-end gap-5 items-center'>
            <button

              onClick={() => setIsHidden(!isHidden)}
            >
              {isHidden ? (
                <div className='border-2 border-primary text-primary rounded-lg px-3 py-2 flex items-center gap-2'>
                  <Image src={visibleLogo} alt='visible-cities' />
                  <h1>View Visible</h1>
                </div>
              ) : (
                <div className='border-2 border-primary text-primary rounded-lg px-3 py-2 flex items-center gap-2'>
                  <Image src={eyeOffIcon} alt='eye off icon' />
                  <h1>View Hidden</h1>
                </div>

              )}
            </button>
            <button
              className='bg-primary rounded-lg text-white px-3 py-[9px] flex items-center gap-2'
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
        <>
          {filteredCities?.length > 0 ? (
            filteredCities.map((city: CityProps, index: number) => (
              <CityItem
                key={index}
                id={city.id}
                city={city.city}
                country={city.country}
                location={city.location}
                goldPrice={city.goldPrice}
                classicPrice={city.classicPrice}
                hidden={city.hidden}

              />
            ))
          ) : (
            <h1>No cities found</h1>
          )}
        </>
      </div>
      {!searchCity && filteredCities?.length > 0 && (
        <div className='flex justify-end gap-4'>
          <button
            className={`px-4 py-3 text-sm flex items-center gap-3 rounded-lg text-span`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            <Image src={previousIcon} alt='previous-page' />
            Previous
          </button>
          <div className='flex gap-2'>
            {generatePageNumbers().map((page, index) =>
              page === '...' ? (
                <span key={index} className='text-primary cursor-not-allowed'>...</span>
              ) : (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg ${currentPage === page ? 'bg-primary text-background' : 'text-primary'}`}
                  onClick={() => setCurrentPage(page as number)}
                >
                  {page}
                </button>
              )
            )}
          </div>
          <button
            className={`px-4 py-3 flex text-sm items-center gap-3 rounded-lg text-primary`}
            disabled={currentPage === data?.data.totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, data?.data.totalPages))}
          >
            Next
            <Image src={nextIcon} alt='next-page' />
          </button>
        </div>
      )}
      <Dialog isOpen={isDialogOpen} onClose={handleDialogClose} />
    </div>
  );
};

export default Locations;
