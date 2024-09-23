import Image from 'next/image';
import nextIcon from '@/app/assets/owner/users/chevron-forward.svg';
import previousIcon from '@/app/assets/owner/users/chevron-back.svg';
import { generatePageNumbers } from '@/app/lib/owner-locations';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (value: number) => void;
  totalPages: number;
}

const Pagination = ({ currentPage, setCurrentPage, totalPages }: PaginationProps) => {
  return (
    <div className='flex justify-end gap-4'>
      <button
        className={`px-4 py-3 text-sm flex items-center gap-3 rounded-lg text-span`}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
      >
        <Image src={previousIcon} alt='previous-page' />
        Previous
      </button>
      <div className='flex gap-2'>
        {generatePageNumbers({ totalPage: totalPages, currentPage }).map((page, index) =>
          page === '...' ? (
            <span key={index} className='text-primary cursor-not-allowed'>...</span>
          ) : (
            <button
              key={index}
              className={`px-4 py-2  ${currentPage === page ? 'bg-background-light text-text' : 'text-primary'}`}
              onClick={() => setCurrentPage(page as number)}
            >
              {page}
            </button>
          )
        )}
      </div>
      <button
        className={`px-4 py-3 flex text-sm items-center gap-3 rounded-lg text-primary`}
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
      >
        Next
        <Image src={nextIcon} alt='next-page' />
      </button>
    </div>
  );
};

export default Pagination;
