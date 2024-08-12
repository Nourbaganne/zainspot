import Link from 'next/link'
import React from 'react'
import arrowRight from '@/app/assets/owner/arrow-right.svg'
import Image from 'next/image'
import increase from '@/app/assets/owner/users/increase.svg'
import decrease from '@/app/assets/owner/users/decrease.svg'

interface RoleCardProps {
  title: string;
  value: number;
  editPermissions: boolean;
  stats: {
    increase: boolean;
    percentage: number;
  };
}

const RoleCard = ({ title, value, editPermissions, stats }: RoleCardProps) => {
  return (
    <div className='bg-background flex flex-col px-3 py-6 rounded-2xl'>
      <div className='flex flex-row mb-8 justify-between items-center'>
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
        <div className='flex flex-col gap-1'>
          <div className={`flex items-center p-1 gap-1 rounded-md text-sm ${stats.increase ? 'bg-secondary-foreground text-primary-dark' : 'bg-opacity-25 bg-alert text-alert-dark'}`}>
            <div>
              <Image src={stats.increase ? increase : decrease} alt={stats.increase ? 'increase' : 'decrease'} />
            </div>
            <p>
              {stats.percentage}%
            </p>
          </div>
          <p className='text-span text-xs font-light'>
            vs. last month
          </p>
        </div>
      </div>
    </div>
  )
}

export default RoleCard
