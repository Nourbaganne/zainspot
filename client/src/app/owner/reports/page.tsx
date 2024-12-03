'use client';

import Image from 'next/image';
import React, { useContext } from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { AreaChart, DonutChart } from '@tremor/react';

import MapImage from '../../assets/owner/reports/map.png';
import Container from '@/app/components/Container';
import { WithAuth } from '@/app/lib/withAuth';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import { AuthContext } from '@/app/contexts/authContext';
import { useCurrency } from '@/app/contexts/CurrencyContext';
import { MoneyValue } from '@/app/components/MoneyValue';
import Loader from '@/app/components/loader';
import { Currency } from '@/app/lib/currencyConvert';
import { UseVisitorCounts } from '@/app/lib/useVisitorCounts';
import { UseUSerStats } from '@/app/lib/useUserStats';
import Link from 'next/link';

interface CardProps {
  title: string;
  value: number;
  increasment: number;
  navigation?: string;
}


interface CountyProps {
  name: string;
  value: number;
  percentage?: number;
  subscribers?: number;
}

interface RevenueProps {
  totalRevenue: number;
  percentageIncrease: number;
  topCountries: CountyProps[];
  allCountries: CountyProps[];
}

interface CardUsersProps {
  userStats: {
    totalUsers: number,
    yearlyCounts: {
      year: number,
      count: number,
      incrementPercentage: number,
      monthlyBreakdown: [
        {
          month: string,
          count: number
        }
      ]
    },
    monthlyCounts: {
      month: number,
      count: number,
      incrementPercentage: number
    }
  };
  visitorStats: {
    totalVisitors: number,
    increasment: number,
    yearlyData: [
      {
        month: string,
        visitors: number
      }
    ]
  }
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
            <a className='text-sm font-medium text-green-600 hover:text-green-700' href={navigation}>View all <FaArrowRight className='text-xs inline' /></a>
          </div>
        )}
      </div>
      <div className='mt-4 flex items-center justify-between'>
        <div>
          <span className='text-3xl font-bold'>{value.toLocaleString()}</span>
        </div>
        <div className='text-center'>
          <span className={`${increasment < 0 ? 'badge-danger' : 'badge-success'}`} >
            {increasment < 0 ? <FiArrowDown className='inline' /> : <FiArrowUp className='inline' />}
            <span className='text-sm'>{increasment}%</span>
          </span>
          <div>
            <span className='text-gray-400 text-xs'>vs. last month</span>
          </div>
        </div>
      </div>
    </div >
  )
}


const valueFormatter = (number: number) => `$ ${Intl.NumberFormat('us').format(number).toString()}`;

const CardUsers = ({ userStats, visitorStats }: CardUsersProps) => {
  const chartdata = userStats?.yearlyCounts.monthlyBreakdown.map((userMonth) => {
    const visitorMonth = visitorStats.yearlyData.find(
      (visitorMonth) => visitorMonth.month === userMonth.month
    );

    return {
      date: userMonth.month, 
      subscribers: userMonth.count,
      visitors: visitorMonth ? visitorMonth.visitors : 0,
    };
  });

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-x-6">
        {/* Card Header */}
        <div className="w-full md:w-5/12 flex-between">
          <div className="flex-center">
            <span className="text-3xl font-bold">{userStats?.totalUsers}</span>
            <span className="text-md font-light ml-3">Users</span>
          </div>
          <div className="text-center md:flex md:items-center md:gap-2">
            <span
              className={`${userStats.yearlyCounts.incrementPercentage < 0 ? 'badge-danger' : 'badge-success'
                }`}
            >
              {userStats?.yearlyCounts.incrementPercentage < 0 ? (
                <FiArrowDown className="inline" />
              ) : (
                <FiArrowUp className="inline" />
              )}
              <span className="text-sm">{userStats?.yearlyCounts.incrementPercentage}%</span>
            </span>
            <div>
              <span className="text-gray-400 text-xs">vs. {userStats?.yearlyCounts.year - 1}</span>
            </div>
          </div>
        </div>

        {/* Year Selector */}
        <div className="mt-4 md:mt-0 grid grid-cols-2 gap-4 w-full md:w-6/12 md:pl-6">
          <select name="year" id="selectYear" className="form-control form-control-lg">
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
          <Link href="/owner/users" className="btn btn-lg btn-primary">
            <span>View Details</span>
            <FaArrowRight className="inline ml-2" />
          </Link>
        </div>
      </div>

      {/* Graph */}
      <div className="mt-4">
        <AreaChart
          className="my-12"
          data={chartdata}
          index="date"
          categories={['subscribers', 'visitors']}
          colors={['yellow-600', 'green-600']}
          showLegend={false}
          showTooltip={false}
          connectNulls={true}
        />
        {/* Legend */}
        <div className="flex items-center">
          <div className="circle-xs bg-yellow-600"></div>
          <span className="ml-2 text-gray-800">Subscribers</span>
          <div className="ml-8 circle-xs bg-green-600"></div>
          <span className="ml-2 text-gray-800">Visitors</span>
        </div>
      </div>
    </div>
  );
};

