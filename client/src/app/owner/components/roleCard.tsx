import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import arrowRight from '@/app/assets/owner/arrow-right.svg'
import Image from 'next/image'
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
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startValue = displayValue;
    const endValue = value;

    const duration = 800; 
    const animationFrame = 60; 
    const totalFrames = Math.round(duration / (1000 / animationFrame));
    let frame = 0;

    const increment = (endValue - startValue) / totalFrames;

    const timer = setInterval(() => {
      frame++;
      startValue += increment;

      if (frame >= totalFrames) {
        clearInterval(timer);
        setDisplayValue(endValue);
      } else {
        setDisplayValue(Math.round(startValue));
      }
    }, 1000 / animationFrame);

    return () => clearInterval(timer); 
  }, [value]);

  return (
    <div className='card flex flex-col w-full'>
      <div className='flex flex-row mb-8 justify-between items-center'>
        <p className='text-span'>
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
          {displayValue.toLocaleString()}
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

export default RoleCard;
