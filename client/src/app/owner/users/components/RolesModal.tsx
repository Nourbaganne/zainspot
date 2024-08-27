import Modal from '@/app/components/Modal';
import Role from '@/app/interfaces/Role';
import Permission from '@/app/interfaces/Permission';

const permissions: Permission[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  resource: [
    'Users',
    'Subscriptions',
    'Roles',
    'Permissions',
    'Cities',
    'Countries',
    'States',
    'Businesses',
    'Owners',
    'Managers',
  ][i],
  action: ['View', 'Edit', 'Delete', 'Create'][Math.floor(Math.random() * 4)],
}));

interface Props {
  rolesModalRef: any;
  roles: Role[];
}

const RolesModal = ({ rolesModalRef, roles }: Props) => {
  function getPermissions() {
    console.log('get permissions');
  }

  function createRole() {
    console.log('create role');
  }

  return (
    <Modal
      ref={rolesModalRef}
      title='Create New Role'
      subtitle='Create a new role, give it a name, and check its permissions.'
      onButtonClick={createRole}
      buttonText='Create Role'
    >
      <>
        <div className='form-group'>
          <label
            htmlFor='roleName'
            className='text-sm font-medium !text-gray-400'
          >
            Role Name
          </label>
          <input
            type='text'
            name='roleName'
            id='roleName'
            className='form-control'
          />
        </div>
        <div className='mt-6'>
          <h1 className='text-gray-400 font-medium'>Permissions</h1>
          <div className='mt-2 grid grid-cols-1 md:grid-cols-2'>
            {permissions.map((p) => (
              <div key={p.id} className='p-3 flex items-center gap-2'>
                <input
                  type='checkbox'
                  name={'selectPermission' + p.id}
                  id={'selectPermission' + p.id}
                  className='form-control'
                />
                <label htmlFor={'selectPermission' + p.id}>
                  {p.action} {p.resource}
                </label>
              </div>
            ))}
          </div>
        </div>
      </>
    </Modal>
  );
};

export default RolesModal;
