'use client';

import Breadcrumb from '@/app/zainspotter/components/breadcrumb';
import React, { useContext, useEffect, useRef, useState } from 'react';
import RoleCard from '../components/roleCard';
import searchIcon from '@/app/assets/owner/users/search-outline.svg';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import { AuthContext } from '@/app/contexts/authContext';
import nextIcon from '@/app/assets/owner/users/chevron-forward.svg';
import previousIcon from '@/app/assets/owner/users/chevron-back.svg';
import UsersTable from './components/UsersTable';
import RolesModal from './components/RolesModal';
import Loader from '@/app/components/loader';
import { WithAuth } from '@/app/lib/withAuth';

const Users = () => {
	const [selectedFilter, setSelectedFilter] = useState<string>('');
	const [searchUser, setSearchUser] = useState<string>('');
	const [debouncedSearchUser, setDebouncedSearchUser] = useState<string>(searchUser);
	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [initialCounts, setInitialCounts] = useState({
		zainspotter: {
			value: 0,
			increasmentValue: 0,
		},
		admin: {
			value: 0,
			increasmentValue: 0
		},
		owner: {
			value: 0,
			increasmentValue: 0
		},
	});
	const [totalUsers, setTotalUsers] = useState<number>(0);

	const { user } = useContext(AuthContext);

	const rolesModalRef = useRef<any>(null);

	const [roles, setRoles] = useState([]);
	function getRoles() {
		axiosInstance.get('/role')
			.then((res) => {
				setRoles(res.data);
			})
			.catch((error) => {
				console.error("Failed to fetch roles:", error);
			});
	}

	useEffect(() => {
		getRoles();
	}, []);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearchUser(searchUser);
		}, 800);

		return () => {
			clearTimeout(handler);
		};
	}, [searchUser]);

	const breadcrumbItems = [
		{ label: 'owner_dashboard', href: '/owner' },
		{ label: 'users' },
	];

	const FILTERING_TYPE = [
		{ title: 'View All', value: '' },
		{ title: 'Zainspotters', value: 'zainspotter' },
		{ title: 'Admins', value: 'admin' },
		{ title: 'Owners', value: 'owner' },
	];

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['users', currentPage, debouncedSearchUser, selectedFilter],
		queryFn: () =>
			axiosInstance.get(
				`/user?page=${currentPage}&name=${debouncedSearchUser}&filter=${selectedFilter}`,
				{
					headers: {
						Authorization: `Bearer ${user?.access_token}`,
					},
				},
			),
	});

	useEffect(() => {
		if (data && !searchUser && !selectedFilter) {
			setInitialCounts({
				zainspotter: { value: data.data.counts.zainspotter || 0, increasmentValue: data.data.percentageChange.zainspotter || 0, },
				admin: { value: data.data.counts.admin || 0, increasmentValue: data.data.percentageChange.admin || 0 },
				owner: { value: data.data.counts.owner || 0, increasmentValue: data.data.percentageChange.owner || 0 },
			});
			setTotalUsers(data?.data.totalItems || 0);
		}
	}, [data, searchUser, selectedFilter, currentPage]);

	if (isError) return <h1>{error.message}</h1>;
	if (isLoading && !searchUser && !selectedFilter) return <Loader />

	const generatePageNumbers = () => {
		const totalPages = data?.data.totalPages || 1;
		const maxButtons = 5;
		const pageNumbers = [];
		let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
		let endPage = startPage + maxButtons - 1;

		if (endPage > totalPages) {
			endPage = totalPages;
			startPage = Math.max(1, endPage - maxButtons + 1);
		}

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i);
		}

		if (startPage > 1) pageNumbers.unshift(1, '...');
		if (endPage < totalPages) pageNumbers.push('...', totalPages);

		return pageNumbers;
	};

	const checkIncreasment = (value: number) => value >= 0;

	const USERS_HEADER_DATA = [
		{
			title: 'ZainSpotters',
			value: initialCounts.zainspotter.value,
			editPermissions: false,
			stats: {
				increase: checkIncreasment(initialCounts.zainspotter.increasmentValue),
				percentage: Math.abs(initialCounts.zainspotter.increasmentValue),
			},
		},
		{
			title: 'Admins',
			value: initialCounts.admin.value,
			editPermissions: true,
			stats: {
				increase: checkIncreasment(initialCounts.admin.increasmentValue),
				percentage: Math.abs(initialCounts.admin.increasmentValue),
			},
		},
		{
			title: 'Owners',
			value: initialCounts.owner.value,
			editPermissions: true,
			stats: {
				increase: checkIncreasment(initialCounts.owner.increasmentValue),
				percentage: Math.abs(initialCounts.owner.increasmentValue),
			},
		},
	];

	return (
		<div className='flex flex-col gap-6 bg-background-foreground px-4 md:px-24 py-4 md:py-8 md:pb-20'>
			<Breadcrumb items={breadcrumbItems} className='pl-2 overflow-x-auto' />

			<RolesModal rolesModalRef={rolesModalRef} roles={roles} />

			<div className='grid gap-x-8 gap-y-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
				{USERS_HEADER_DATA.map((data, index) => (
					<RoleCard
						key={index}
						title={data?.title}
						value={data?.value}
						editPermissions={data?.editPermissions}
						stats={data?.stats}
					/>
				))}
			</div>

			<div className='w-full pl-2 md:pl-0'>
				<h1 className='text-xl sm:text-2xl font-bold'>
					<span className='font-bold'>All Users</span>{' '}
					<span className='font-light'>({totalUsers})</span>
				</h1>
				{/* Filters */}
				<div className='mt-4 flex flex-col gap-4 md:flex-row justify-between md:items-center'>
					{/* Filter Buttons and Add Role */}
					<div className="bg-span-background flex items-center gap-2 p-2 rounded-md overflow-x-auto">
						<div className="flex gap-2 whitespace-nowrap">
							{FILTERING_TYPE.map((filter, index) => (
								<div
									key={index}
									className={`px-3 py-2 rounded-md cursor-pointer text-sm md:text-base ${selectedFilter === filter.value ? 'bg-background text-text' : 'hover:bg-gray-200'
										}`}
									onClick={() => setSelectedFilter(filter.value)}
								>
									{filter.title}
								</div>
							))}
						</div>

						<button
							className="border-l border-gray-300 text-xl px-4 flex-shrink-0"
							type="button"
							onClick={() => {
								rolesModalRef.current.open(true);
							}}
						>
							+
						</button>
					</div>


					{/* Search and Action Buttons */}
					<div className='flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto'>
						{/* Search Input */}
						<div className='flex items-center bg-background border border-button text-span rounded-md p-2 w-full sm:w-60'>
							<Image
								src={searchIcon}
								alt='Search icon'
								className='ml-2 opacity-50'
							/>
							<input
								type='search'
								value={searchUser}
								onChange={(e) => setSearchUser(e.target.value)}
								placeholder='Search User'
								className='w-full outline-none border-none px-2 focus:ring-0'
							/>
						</div>
						{/* Action Buttons */}
						<div className='w-full sm:w-auto'>
							{selectedUsers.length > 0 ? (
								<div className='flex flex-wrap gap-3 text-xs font-semibold justify-center sm:justify-start'>
									<button
										className='py-2 px-4 border-2 rounded-md border-alert-dark text-alert-dark'
										onClick={() => setSelectedUsers([])}
									>
										Deselect All
									</button>
									<button
										className='py-2 px-4 border-2 border-primary rounded-md text-primary'
										onClick={() =>
											setSelectedUsers(
												data?.data.items.map(
													(user: { email: string }) => user.email,
												),
											)
										}
									>
										Select All
									</button>
									<button className='py-2 px-4 bg-alert text-background rounded-md'>
										Deactivate User
									</button>
								</div>
							) : (
								<div className='flex flex-wrap gap-3 text-xs font-semibold justify-center sm:justify-start'>
									<button
										disabled
										className='py-2 px-4 border-2 rounded-md border-button text-button-text cursor-not-allowed'
									>
										Deselect All
									</button>
									<button
										className='py-2 px-4 border-2 border-primary rounded-md text-primary'
										onClick={() =>
											setSelectedUsers(
												data?.data.items.map(
													(user: { email: string }) => user.email,
												),
											)
										}
									>
										Select All
									</button>
									<button
										disabled
										className='py-2 px-4 bg-button text-background rounded-md cursor-not-allowed'
									>
										Deactivate User
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
				<>
					{
						isLoading && searchUser ? (
							<Loader />
						) : (
							<>
								<div className='overflow-x-auto'>
									<UsersTable
										users={data?.data.items}
										roles={roles}
										selectedUsers={selectedUsers}
										setSelectedUsers={setSelectedUsers}
										isLoading={isLoading}
										access_token={user?.access_token}
									/>
								</div>

								<div className='mt-6 flex justify-end items-center gap-4'>
									<button
										className={`px-4 py-2 text-sm flex items-center gap-2 rounded-lg text-span bg-gray-100 hover:bg-gray-200`}
										disabled={currentPage === 1}
										onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
									>
										<Image src={previousIcon} alt='previous-page' />
										Previous
									</button>
									<div className='flex gap-2 overflow-x-auto'>
										{generatePageNumbers().map((page, index) =>
											page === '...' ? (
												<span key={index} className='text-primary cursor-not-allowed'>
													...
												</span>
											) : (
												<button
													key={index}
													className={`px-3 py-1 rounded-lg text-sm ${currentPage === page
														? 'bg-primary text-background'
														: 'bg-transparent text-primary hover:bg-primary hover:text-background'
														}`}
													onClick={() => setCurrentPage(page as number)}
												>
													{page}
												</button>
											),
										)}
									</div>
									<button
										className={`px-4 py-2 flex items-center gap-2 text-sm rounded-lg text-primary bg-gray-100 hover:bg-gray-200`}
										disabled={currentPage === data?.data.totalPages}
										onClick={() =>
											setCurrentPage((prev) =>
												Math.min(prev + 1, data?.data.totalPages),
											)
										}
									>
										Next
										<Image src={nextIcon} alt='next-page' />
									</button>
								</div>

							</>
						)
					}
				</>
			</div>
		</div>
	);
};

export default WithAuth(Users, 'owner');
