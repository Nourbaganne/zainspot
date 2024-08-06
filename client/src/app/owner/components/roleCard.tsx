import Link from 'next/link'
import React from 'react'
import arrowRight from '@/app/assets/owner/arrow-right.svg'
import Image from 'next/image'
import increase from '@/app/assets/owner/users/increase.svg'
import decrease from '@/app/assets/owner/users/decrease.svg'

interface RoleCardProps {
  title: string,
  value: number,
  editPermissions: boolean,
  stats: {
    increase: boolean,
    purcentage: number
  }
}

const RoleCard = ({ title, value, editPermissions, stats }: RoleCardProps) => {
  return (
    <div className='bg-background flex flex-col px-3 py-6 rounded-2xl'>
      <div className='flex flex-row mb-8 justify-between'>
        <p className='text-span'>
          {title}
        </p>
        {editPermissions && (
          <Link href='' className='text-primary font-semibold flex flex-row hover:underline text-sm'>
            <span className='pr-1'>Edit Permissions</span>
            <Image src={arrowRight} alt='arrow-right-icon' />
          </Link>
        )}
      </div>
      <div className='flex justify-between'>
        <p className='text-4xl font-semibold'>
          {value.toLocaleString()}
        </p>
        <div className='flex flex-col  items-center gap-2 '>
          <div className={`p-1  text-sm flex rounded-md ${stats?.increase ? 'bg-secondary-foreground text-primary-dark' : 'bg-alert bg-opacity-25 text-alert-dark '}`}>
            <Image src={stats?.increase ? increase : decrease} alt={title} />
            <p>{stats?.purcentage}%</p>
          </div>
          <p className='text-span text-xs'>
            vs. last month
          </p>
        </div>
      </div>
    </div>
  )
}

export default RoleCard
