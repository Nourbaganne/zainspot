'use client';

import detailsButton from '@/app/assets/owner/users/arrow-right.svg';
import Image from 'next/image';
import upButton from '@/app/assets/owner/users/Up.svg';
import downButton from '@/app/assets/owner/users/Down.svg';
import Link from 'next/link';
import User from '@/app/interfaces/User';
import Role from '@/app/interfaces/Role';
import Loader from '@/app/components/loader';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import toast from 'react-hot-toast';

const USERS_LIST_HEADER = [
	{ title: 'User', hasFiltering: true },
	{ title: 'Email & Number', hasFiltering: false },
	{ title: 'Subscriptions', hasFiltering: false },
	{ title: 'Renewals', hasFiltering: true },
	{ title: 'Role', hasFiltering: false },
	// {title: 'Actions', hasFiltering: false},
];

interface Props {
	users: User[];
	roles: Role[];
	selectedUsers: string[];
	setSelectedUsers: (
		selectedUsers: string[] | ((prevSelectedUsers: string[]) => string[]),
	) => void;
	isLoading: boolean;
	access_token: string | undefined
}
const UsersTable = ({
	users,
	roles,
	selectedUsers,
	setSelectedUsers,
	isLoading,
	access_token
}: Props) => {
	const handleSelectUser = (userEmail: string) => {
		setSelectedUsers((prevSelectedUsers: string[]) => {
			if (prevSelectedUsers.includes(userEmail)) {
				return prevSelectedUsers.filter((email: string) => email !== userEmail);
			} else {
				return [...prevSelectedUsers, userEmail];
			}
		});
	};

	if (isLoading) {
		return <Loader />
	}

	const handleRoleChanges = async ({ userId, updatedRole }: { userId: number; updatedRole: number }) => {
		try {
			const response = await axiosInstance.patch(`http://localhost:3001/user/${userId}`, {
				role: {
					id: updatedRole
				}
			},
				{
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				},
			);

			if (response.status === 200) {
				toast.success('User Role is updated successfully!');
			}
		} catch (error) {
			toast.error('Failed to update user role.');
			console.error(error);
		}
	}

	return (
		<table className='mt-6 bg-background border rounded-lg w-full overflow-hidden'>
			{/* Table Header */}
			<tr className='text-span border-b'>
				<th>
					<div className='flex-center'>
						<input
							type='checkbox'
							name='selectAllUsers'
							id='selectAllUsers'
							className='m-0 p-0 rounded-sm'
						/>
					</div>
				</th>
				{USERS_LIST_HEADER.map((item, index) => (
					<td
						key={index}
						className={`${item.hasFiltering && 'flex items-center gap-2'
							} text-left p-4`}
					>
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
			{users?.length > 0 &&
				users.map((user: User, index: number) => (
					<tr className='border-t' key={index}>
						<td className='p-4'>
							<div className='flex-center'>
								<input
									type='checkbox'
									checked={selectedUsers.includes(user.email)}
									onChange={() => handleSelectUser(user.email)}
									className='accent-primary rounded-sm'
								/>
							</div>
						</td>
						<td className='p-4'>
							<span>{user.name}</span>
						</td>
						<td className='p-4'>
							<div>
								<span>{user.email}</span>
							</div>
							<div>
								<span>{user.businessNumber}</span>
							</div>
						</td>
						<td className='p-4'>
							{user.subscriptions.length > 0 ? (
								<div className='flex gap-1'>
									{user.subscriptions.map((sub, index) => (
										<h1
											key={index}
											className='bg-background-foreground rounded-md text-text font-light py-1 px-2 text-md'
										>
											{sub.city.city}
										</h1>
									))}
								</div>
							) : (
								<span>N/A</span>
							)}
						</td>
						<td className={`p-4 ${false ? 'text-primary' : 'text-alert-dark'}`}>
							<span className='font-semibold'>Failed</span>{' '}
							<span className='font-light'>(N/A)</span>
						</td>
						<td className='p-4'>
							<select
								name='selectRole'
								id='selectRole'
								className=' bg-background-foreground border-none rounded-md px-2 py-1'
								onChange={(e) => handleRoleChanges({ userId: user?.id, updatedRole: Number(e.target.value) })}
							>
								<option defaultValue={user?.role.id}> {user?.role.name}</option>
								{roles.map((role) => {

									return (
										role.id !== user?.role.id && (
											<option key={role.id} value={role.id} className=''>
												{role.name.charAt(0).toUpperCase() + role.name.slice(1)}
											</option>
										)

									);
								})}
							</select>
						</td>
						<td className='p-4'>
							<Link
								href={`/owner/users/${user.id}`}
								className='flex text-secondary gap-2 text-xs font-semibold hover:underline ml-auto'
							>
								<span>Details</span>
								<Image src={detailsButton} alt='details-button' />
							</Link>
						</td>
					</tr>
				))}
			{users?.length == 0 && !isLoading && <div>No users found</div>}
		</table>
	);
};

export default UsersTable;
