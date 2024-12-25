import Link from 'next/link'
import React, { useContext, useEffect, useRef, useState } from 'react'
import arrowRight from '@/app/assets/owner/arrow-right.svg'
import Image from 'next/image'
import { FiArrowUp } from 'react-icons/fi'
import Translation from '@/app/components/translation'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/app/lib/axios/axiosInstance'
import { hasAccess } from '@/app/lib/hasAccess'
import { AuthContext } from '@/app/contexts/authContext'
import toast from 'react-hot-toast'
import RolesModal from '../users/components/RolesModal'

interface RoleCardProps {
  title: string;
  value: number;
  editPermissions: boolean;
  stats: {
    increase: boolean;
    percentage: number;
  };
  roleId: number;
}

const RoleCard = ({ title, value, editPermissions, stats, roleId }: RoleCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [existingRole, setExistingRole] = useState<any | null>();
  const { user } = useContext(AuthContext);
  const rolesModalRef = useRef<any>(null);


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
  }, [value, displayValue]);

  const handleOpenEditDialog = async () => {
    if (hasAccess(user?.user.role.permissions, 'update:permission')) {
      try {
        const { data } = await axiosInstance.get(`/role/${roleId}`);
        setExistingRole(data);
        rolesModalRef.current.open();
      } catch (error) {
        console.error('Failed to fetch role:', error);
      }
    } else {
      toast.error("Access Denied!")
    }
  };


  return (
    <div className='card flex flex-col w-full'>
      <RolesModal rolesModalRef={rolesModalRef} existingRole={existingRole} />

      <div className='flex flex-row mb-8 justify-between items-center'>
        <p className='text-span'>
          {title}
        </p>
        {editPermissions && (
          <button onClick={handleOpenEditDialog} className='text-primary font-semibold flex flex-row justify-center items-center hover:underline text-sm'>
            <span className='pr-1 text-base sm:text-xs lg:text-base'>
              <Translation translationKey='roleCard_edit' />
            </span>
            <Image src={arrowRight} alt='arrow-right-icon' />
          </button>
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
            <Translation translationKey='roleCard_statsLabel' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoleCard;
