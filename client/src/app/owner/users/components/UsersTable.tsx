'use client';

import detailsButton from '@/app/assets/owner/users/arrow-right.svg';
import Image from 'next/image';
import upButton from '@/app/assets/owner/users/Up.svg';
import downButton from '@/app/assets/owner/users/Down.svg';
import Link from 'next/link';
import User from '@/app/interfaces/User';
import Role from '@/app/interfaces/Role';
import Loader from '@/app/components/loader';
import { HandleRoleChanges } from '@/app/lib/userRoleChanging';
import { useRoles } from '@/app/contexts/RoleContext';
import Translation from '@/app/components/translation';

const USERS_LIST_HEADER = [
	{ title: 'User', hasFiltering: true },
	{ title: 'Email & Number', hasFiltering: false },
	{ title: 'Subscriptions', hasFiltering: false },
	{ title: 'Renewals', hasFiltering: true },
	{ title: 'Role', hasFiltering: false },
	// {title: 'Actions', hasFiltering: false},
];

interface Counts {
	value: number;
	increasmentValue: number;
}

interface InitialCounts {
	zainspotter: Counts;
	admin: Counts;
	owner: Counts;
}

interface Props {
	users: User[];
	selectedUsers: string[];
	setSelectedUsers: (
		selectedUsers: string[] | ((prevSelectedUsers: string[]) => string[]),
	) => void;
	isLoading: boolean;
	access_token: string | undefined;
	setInitialCounts: (counts: InitialCounts | ((prevCounts: InitialCounts) => InitialCounts)) => void;
}
const UsersTable = ({
	users,
	selectedUsers,
	setSelectedUsers,
	isLoading,
	access_token,
	setInitialCounts,

}: Props) => {

	const { roles } = useRoles();

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



	const getFullName = (user: User) => {
		return `${user.name} ${user.middlename ? user.middlename + ' ' : ''}${user.lastName}`;
	};



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
							<span>
								{getFullName(user)}
							</span>
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
									{user.subscriptions.slice(0, 3).map((sub, index) => (
										<h1
											key={index}
											className='bg-background-foreground rounded-md text-text font-light py-1 px-2 text-md'
										>
											{sub.city.city}
										</h1>
									))}
									{user.subscriptions.length > 3 && (
										<h1 className='bg-background-foreground rounded-md text-text font-light py-1 px-2 text-md'>
											+{user.subscriptions.length - 3}
										</h1>
									)}
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
							<div className="relative inline-block w-full">
								<select
									name="selectRole"
									id="selectRole"
									className={`appearance-none bg-background-foreground border-none rounded-md px-2 py-1 pr-5 w-full
											${user?.role.id === 2 && 'bg-secondary-foreground text-primary'}
											${user?.role.id == 1 && 'text-secondary bg-secondary-background'}
											`}
									onChange={(e) =>
										HandleRoleChanges({
											access_token,
											userId: user?.id,
											updatedRole: Number(e.target.value),
											previousRole: user?.role.id,
											setInitialCounts,
										})
									}
								>
									<option value={user?.role.id}>{user?.role.name}</option>

									{roles
										.filter((role) => role.id !== user?.role.id && role.name)
										.map((role) => (
											<option key={role.id} value={role.id}>
												{role.name.charAt(0).toUpperCase() + role.name.slice(1)}
											</option>
										))}
								</select>
								<span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
									<svg
										className="w-4 h-4 text-gray-500"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
									</svg>
								</span>
							</div>

						</td>

						<td className='p-4'>
							<Link
								href={`/owner/users/${user.id}`}
								className='flex text-secondary gap-2 text-xs font-semibold hover:underline ml-auto'
							>
								<span>
									<Translation translationKey='userDetails_btn' />
								</span>
								<Image src={detailsButton} alt='details-button' />
							</Link>
						</td>
					</tr>
				))}
			{users?.length == 0 && !isLoading &&
				<div>
					<Translation translationKey='userTable_empty' />
				</div>}
		</table>
	);
};

export default UsersTable;