const CardRevenue = ({ revenue, currency }: { revenue: RevenueProps, currency: Currency }) => {

  const colorPalette = ['green-700', 'yellow-600', 'blue-600', 'red-500', 'purple-500'];

  const countriesWithColors = revenue.topCountries.map((country: CountyProps, index: number) => ({
    ...country,
    color: colorPalette[index % colorPalette.length],
  }));

  return (
    <div className="card">
      <div>
        <span className="card-title">Revenue</span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <span className="text-3xl font-bold">
            <MoneyValue
              value={revenue.totalRevenue}
              fromCurrency="USD"
              toCurrency={currency}
              decimals={0} />
          </span>
        </div>
        <div className="text-center">
          <span className={`${revenue.percentageIncrease < 0 ? 'badge-danger' : 'badge-success'}`}>
            <FiArrowUp className="inline" />
            <span className="text-sm">{revenue.percentageIncrease}%</span>
          </span>
          <div>
            <span className="text-gray-400 text-xs">vs. last month</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        <DonutChart
          data={countriesWithColors}
          colors={colorPalette}
          variant="pie"
          valueFormatter={valueFormatter}
          onValueChange={(v) => console.log(v)}
          className="w-full h-80"
          showTooltip={false}
        />
        <div className="mt-4 xl:mt-12">
          {countriesWithColors?.map((item: any) => (
            <div key={item.name} className="grid grid-cols-4 text-left border-b py-3">
              <div className="col-span-2 flex items-center gap-2">
                <div className={`circle-xs bg-${item.color}`}></div>
                <span className="text-gray-600">{item.name}</span>
              </div>
              <div>
                <span className="font-bold">{item.percentage}%</span>
              </div>
              <div>
                <span className="font-bold">
                  <MoneyValue
                    value={item.value}
                    fromCurrency="USD"
                    toCurrency={currency}
                    decimals={0} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const CardLocations = ({ countries, currency }: { countries: CountyProps[], currency: Currency }) => {
  return (
    <div className="card flex flex-col md:flex-row p-4 bg-white rounded-lg ">
      <div className="flex-center">
        <Image src={MapImage} alt="ZainSpot locations in the map" />
      </div>
      <div className="mt-4">
        <div>
          <div><span className="card-number">
            {countries && `${countries.length}`}
          </span></div>
          <div className="mt-2"><span className="card-title">ZainSpot Countries Worldwide</span></div>
        </div>
        <div className="mt-2">
          <div className="overflow-x-auto">
            <table className="min-w-[480px] md:min-w-[600px] text-left bg-background rounded-lg">
              <thead>
                <tr className="border-b-2">
                  <th className="text-gray-400 font-medium px-4 py-2">Country</th>
                  <th className="text-gray-400 font-medium text-end pr-6 py-2 border-b-2 border-green-600">Subscribers</th>
                  <th className="text-primary font-medium text-end pr-6 py-2">Earned</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(countries) ? (
                  countries.map((country, index) => (
                    <tr key={index} className="border-b">
                      <td className="text-gray-500 py-4 px-4">{country.name}</td>
                      <td className="pr-8 text-end py-4">{country.subscribers?.toLocaleString()}</td>
                      <td className="text-end py-4 font-semibold pr-8">
                        <MoneyValue
                          value={country.value}
                          fromCurrency="USD"
                          toCurrency={currency}
                          decimals={0}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-4">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <a href="/owner/locations" className="btn btn-outline-primary btn-lg">
              <span>Manage Locations</span>
              <FaArrowRight className="inline ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

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
          <HeaderCard title="Visitors" value={visitors.totalVisitors} increasment={visitors.increasment} />
        </div>
        <div className="col-span-12 md:col-span-6 xl:col-span-4">
          <HeaderCard title="Subscribers" value={userStats.totalUsers} increasment={userStats.monthlyCounts.incrementPercentage} navigation="/owner/users" />
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