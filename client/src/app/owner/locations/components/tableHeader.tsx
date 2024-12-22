import { LOCATION_LIST_HEADER } from '@/app/constants/owner-location';
import Image from 'next/image';
import upButton from '@/app/assets/owner/users/Up.svg';
import downButton from '@/app/assets/owner/users/Down.svg';

const TableHeader = () => {
  return (
    <div className='flex items-center border-b-2 text-span pb-4 pt-6 pl-4'>
      <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 text-sm w-full pl-2'>
        {LOCATION_LIST_HEADER.map((item, index) => (
          <div
            key={index}
            className='col-span-1 md:col-span-2 flex items-center gap-2'
          >
            <div className='flex flex-col gap-1'>
              <button>
                <Image src={upButton} alt='up-users' />
              </button>
              <button>
                <Image src={downButton} alt='down-users' />
              </button>
            </div>
            <span className='text-xs md:text-sm'>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableHeader;
