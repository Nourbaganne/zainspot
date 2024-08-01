import Link from 'next/link'
import React from 'react'
import arrowRight from '@/app/assets/owner/arrow-right.svg'
import Image from 'next/image'

const RoleCard = () => {
  return (
    <div className='bg-background flex flex-col px-3 py-6 rounded-2xl'>
      <div className='flex flex-row mb-8 justify-between'>
        <p className='text-span'>Zainspotters</p>
        <Link href='' className='text-primary font-semibold flex flex-row hover:underline text-sm'>
          <span className='pr-1'>Edit Permissions</span>
          <Image src={arrowRight} alt='arrow-right-icon'/>
        </Link>
      </div>
      <div>
        <p className='text-4xl font-semibold'>10,107</p>
      </div>
    </div>
  )
}

export default RoleCard