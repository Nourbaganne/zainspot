'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Breadcrumb from '@/app/zainspotter/components/breadcrumb';
import Dialog from './components/dialog';
import worldImage from '@/app/assets/owner/locations/World Map.svg';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import nextIcon from '@/app/assets/owner/users/chevron-forward.svg';
import previousIcon from '@/app/assets/owner/users/chevron-back.svg';
import CityItem from './components/cityItem';
import { BREADCRUMB_ITEMS, CityProps, LOCATION_LIST_HEADER } from '@/app/constants/owner-location';
import { generatePageNumbers } from '@/app/lib/owner-locations';
import LocationsHeader from './components/locationsHeader';
import TableHeader from './components/tableHeader';


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


  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['cities', currentPage, debouncedSearchCity],
    queryFn: () => axiosInstance.get(`/city?page=${currentPage}&name=${debouncedSearchCity}`),
  });

  if (isLoading) return <h1>Loading ...</h1>;
  if (isError) return <h1>{error.message}</h1>;


  const filteredCities = data?.data.items.filter((city: CityProps) => isHidden === city.hidden);


  return (
    <div className='flex flex-col gap-6 bg-background-foreground md:px-24 md:py-8 md:pb-20'>
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <Image src={worldImage} alt='world-map' />

      <LocationsHeader
        searchCity={searchCity}
        setSearchCity={setSearchCity}
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        setIsDialogOpen={setIsDialogOpen}
      />
      <div className='flex flex-col py-6 bg-background pl-6 border rounded-md'>
        <TableHeader />
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
            {generatePageNumbers({ totalPage: data?.data.totalPages, currentPage }).map((page, index) =>
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
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
};

export default Locations;
