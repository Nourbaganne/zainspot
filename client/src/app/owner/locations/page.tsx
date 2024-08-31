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

  if (isLoading) return <Loader />;
  if (isError) return <h1>{error.message}</h1>;


  const filteredCities = data?.data.items.filter((city: CityProps) => isHidden === city.hidden);


  return (
    <div className='flex flex-col gap-6 bg-background-foreground px-4 md:px-24 py-8 md:pb-20'>
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <Image src={worldImage} alt='world-map' />

      <LocationsHeader
        searchCity={searchCity}
        setSearchCity={setSearchCity}
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        setIsDialogOpen={setIsDialogOpen}
      />
      <div className='flex flex-col py-6 bg-background pl-6 border rounded-md overflow-x-auto'>
        <div className=''>
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
      </div>

      {!searchCity && filteredCities?.length > 0 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={data?.data.totalPages} />
      )}
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
};

export default Locations;
