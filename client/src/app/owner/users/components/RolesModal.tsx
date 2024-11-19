import Modal from '@/app/components/Modal';
import Role from '@/app/interfaces/Role';
import Permission from '@/app/interfaces/Permission';
import { useEffect, useState } from 'react';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import Translation from '@/app/components/translation';

interface Props {
	rolesModalRef: any;
	existingRole?: any;
}

const RolesModal = ({ rolesModalRef, existingRole }: Props) => {
	const [permissions, setPermissions] = useState<Permission[]>([]);
	const [newRoleName, setNewRoleName] = useState<string>('');
	const [newRolePermissions, setNewRolePermissions] = useState<Permission[]>([]);

	// Fetch permissions
	useEffect(() => {
		axiosInstance.get('/permission').then((res) => {
			setPermissions(res.data);
		});
	}, []);

	// Initialize state when editing
	useEffect(() => {
		if (existingRole) {
			setNewRoleName(existingRole.name);
			setNewRolePermissions(existingRole.permissions || []);
		}
	}, [existingRole]);

	// Handle checkbox changes
	const handleCheckboxChange = (currPermission: Permission) => {
		setNewRolePermissions((prevPermissions) => {
			if (prevPermissions.includes(currPermission)) {
				return prevPermissions.filter((perm) => perm !== currPermission);
			} else {
				return [...prevPermissions, currPermission];
			}
		});
	};

	// Handle submit (create or update)
	const handleSubmit = () => {
		const roleData = {
			name: newRoleName,
			permissions: newRolePermissions.map((perm) => perm.id),
		};

		if (existingRole) {
			// Update role
			axiosInstance.patch(`/role/${existingRole.id}`, roleData).then((res) => {
				if (res.status === 200) {
					alert('Role updated successfully');
					rolesModalRef.current.close();
				}
			});
		} else {
			// Create role
			axiosInstance.post('/role', roleData).then((res) => {
				if (res.status === 201) {
					alert('Role created successfully');
					rolesModalRef.current.close();
				}
			});
		}
	};

	return (
		<Modal
			ref={rolesModalRef}
			title={existingRole ? 'Edit Role' : 'Create New Role'}
			subtitle={
				existingRole
					? 'Edit the role name and update its permissions.'
					: 'Create a new role, give it a name, and check its permissions.'
			}
			onButtonClick={handleSubmit}
			buttonText={existingRole ? 'Update Role' : 'Create Role'}
		>
			<div className='form-group'>
				<label htmlFor='roleName' className='text-sm font-medium !text-gray-400'>
					<Translation translationKey='roleName_label' />
				</label>
				<input
					type='text'
					name='roleName'
					id='roleName'
					className='form-control'
					placeholder='e.g Admin'
					value={existingRole ? existingRole.name : newRoleName}
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
								checked={newRolePermissions.some((perm) => perm.id === p.id)}
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
