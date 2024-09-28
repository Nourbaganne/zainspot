import Link from 'next/link'
import React from 'react'
import arrowRight from '@/app/assets/owner/arrow-right.svg'
import Image from 'next/image'
import increase from '@/app/assets/owner/users/increase.svg'
import decrease from '@/app/assets/owner/users/decrease.svg'
import { FiArrowUp } from 'react-icons/fi'

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
    <div className='card flex flex-col w-full '>
      <div className='flex flex-row mb-8 justify-between items-center'>
        <p className='text-span '>
          {title}
        </p>
        {editPermissions && (
          <Link href='' className='text-primary font-semibold flex flex-row hover:underline text-sm'>
            <span className='pr-1 text-base sm:text-xs lg:text-base'>Edit Permissions</span>
            <Image src={arrowRight} alt='arrow-right-icon' />
          </Link>
        )}
      </div>
      <div className='flex justify-between'>
        <p className='text-4xl font-semibold'>
          {value.toLocaleString()}
        </p>
        <div className='flex flex-col gap-1'>
          <div className={`badge flex items-center justify-center ${stats.increase ? 'badge-success' : 'badge-danger'}`}>
            <FiArrowUp className='mr-1' />
            <span>
              {stats.percentage}%
            </span>
          </div>
          <div className='text-span text-xs font-light'>
            vs. last month
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoleCard
