'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Breadcrumb from '@/app/zainspotter/components/breadcrumb';
import Dialog from './components/dialog';
import worldImage from '@/app/assets/owner/locations/World Map.svg';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import CityItem from './components/cityItem';
import { BREADCRUMB_ITEMS, CityProps } from '@/app/constants/owner-location';
import LocationsHeader from './components/locationsHeader';
import TableHeader from './components/tableHeader';
import Pagination from './components/pagination';
import Loader from '@/app/components/loader';
import { WithAuth } from '@/app/lib/withAuth';
import Translation from '@/app/components/translation';


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


  useEffect(() => {
    setCurrentPage(1);
  }, [isHidden]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['cities', currentPage, debouncedSearchCity, isHidden],
    queryFn: () =>
      axiosInstance.get(`/city`, {
        params: {
          page: currentPage,
          limit: 5, // Ensure limit is consistent with backend default
          name: debouncedSearchCity,
          hidden: isHidden,
        },
      }),
    staleTime: 5 * 60 * 1000, // Optional: 5 minutes cache
  });


  if (isError) return <h1>{error.message}</h1>;

  const filteredCities = data?.data.items;


  return (
    <div className='flex flex-col gap-6 bg-background-foreground px-4 sm:px-6 md:px-8 lg:px-16 py-8 md:pb-20'>
      <Breadcrumb items={BREADCRUMB_ITEMS} />

      <div className='w-full h-auto relative'>
        <Image
          src={worldImage}
          alt='world-map'
          layout='responsive'
          objectFit='contain'
          className='rounded-md'
        />
      </div>

      <LocationsHeader
        searchCity={searchCity}
        setSearchCity={setSearchCity}
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        setIsDialogOpen={setIsDialogOpen}
        locations={data?.data.totalItems}
        cities={data?.data.totalCities}
        countries={data?.data.totalCountries}
      />

      <div className='flex flex-col py-6 bg-background pl-6 pr-2 md:pr-6 border rounded-md overflow-x-auto'>
        <div className='min-w-full'>
          <TableHeader />
          <>
            {isLoading ? (
              <Loader />
            ) : (
              <div className='overflow-x-auto' >
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
                  <h1 className='py-8'>
                    <Translation translationKey='locationHeader_emptyTable' />
                  </h1>
                )}
              </div>)
            }

          </>
        </div>
      </div>

      {!searchCity && filteredCities?.length > 0 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={data?.data.totalPages}
        />
      )}

      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>

  );
};

export default WithAuth(Locations, ['owner', 'admin']);
