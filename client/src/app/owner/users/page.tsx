"use client"
import Breadcrumb from '@/app/zainspotter/components/breadcrumb';
import React, { useContext, useEffect, useState } from 'react';
import RoleCard from '../components/roleCard';
import searchIcon from '@/app/assets/owner/users/search-outline.svg';
import upButton from '@/app/assets/owner/users/Up.svg';
import downButton from '@/app/assets/owner/users/Down.svg';
import Image from 'next/image';
import UserItem from '../components/userItem';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import { AuthContext } from '@/app/contexts/authContext';
import nextIcon from '@/app/assets/owner/users/chevron-forward.svg'
import previousIcon from '@/app/assets/owner/users/chevron-back.svg'


interface User {
  id: number;
  name: string;
  middlename?: string;
  lastName: string;
  businessName: string;
  email: string;
  businessNumber: string;
  subscriptions: { city: { name: string }, endDate: string }[];
  role: { id: number; role: string };
}

const Users = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [searchUser, setSearchUser] = useState<string>('');
  const [debouncedSearchUser, setDebouncedSearchUser] = useState<string>(searchUser);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchUser(searchUser);
    }, 800);

    return () => {
      clearTimeout(handler);
    };
  }, [searchUser]);

  const breadcrumbItems = [
    { label: "owner_dashboard", href: "/owner" },
    { label: "users" },
  ];

  const USERS_LIST_HEADER = [
    { title: 'User', hasFiltering: true },
    { title: 'Email & Number', hasFiltering: false },
    { title: 'Subscriptions', hasFiltering: false },
    { title: 'Renewals', hasFiltering: true },
    { title: 'Role', hasFiltering: false },
  ];


  const FILTERING_TYPE = [
    { title: "View All", value: '' },
    { title: "Zainspotters", value: 'zainspotter' },
    { title: "Admins", value: 'admin' },
    { title: "Managers", value: 'manager' }];

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users', currentPage, debouncedSearchUser, selectedFilter],
    queryFn: () => axiosInstance.get(`/user?page=${currentPage}&name=${debouncedSearchUser}&filter=${selectedFilter}`, {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    }),
    
  });


  if (isLoading) return <h1>Loading ...</h1>;
  if (isError) return <h1>{error.message}</h1>;

  const zainspottersCount = data?.data.counts.zainspotter || 0;
  const adminsCount = data?.data.counts.admin || 0;
  const managersCount = data?.data.counts.manager || 0;

  const handleSelectUser = (userEmail: string) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userEmail)) {
        return prevSelectedUsers.filter((email) => email !== userEmail);
      } else {
        return [...prevSelectedUsers, userEmail];
      }
    });
  };

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

  const checkIncreasment = (value: number) => value >= 0;

  const USERS_HEADER_DATA = [
    { title: 'ZainSpotters', value: zainspottersCount, editPermissions: false, stats: { increase: checkIncreasment(data?.data.percentageChange.zainspotter), percentage: Math.abs(data?.data.percentageChange.zainspotter) } },
    { title: 'Admins', value: adminsCount, editPermissions: true, stats: { increase: checkIncreasment(data?.data.percentageChange.admin), percentage: Math.abs(data?.data.percentageChange.admin) } },
    { title: 'Managers', value: managersCount, editPermissions: true, stats: { increase: checkIncreasment(data?.data.percentageChange.manager), percentage: Math.abs(data?.data.percentageChange.manager) } },
  ];

  return (
    <div className='flex flex-col gap-6 bg-background-foreground md:px-24 md:py-8 md:pb-20'>
      <Breadcrumb items={breadcrumbItems} />
      <div className='grid gap-x-8 gap-y-4 grid-cols-1 md:grid-cols-3'>
        {USERS_HEADER_DATA.map((data, index) => (
          <RoleCard key={index} title={data?.title} value={data?.value} editPermissions={data?.editPermissions} stats={data?.stats} />
        ))}
      </div>
      <div className='flex flex-col pt-5 gap-10'>
        <h1 className='flex gap-2 font-semibold text-xl'>
          All Users <span className='font-normal'>({data?.data.totalItems ?? 0})</span>
        </h1>
        <div className='flex justify-between items-center'>
          <div className='bg-span-background flex text-span-foreground rounded-md p-1 w-fit gap-2'>
            <div className='flex gap-2 md:font-semibold whitespace-nowrap md:whitespace-normal max-w-56 md:max-w-none overflow-x-auto'>
              {FILTERING_TYPE.map((filter, index) => (
                <div
                  key={index}
                  className={`px-2 py-1 rounded-md cursor-pointer ${selectedFilter === filter.value ? 'bg-background text-text' : ''}`}
                  onClick={() => setSelectedFilter(filter.value)}
                >
                  {filter.title}
                </div>
              ))}
            </div>
            <button className='border-l border-l-button text-xl px-2' type="button">
              +
            </button>
          </div>

          <div className='flex gap-5 items-center'>
            <div className='flex bg-background gap-2 items-center p-1 text-span border border-button rounded-md'>
              <Image src={searchIcon} alt='search-user' />
              <input
                type="search"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder="Search User"
                className="w-80 outline-none border-none"
              />
            </div>
            <div>
              {selectedUsers.length > 0 ? (
                <div className='flex gap-3 text-xs font-semibold'>
                  <button className={`py-3 px-4 border-2 rounded-md border-alert-dark text-alert-dark `} onClick={() => setSelectedUsers([])}>Deselect All</button>
                  <button className='py-3 px-4 border-2 border-primary rounded-md text-primary' onClick={() => setSelectedUsers(data?.data.items.map((user: { email: string; }) => user.email))}>Select All</button>
                  <button className='py-3 px-4 bg-alert text-background rounded-md'>Deactivate User</button>
                </div>
              ) : (
                <div className='flex gap-3 text-xs font-semibold'>
                  <button disabled className={`py-3 px-4 border-2 rounded-md border-button text-button-text `}>Deselect All</button>
                  <button className='py-3 px-4 border-2 border-primary rounded-md text-primary' onClick={() => setSelectedUsers(data?.data.items.map((user: { email: string; }) => user.email))}>Select All</button>
                  <button disabled className='py-3 px-4 bg-button text-background rounded-md'>Deactivate User</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-col py-6 bg-background pl-6 border rounded-md'>
          <div className='flex items-center  border-b-2 text-span pb-4 pt-6   pl-4'>
            <input type="checkbox" name="" id="" />
            <div className='grid grid-cols-5 text-sm  w-full  pl-2'>
              {USERS_LIST_HEADER.map((item, index) => (
                <div key={index} className={`${item.hasFiltering && 'flex items-center gap-2'}`}>
                  {item.hasFiltering && (
                    <div className='flex flex-col gap-1'>
                      <button>
                        <Image src={upButton} alt='up-users' />
                      </button>
                      <button>
                        <Image src={downButton} alt='down-users' />
                      </button>
                    </div>
                  )}
                  {item.title}
                </div>
              ))}
            </div>
          </div>
          {data?.data.items.length > 0 ? (
            <>
              {data?.data.items.map((user: User, index: number) => (
                <UserItem
                  key={index}
                  id={user?.id}
                  user={{ name: `${user.name} ${user?.middlename ?? ''} ${user.lastName ?? ''}`.trim(), desc: user.businessName }}
                  contact={{ email: user.email, phoneNumber: user.businessNumber }}
                  subscriptions={user.subscriptions.length > 0 ? user.subscriptions.map(sub => sub.city.name) : null}
                  renewals={user.subscriptions.length > 0 ? { upcoming: new Date(user.subscriptions[0].endDate) > new Date(), date: new Date(user.subscriptions[0].endDate).toLocaleDateString() } : { upcoming: false, date: 'N/A' }}
                  role={user?.role.role}
                  setSelectedUsers={handleSelectUser}
                  isSelected={selectedUsers.includes(user.email)}
                />
              ))}
            </>
          ) : (
            <div>No users found</div>
          )}
        </div>

        {!searchUser && (
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
      </div>
    </div>
  )
};

export default Users;
