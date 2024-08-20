'use client';

import Image from 'next/image';
import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { DonutChart } from '@tremor/react';

import MapImage from '../../assets/owner/reports/map.png';

const CardVisitors = () => {
  return (
    <div className='card'>
      <div>
        <span className='card-title'>Visitors</span>
      </div>
      <div className='mt-4 flex items-center justify-between'>
        <div>
          <span className='text-3xl font-bold'>11,450</span>
        </div>
        <div className='text-center'>
          <span className='badge-success'>
            <FiArrowUp className='inline' />
            <span className='text-sm'>2.15%</span>
          </span>
          <div>
            <span className='text-gray-400 text-xs'>vs. last month</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const CardSubscribers = () => {
  return (
    <div className='card'>
      <div className='flex-between'>
        <div>
          <span className='card-title'>Subscribers</span>
        </div>
        <div>
          <a className='text-sm font-medium text-green-600 hover:text-green-700' href="">View all <FaArrowRight className='text-xs inline' /></a>
        </div>
      </div>
      <div className='mt-4 flex items-center justify-between'>
        <div>
          <span className='text-3xl font-bold'>9,065</span>
        </div>
        <div className='text-center'>
          <span className='badge-danger'>
            <FiArrowDown className='inline' />
            <span className='text-sm'>1.15%</span>
          </span>
          <div>
            <span className='text-gray-400 text-xs'>vs. last month</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const CardUsers = () => {
  return <div className='card'>
    <div className='flex flex-col'>
      <div className='flex-between'>
        <div className='flex-center'>
          <span className='text-3xl font-bold'>11,650</span>
          <span className='text-md font-light ml-3'>Users</span>
        </div>
        <div className='text-center'>
          <span className='badge-danger'>
            <FiArrowDown className='inline' />
            <span className='text-sm'>1.15%</span>
          </span>
          <div>
            <span className='text-gray-400 text-xs'>vs. 2023</span>
          </div>
        </div>
      </div>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <select name="year" id="selectYear" className='form-control'>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
        <button className='btn btn-primary py-6'>
          <span>View Details</span>
          <FaArrowRight className='inline ml-2' />
        </button>
      </div>
    </div>
    <div className='mt-4'>
      Graph code here
    </div>
  </div>
}

const CardRevenue = ()=>{
  const data = [
    {
      name: 'United States',
      value: 68,
      revenue: '124,850.40',
      color: 'green-700',
    },
    {
      name: 'India',
      value: 28,
      revenue: '54,850.40',
      color: 'yellow-600',
    },
    {
      name: 'Other',
      value: 4,
      revenue: '6,850.40',
      color: 'blue-600',
    },
  ];
  const dataFormatter = (number: number) =>
    `$ ${Intl.NumberFormat('us').format(number).toString()}`;
  
  return <div className='card'>
    <div>
      <span className='card-title'>Revenue</span>
    </div>
    <div className='mt-4 flex items-center justify-between'>
      <div>
        <span className='text-3xl font-bold'>$726,711,450</span>
      </div>
      <div className='text-center'>
        <span className='badge-success'>
          <FiArrowUp className='inline' />
          <span className='text-sm'>2.25%</span>
        </span>
        <div>
          <span className='text-gray-400 text-xs'>vs. last month</span>
        </div>
      </div>
    </div>
    <div className='mt-4 flex flex-col'>
      <DonutChart
        data={data}
        colors={['green-700', 'yellow-600', 'blue-600']}
        variant="pie"
        valueFormatter={dataFormatter}
        onValueChange={(v) => console.log(v)}
        className='w-full h-80'
        showTooltip={false}
      />
      <div className='mt-4'>
        {data.map((item, index) => (
          <div key={item.name} className='grid grid-cols-4 text-left border-b py-3'>
            <div className='col-span-2 flex items-center gap-2'>
              <div className={`circle-xs bg-${item.color}`}></div>
              <span className='text-gray-600'>{item.name}</span>
            </div>
            <div><span className='font-bold'>{item.value}%</span></div>
            <div><span className='font-bold'>${item.revenue}</span></div>
          </div>
        ))}
      </div>
    </div>
  </div>
}

const CardLocations = ()=>{
  const locationsData = [
    { name: "United States", subscribers: '7,904' },
    { name: "India", subscribers: '5,345' },
    { name: "United Kingdom", subscribers: '4,234' },
    { name: "Canada", subscribers: '3,456' },
    { name: "Singapore", subscribers: '12' },
    { name: "Bangladesh", subscribers: '0' },
  ]

  return <div className="card">
    <div>
      <Image src={MapImage} alt='ZainSpot locations in the map' />
    </div>
    <div className='mt-4'>
      <div><span className='card-number'>6</span></div>
      <div className='mt-2'><span className='card-title'>ZainSpot Countries Worldwide</span></div>
    </div>
    <div className='mt-2'>
      <table className='w-full text-left overflow-x-scroll'>
        <tr className='border-b'>
          <th className='text-gray-400 font-medium'>Country</th>
          <th className='text-gray-400 font-medium border-b-2 border-green-600'>Subscribers</th>
        </tr>
        {locationsData.map((location, index) => (
          <tr key={index} className='border-b'>
            <td className='text-gray-500 py-2'>{location.name}</td>
            <td className='py-2'>{location.subscribers}</td>
          </tr>
        ))}
      </table>
      <div className='mt-6'>
        <a href="" className='btn btn-outline-primary btn-lg'>
          <span>Manage Locations</span>
          <FaArrowRight className='inline ml-2' />
        </a>
      </div>
    </div>
  </div>
}

const Reports = () => {
  return (
    <div className='bg-gray-100 grid grid-cols-2 gap-4 p-4'>
      <div className="col-span-2 md:col-span-1">
        <CardVisitors />
      </div>
      <div className='col-span-2 md:col-span-1'>
        <CardSubscribers/>
      </div>
      <div className='col-span-2'>
        <CardUsers/>
      </div>
      <div className='col-span-2'>
        <CardRevenue/>
      </div>
      <div className='col-span-2'>
        <CardLocations/>
      </div>
    </div>
  )
}

export default Reports