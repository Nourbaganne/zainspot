'use client';

import React, { useContext } from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import Container from '@/app/components/Container';
import { WithAuth } from '@/app/lib/withAuth';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import { AuthContext } from '@/app/contexts/authContext';
import { useCurrency } from '@/app/contexts/CurrencyContext';
import Loader from '@/app/components/loader';
import { UseVisitorCounts } from '@/app/lib/useVisitorCounts';
import { UseUSerStats } from '@/app/lib/useUserStats';
import CardUsers from './components/cardUsers';
import CardLocations from './components/cardLocations';
import CardRevenue from './components/cardRevenue';
import Translation from '@/app/components/translation';

interface CardProps {
  title: string;
  value: number;
  increasment: number;
  navigation?: string;
}

const HeaderCard = ({ title, value, increasment, navigation }: CardProps) => {
  return (
    <div className='card'>
      <div className='flex-between'>
        <div>
          <span className='card-title'>{title}</span>
        </div>
        {navigation && (
          <div>
            <a className='text-sm font-medium text-green-600 hover:text-green-700' href={navigation}>
              <Translation translationKey='headerCard_header' />
              <FaArrowRight className='text-xs inline' />
            </a>
          </div>
        )}
      </div>
      <div className='mt-4 flex items-center justify-between'>
        <div>
          <span className='text-3xl font-bold'>{value?.toLocaleString()}</span>
        </div>
        <div className='text-center'>
          <span className={`${increasment < 0 ? 'badge-danger' : 'badge-success'}`} >
            {increasment < 0 ? <FiArrowDown className='inline' /> : <FiArrowUp className='inline' />}
            <span className='text-sm'>{increasment}%</span>
          </span>
          <div>
            <span className='text-gray-400 text-xs'>
              <Translation translationKey='headerCard_span' />
            </span>
          </div>
        </div>
      </div>
    </div >
  )
}

const Reports = () => {
  const breadcrumbItems = [
    { label: 'owner_dashboard', href: '/owner' },
    { label: 'Reports' },
  ];

  const { user } = useContext(AuthContext);
  const { currency } = useCurrency();
  const visitors = UseVisitorCounts();
  const userStats = UseUSerStats();

  const { data, isLoading } = useQuery({
    queryKey: ['revenue'],
    queryFn: async () =>
      await axiosInstance.get('/subscriptions/revenue', {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      }),
  });

  if (isLoading) return <Loader />

  return (
    <Container breadcrumbItems={breadcrumbItems}>
      <style>{'.card { height: 100%; }'}</style>
      <div className="bg-gray-100 grid grid-cols-12 gap-4 p-4">
        <div className="col-span-12 md:col-span-6 xl:col-span-4">
          <HeaderCard title="Visitors" value={visitors?.totalVisitors} increasment={visitors?.increasment} />
        </div>
        <div className="col-span-12 md:col-span-6 xl:col-span-4">
          <HeaderCard title="Subscribers" value={userStats?.totalUsers} increasment={userStats?.monthlyCounts.incrementPercentage} navigation="/owner/users" />
        </div>
        <div className="col-span-12 xl:col-span-8">
          <CardUsers userStats={userStats} visitorStats={visitors} />
        </div>
        <div className="col-span-12 xl:row-start-1 xl:row-end-3 xl:col-span-4 xl:col-start-9 xl:row-span-3">
          <CardRevenue revenue={data?.data} currency={currency} />
        </div>
        <div className="col-span-12">
          <CardLocations countries={data?.data.allCountries || []} currency={currency} />
        </div>
      </div>
    </Container>
  )
}

export default WithAuth(Reports, ['owner', 'admin'])