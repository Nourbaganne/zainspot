import Translation from '@/app/components/translation'
import React from 'react'

const AddPermission = () => {
    return (
        <div className='flex gap-4 py-2 items-end'>
            <div className='text-gray-400'>
                <h1 className='text-sm'>
                    <Translation translationKey='permissions_header' />
                </h1>
                <input type="text" name="" id="" className='border rounded-sm' />
            </div>
            <div className='text-gray-400'>
                <h1 className='text-sm'>
                    <Translation translationKey='permissions_resource' />
                </h1>
                <input type="text" name="" id="" className='border rounded-sm' />
            </div>
            <button className='bg-border text-background px-2 py-1 rounded-md font-medium'>
                <Translation translationKey='permissions_btn' />
            </button>
        </div>
    )
}

export default AddPermission