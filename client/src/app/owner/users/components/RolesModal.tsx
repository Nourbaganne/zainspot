import Modal from '@/app/components/Modal';
import Role from '@/app/interfaces/Role';
import Permission from '@/app/interfaces/Permission';
import { useEffect, useState } from 'react';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import Translation from '@/app/components/translation';

interface Props {
	rolesModalRef: any;
}

const RolesModal = ({ rolesModalRef }: Props) => {
	const [permissions, setPermissions] = useState<Permission[]>([]);
	function getPermissions() {
		axiosInstance.get('/permission').then((res) => {
			console.log('permissions', res.data);
			setPermissions(res.data);
		});
	}

	useEffect(() => {
		getPermissions();
	}, []);

	const [newRoleName, setNewRoleName] = useState<string>('');
	const [newRolePermissions, setNewRolePermissions] = useState<Permission[]>(
		[],
	);

	const handleCheckboxChange = (currPermission: Permission) => {
		setNewRolePermissions((prevPermissions) => {
			if (prevPermissions.includes(currPermission)) {
				// Remove permission if already checked
				return prevPermissions.filter((id) => id !== currPermission);
			} else {
				// Add permission if not checked
				return [...prevPermissions, currPermission];
			}
		});
	};

	function createRole() {
		let newRole = {
			name: newRoleName,
			permissions: newRolePermissions,
		};

		axiosInstance.post('/role', newRole).then((res) => {
			if (res.status == 201) {
				alert('Role created successfully');
				rolesModalRef.current.close();
			}
		});
	}

	return (
		<Modal
			ref={rolesModalRef}
			title='Create New Role'
			subtitle='Create a new role, give it a name, and check its permissions.'
			onButtonClick={createRole}
			buttonText='Create Role'
		>
				<div className='form-group'>
					<label
						htmlFor='roleName'
						className='text-sm font-medium !text-gray-400'
					>
						<Translation translationKey='roleName_label' />
					</label>
					<input
						type='text'
						name='roleName'
						id='roleName'
						className='form-control'
						placeholder='e.g Admin'
						value={newRoleName}
						onChange={(e) => setNewRoleName(e.target.value)}
					/>
				</div>
				<div className='mt-6'>
					<h1 className='text-gray-400 font-medium'>Permissions</h1>
					<div className='mt-2 grid grid-cols-1 md:grid-cols-2'>
						{permissions.map((p) => (
							<div key={p.id} className='p-2 text-sm flex items-center gap-2'>
								<input
									type='checkbox'
									name={'selectPermission' + p.id}
									id={'selectPermission' + p.id}
									className='form-control'
									checked={newRolePermissions.includes(p)}
									onChange={() => handleCheckboxChange(p)}
								/>
								<label htmlFor={'selectPermission' + p.id}>
									{p.action} {p.resource}
								</label>
							</div>
						))}
					</div>
				</div>
		</Modal>
	);
};

export default RolesModal;
