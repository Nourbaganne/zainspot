'use client';
import { AuthContext } from '@/app/contexts/authContext';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import Breadcrumb from '@/app/zainspotter/components/breadcrumb';
import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
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
import { HandleRoleChanges } from '@/app/lib/userRoleChanging';
import Role from '@/app/interfaces/Role';
import Link from 'next/link';
import { useRoles } from '@/app/contexts/RoleContext';
import Translation from '@/app/components/translation';
import { useCurrency } from '@/app/contexts/CurrencyContext';
import { MoneyValue } from '@/app/components/MoneyValue';

const Page = ({ params }: { params: { id: number } }) => {

  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);


  const { currency } = useCurrency();
  const { user } = useContext(AuthContext);
  const { roles } = useRoles();


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

  const fullname = `${data?.data.name} ${data?.data?.middlename ?? ''} ${data?.data.lastName ?? ''}`.trim();

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
            <div className='flex gap-2 items-center'>
              <h1 className='text-4xl font-semibold'>{fullname}</h1>
              <select
                name='selectRole'
                id='selectRole'
                className='bg-background-foreground border border-border text-sm rounded-md p-1'
                onChange={(e) =>
                  HandleRoleChanges({
                    access_token: user?.access_token,
                    userId: currentUser?.id,
                    updatedRole: Number(e.target.value),
                  })
                }
              >
                <option value={currentUser?.role.id}>{currentUser?.role.name}</option>
                {roles
                  .filter((role: Role) => role.id !== currentUser?.role.id && role.name)
                  .map((role: Role) => (
                    <option key={role.id} value={role.id}>
                      {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                    </option>
                  ))}
              </select>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-sm text-span font-light'>
                <Translation translationKey='userInfo_id' />{currentUser?.id}
              </p>
              <p className='text-sm text-span font-light'>
                <Translation translationKey='userInfo_membership' />{' '}
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
              <Translation translationKey='userInfo_downloadBtn' />
            </button>
            <button className='px-4 py-2 text-primary border-2 border-primary rounded-md'>
              <Translation translationKey='userInfo_editBtn' />
            </button>
            <Link
              href={`/owner/users/${currentUser?.id}/sendMail?fullname=${fullname}&email=${currentUser?.email}&id=${currentUser?.id}`}
              className='px-4 py-2 border-2 border-primary bg-primary text-background rounded-md'>
              <Translation translationKey='userInfo_sendmailBtn' />
            </Link>

            <button className='px-4 py-2 border-2 border-alert bg-alert text-background rounded-md'>
              <Translation translationKey='userInfo_desactivationBtn' />
            </button>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-7'>
          <div className='flex flex-col gap-5'>
            <h1 className='text-lg font-semibold'>
              <Translation translationKey='userInfo_businessInfo' />
            </h1>
            <div className='flex flex-col gap-3'>
              {BUSINESS_LIST.map((item, index) => (
                <div key={index} className='grid grid-cols-3 gap-4 text-sm'>
                  <p className='col-span-1 text-span'>{item.title}</p>
                  <h1 className='col-span-2'>{item.value}</h1>
                </div>
              ))}
            </div>
          </div>
          {
            subscriptions.length > 0 ? (
              <div className='flex flex-col gap-4'>
                <div className='flex justify-between'>
                  <div className='flex gap-1 items-center'>
                    <h1 className='text-lg font-semibold'>
                      <Translation translationKey='userInfo_revenue' />
                    </h1>
                    <Image src={revenueIcon} alt='revenue' />
                  </div>
                  <div className='flex gap-1 items-center'>
                    <p className='text-span font-light text-xs'>
                      <Translation translationKey='userInfo_totalrevenue' />
                    </p>
                    <h1 className='text-lg font-semibold'>
                      <MoneyValue
                        value={total}
                        fromCurrency='USD'
                        toCurrency={currency}
                        decimals={0}
                      />
                    </h1>
                  </div>
                </div>
                <CustomStackedBarChart subscriptions={subscriptions} />
              </div>
            ) : (
              <h1>
                No subscriptions yet
              </h1>
            )
          }

        </div>
        <SubscriptionList
          userId={params?.id}
          access_token={user?.access_token}
          setSubscriptions={setSubscriptions}
          setTotal={setTotal}
        />
      </div>
    </div >
  );
};

export default WithAuth(Page, 'owner');