'use client';
import { AuthContext } from '@/app/contexts/authContext';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import Breadcrumb from '@/app/zainspotter/components/breadcrumb';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import genreIcon from '@/app/assets/owner/users/genreIcon.svg';
import birthdayIcon from '@/app/assets/owner/users/birthdayIcon.svg';
import pointIc from '@/app/assets/owner/users/pointIc.svg';
import downloadIcon from '@/app/assets/owner/users/download-outline.svg';
import revenueIcon from '@/app/assets/owner/users/information-circle-outline.svg';
import Image from 'next/image';
import CustomStackedBarChart from '../../components/barChart';
import SubscriptionList from '../../components/subscriptionList';
import Loader from '@/app/components/loader';
import { WithAuth } from '@/app/lib/withAuth';

const Page = ({ params }: { params: { id: number } }) => {
  const { user } = useContext(AuthContext);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['user', params.id],
    queryFn: () =>
      axiosInstance.get(`/user/${params.id}`, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      }),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  let currentUser = data?.data;

  const fullname = `${data?.data.name} ${data?.data?.middlename ?? ''} ${
    data?.data.lastName ?? ''
  }`.trim();

  const breadcrumbItems = [
    { label: 'owner_dashboard', href: '/owner' },
    { label: 'users', href: '/owner/users' },
    { label: fullname },
  ];

  const BUSINESS_LIST = [
    { title: 'Business Legal Name', value: currentUser?.businessName },
    { title: 'Business Trading Name', value: currentUser?.tradeName },
    { title: 'Business Type', value: currentUser?.businessType },
    { title: 'Email', value: currentUser?.email },
    { title: 'Number', value: currentUser?.businessNumber },
    { title: 'Website', value: currentUser?.businessWebsite },
    {
      title: 'Location',
      value: `${currentUser?.city}, ${currentUser?.state}, ${currentUser?.country}`,
    },
    {
      title: 'Future Regions of Interest for expansion',
      value: currentUser?.interestRegion,
    },
    { title: 'Social Media Pages', value: currentUser?.mediaProfile },
  ];

  return (
    <div className='flex flex-col gap-6 bg-background-foreground md:px-24 md:py-8 md:pb-20'>
      <Breadcrumb items={breadcrumbItems} />
      <div className='card flex flex-col gap-10 md:py-10'>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-4'>
            <div className='flex gap-2'>
              <h1 className='text-3xl font-semibold'>{fullname}</h1>
              <select
                name=''
                id=''
                className='bg-background-foreground rounded-md border-border'
              >
                <option value={data?.data?.role.name}>
                  {data?.data?.role.name}
                </option>
              </select>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-sm text-span font-light'>
                Member since{' '}
                {new Date(data?.data.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <div className='flex gap-2 items-center text-sm'>
                <div className='flex gap-1 items-center'>
                  <Image src={genreIcon} alt='genre' />
                  <h1>{data?.data.gender}</h1>
                </div>
                <Image src={pointIc} alt='point' />
                <div className='flex gap-1 items-center'>
                  <Image src={birthdayIcon} alt='birthday' />
                  <p>
                    {new Date(data?.data.birthday).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex gap-3 items-start justify-center text-sm font-bold'>
            <button className='text-span flex  px-4 py-2 gap-2 items-center'>
              <Image src={downloadIcon} alt='download' />
              DOWNLOAD
            </button>
            <button className='px-4 py-2 text-primary border-2 border-primary rounded-md'>
              EDIT INFORMATION
            </button>
            <button className='px-4 py-2 border-2 border-alert bg-alert text-background rounded-md'>
              DESACTIVE USER
            </button>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-7'>
          <div className='flex flex-col gap-5'>
            <h1 className='text-lg font-semibold'>Business</h1>
            <div className='flex flex-col gap-1'>
              {BUSINESS_LIST.map((item, index) => (
                <div key={index} className='grid grid-cols-3 gap-4 text-sm'>
                  <p className='col-span-1 text-span'>{item.title}</p>
                  <h1 className='col-span-2'>{item.value}</h1>
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex justify-between'>
              <div className='flex gap-1 items-center'>
                <h1 className='text-lg font-semibold'>Revenue</h1>
                <Image src={revenueIcon} alt='revenue' />
              </div>
              <div className='flex gap-1 items-center'>
                <p className='text-span font-light text-xs'>Total</p>
                <h1 className='text-lg font-semibold'>$764,900</h1>
              </div>
            </div>
            <CustomStackedBarChart />
          </div>
        </div>
        <SubscriptionList
          userId={params?.id}
          access_token={user?.access_token}
        />
      </div>
    </div>
  );
};

export default WithAuth(Page);
