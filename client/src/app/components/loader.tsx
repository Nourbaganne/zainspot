import React from 'react';
import Translation from './translation';

const Loader = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen gap-4'>
            <div className="relative w-[80px] h-[35px]">
                <div className="circle left-circle"></div>
                <div className="circle right-circle"></div>
            </div>
            <p className='font-regular text-span font-light'>
                <Translation translationKey='loader_text' />
            </p>
        </div>
    );
};

export default Loader;
