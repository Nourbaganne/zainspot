"use client"
import Breadcrumb from '@/app/zainspotter/components/breadcrumb';
import React, { createRef, useContext, useEffect, useRef, useState } from 'react';
import RoleCard from '../components/roleCard';
import searchIcon from '@/app/assets/owner/users/search-outline.svg';
import upButton from '@/app/assets/owner/users/Up.svg';
import downButton from '@/app/assets/owner/users/Down.svg';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import { AuthContext } from '@/app/contexts/authContext';
import nextIcon from '@/app/assets/owner/users/chevron-forward.svg'
import previousIcon from '@/app/assets/owner/users/chevron-back.svg'
import detailsButton from '@/app/assets/owner/users/arrow-right.svg'
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import Modal from '@/app/components/Modal';


interface User {
  id: number;
  name: string;
  middlename?: string;
  lastName: string;
  businessName: string;
  email: string;
  businessNumber: string;
  subscriptions: { city: { city: string }, endDate: string }[];
  role: { id: number; role: string };
}

const Users = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [searchUser, setSearchUser] = useState<string>('');
  const [debouncedSearchUser, setDebouncedSearchUser] = useState<string>(searchUser);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { user } = useContext(AuthContext);

  const rolesModalRef = useRef(null);

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

      <Modal ref={rolesModalRef} />

      <div className='grid gap-x-8 gap-y-4 grid-cols-1 md:grid-cols-3'>
        {USERS_HEADER_DATA.map((data, index) => (
          <RoleCard key={index} title={data?.title} value={data?.value} editPermissions={data?.editPermissions} stats={data?.stats} />
        ))}
      </div>
      <div className='w-full'>
        <h1 className='text-2xl'>
          <span className='font-bold'>All Users</span> <span className='font-light'>({data?.data.totalItems ?? 0})</span>
        </h1>
        {/* Filters */}
        <div className='mt-4 flex justify-between items-center'>
          <div className='bg-span-background flex text-span-foreground rounded-md p-1 w-fit gap-2'>
            <div className='flex gap-2 md:font-semibold whitespace-nowrap md:whitespace-normal max-w-56 md:max-w-none overflow-x-auto'>
              {FILTERING_TYPE.map((filter, index) => (
                <div
                  key={index}
                  className={`px-2 py-2 rounded-md cursor-pointer ${selectedFilter === filter.value ? 'bg-background text-text' : ''}`}
                  onClick={() => setSelectedFilter(filter.value)}
                >
                  {filter.title}
                </div>
              ))}
            </div>
            <button
              className='border-l border-gray-300 text-xl px-4' 
              type="button"
              onClick={()=>{rolesModalRef.current.open(true)}}
            >
              +
            </button>
          </div>

          <div className='flex gap-5 items-center'>
            {/* Search Input */}
            <div className='flex bg-background gap-2 items-center p-1 text-span border border-button rounded-md'>
              <Image src={searchIcon} alt='Search icon' className='ml-2 opacity-50' />
              <input
                type="search"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder="Search User"
                className="w-80 outline-none border-none px-0 focus:border-none focus:outline-none focus:ring-0"
              />
            </div>
            {/* Action Buttons */}
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

        {/* Table */}
        <table className='mt-6 bg-background border rounded-lg w-full overflow-hidden'>
          {/* Table Header */}
          <tr className='text-span border-b'>
            <th>
              <div className="flex-center">
                <input type="checkbox" name="selectAllUsers" id="selectAllUsers" className='m-0 p-0 rounded-sm' />
              </div>
            </th>
            {USERS_LIST_HEADER.map((item, index) => (
              <td key={index} className={`${item.hasFiltering && 'flex items-center gap-2'} text-left p-4`}>
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
                <span>{item.title}</span>
              </td>
            ))}
          </tr>
          {/* Table Data */}
          {data?.data.items.length > 0 && data?.data.items.map((user: User, index: number) => (
            <tr className='border-t' key={index}>
              <td className='p-4'>
                <div className='flex-center'>
                  <input
                    type="checkbox"
                    checked={true}
                    onChange={() => {}}
                    className='accent-primary rounded-sm'
                  />
                </div>
              </td>
              <td className='p-4'>
                <span>{user.name}</span>
              </td>
              <td className='p-4'>
                <div><span>{user.email}</span></div>
                <div><span>{user.businessNumber}</span></div>
              </td>
              <td className='p-4'>
                {user.subscriptions.length > 0 ? (
                  <div className='flex gap-1'>
                    {user.subscriptions.map((sub, index) => (
                      <h1 key={index} className='bg-background-foreground rounded-md text-text font-light py-1 px-2 text-md'>
                        {sub.city.city}
                      </h1>))}
                  </div>):(
                  <span>N/A</span>
                  )}
              </td>
              <td className={`p-4 ${false ? 'text-primary' : 'text-alert-dark'}`}>
                <span className='font-semibold'>
                  Failed
                </span> <span className='font-light'>
                  (N/A)
                </span>
              </td>
              <td className='p-4'>
                <select name="selectRole" id="selectRole" className=' bg-background-foreground border-none rounded-md'>
                  <option value="owner">Owner</option>
                  <option value="admin">Admin</option>
                  <option value="zainspotter">Zainspotter</option>
                </select>
              </td>
              <td className='p-4'>
                <Link href={`/owner/users/${user.id}`} className='flex text-secondary gap-2 text-xs font-semibold hover:underline ml-auto'>
                  <span>Details</span>
                  <Image src={detailsButton} alt='details-button' />
                </Link>
              </td>
            </tr>
          ))}
          {data?.data.items.length == 0 && <div>No users found</div>}
        </table>

        {/* Pagination */}
        {!searchUser && (
          <div className='mt-6 flex justify-end gap-4'>
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
