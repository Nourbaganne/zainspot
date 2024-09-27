
import React from 'react';
import Image from 'next/image';
import searchIcon from '@/app/assets/owner/users/search-outline.svg';
import visibleLogo from '@/app/assets/owner/locations/visibleCitiesLogo.svg';
import eyeOffIcon from '@/app/assets/owner/locations/eye-off-outline.svg';
import plusIcon from '@/app/assets/owner/locations/plus.svg';

interface LocationsHeaderProps {
    searchCity: string;
    setSearchCity: (value: string) => void;
    isHidden: boolean;
    setIsHidden: (value: boolean) => void;
    setIsDialogOpen: (value: boolean) => void;
}

const LocationsHeader: React.FC<LocationsHeaderProps> = ({
    searchCity,
    setSearchCity,
    isHidden,
    setIsHidden,
    setIsDialogOpen
}) => {
    return (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-4 text-span'>
            <div className='flex items-center gap-2 text-sm flex-wrap'>
                <h1 className='flex items-center gap-1'>
                    <span className='font-bold text-2xl'>6</span> Countries
                </h1>
                <h1 className='flex items-center gap-1'>
                    <span className='font-bold text-2xl'>8</span> Cities
                </h1>
                <h1 className='flex items-center gap-1'>
                    <span className='font-bold text-2xl'>17</span> Locations
                </h1>
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-5 col-span-3'>
                <div className='flex col-span-3 bg-background gap-2 items-center p-2 text-span border border-button rounded-md'>
                    <Image src={searchIcon} alt='search-user' />
                    <input
                        placeholder="Search Location"
                        className="outline-none border-none w-full focus:ring-0"
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                    />
                </div>
                <div className='flex col-span-2 justify-between md:justify-end gap-5 items-center'>
                    <button onClick={() => setIsHidden(!isHidden)}>
                        {isHidden ? (
                            <div className='border-2 border-primary text-primary rounded-lg px-3 py-2 flex items-center gap-2'>
                                <Image src={visibleLogo} alt='visible-cities' />
                                <h1>View Visible</h1>
                            </div>
                        ) : (
                            <div className='border-2 border-primary text-primary rounded-lg px-3 py-2 flex items-center gap-2'>
                                <Image src={eyeOffIcon} alt='eye off icon' />
                                <h1>View Hidden</h1>
                            </div>
                        )}
                    </button>
                    <button
                        className='bg-primary rounded-lg text-white px-3 py-[9px] flex items-center gap-2'
                        onClick={() => setIsDialogOpen(true)}
                    >
                        <Image src={plusIcon} alt='plus icon'></Image>
                        Create New
                    </button>
                </div>
            </div>
        </div>

    );
};

export default LocationsHeader;
