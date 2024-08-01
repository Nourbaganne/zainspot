import Breadcrumb from '@/app/zainspotter/components/breadcrumb';
import React from 'react'
import RoleCard from '../components/roleCard';

const Users = () => {
  const breadcrumbItems = [
    { label: "Owner Dashboard", href: "/owner" },
    { label: "Users" },
  ];
  return (
    <div className='flex flex-col gap-6 bg-background-foreground md:px-16 md:py-8 md:pb-20'>
      <Breadcrumb items={breadcrumbItems} />
      <div className='grid gap-x-8 gap-y-4 grid-cols-1 md:grid-cols-3'>
        <RoleCard></RoleCard>
        <RoleCard></RoleCard>
        <RoleCard></RoleCard>
      </div>
    </div>
  )
}

export default Users