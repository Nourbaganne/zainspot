import Image from 'next/image'
import closeIcon from '@/app/assets/owner/locations/close-dialog.svg';
import { useState } from 'react';
import { useDeleteCity } from '@/app/lib/deleteCity';

const DeleteDialog = ({ id, setIsDialogOpen }: { id: number, setIsDialogOpen: (value: boolean) => void }) => {


    const [deleteConfirmation, setDeleteConfirmation] = useState('');

    const { mutate: deleteCity } = useDeleteCity();

    const handleDeleteCity = () => {
        if (deleteConfirmation === 'Delete') {
            deleteCity(id);
            setIsDialogOpen(false);
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-xl pb-6 pt-4 px-9 w-full max-w-[100vh] relative shadow-lg flex flex-col gap-5 ">
                <div className='flex justify-center items-center'>
                    <h1 className='font-bold text-[32px] text-center'>Delete Location</h1>
                    <button onClick={() => setIsDialogOpen(false)} className="absolute top-5 right-7 p-2 border border-border rounded-full">
                        <Image src={closeIcon} alt="close" className='' />
                    </button>
                </div>
                <p className='font-regular text-span font-light text-center'>
                    Are you sure you want to delete this location?
                </p>
                <div className='flex flex-col gap-4'>
                    <h1 className='font-regular text-span font-light text-sm'>To confirm, type “Delete”</h1>
                    <div className='grid grid-cols-4 gap-3'>
                        <input
                            type="text"
                            name="delete-confirmation"
                            id="delete-confirmation"
                            className='border rounded-md col-span-3 border-button text-span outline-none focus:ring-0 focus:border-button '
                            placeholder='Delete'
                            value={deleteConfirmation}
                            onChange={(e) => setDeleteConfirmation(e.target.value)}
                        />
                        <button
                            onClick={handleDeleteCity}
                            disabled={deleteConfirmation !== 'Delete'}
                            className={`px-3 py-2 text-background font-bold uppercase text-bold-14 rounded-md ${deleteConfirmation === 'Delete' ? 'bg-alert cursor-pointer' : 'bg-button cursor-not-allowed'}`}
                        >
                            Delete Location
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteDialog