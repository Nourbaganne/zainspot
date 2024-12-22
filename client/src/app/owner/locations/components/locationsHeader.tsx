
import React, { useContext } from 'react';
import Image from 'next/image';
import searchIcon from '@/app/assets/owner/users/search-outline.svg';
import visibleLogo from '@/app/assets/owner/locations/visibleCitiesLogo.svg';
import eyeOffIcon from '@/app/assets/owner/locations/eye-off-outline.svg';
import plusIcon from '@/app/assets/owner/locations/plus.svg';
import Translation from '@/app/components/translation';
import { AuthContext } from '@/app/contexts/authContext';
import { hasAccess } from '@/app/lib/hasAccess';
import toast from 'react-hot-toast';

interface LocationsHeaderProps {
    searchCity: string;
    setSearchCity: (value: string) => void;
    isHidden: boolean;
    setIsHidden: (value: boolean) => void;
    setIsDialogOpen: (value: boolean) => void;
    locations: number;
    cities: number;
    countries: number
}

const LocationsHeader: React.FC<LocationsHeaderProps> = ({
    searchCity,
    setSearchCity,
    isHidden,
    setIsHidden,
    setIsDialogOpen,
    locations,
    cities,
    countries
}) => {

    const { user } = useContext(AuthContext)

    const handleDialogOpening = () => {
        if (hasAccess(user?.user.role.permissions, 'add:city')) {
            setIsDialogOpen(true)
        } else {
            toast.error("Access Denied!")
        }
    }
    return (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-4 text-span'>
            <div className='flex items-center justify-start md:justify-center gap-4 text-sm flex-wrap'>
                <h1 className='flex items-end gap-1'>
                    <span className='font-bold text-2xl'>
                        {countries}
                    </span>
                    <span className='pb-[1px]'>
                        <Translation translationKey='locationHeader_countries' />
                    </span>
                </h1>
                <h1 className='flex items-end gap-1'>
                    <span className='font-bold text-2xl'>
                        {cities}
                    </span>
                    <span className='pb-[1px]'>
                        <Translation translationKey='locationHeader_cities' />
                    </span>
                </h1>
                <h1 className='flex items-end gap-1'>
                    <span className='font-bold text-2xl'>
                        {locations}
                    </span>
                    <span className='pb-[1px]'>
                        <Translation translationKey='locationHeader_locations' />
                    </span>
                </h1>
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-5 col-span-3 items-center'>
                <div className='flex col-span-3 bg-background gap-2 items-center p-2 text-span border border-button rounded-md'>
                    <Image src={searchIcon} alt='search-user' />
                    <input
                        placeholder="Search Location"
                        className="outline-none border-none w-full focus:ring-0"
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                    />
                </div>
                <div className='col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4 '>
                    <button
                        className='max-w-sm'
                        onClick={() => setIsHidden(!isHidden)} >
                        <div className={`border-2 border-primary text-primary rounded-lg px-3 py-2 flex justify-center items-center gap-2`}>
                            <Image src={isHidden ? visibleLogo : eyeOffIcon} alt={isHidden ? 'visible-cities' : 'eye off icon'} />
                            <h1 className='text-sm md:text-base'>{isHidden ? 'View Visible' : 'View Hidden'}</h1>
                        </div>
                    </button>
                    <button
                        className='max-w-sm'
                        onClick={handleDialogOpening}
                    >
                        <div className='bg-primary border-2 border-primary rounded-lg text-white px-3 py-2 flex justify-center items-center gap-2  '>
                            <Image src={plusIcon} alt='plus icon' />
                            <span className='text-sm md:text-base'>
                                <Translation translationKey='locationHeader_createBtn' />
                            </span>
                        </div>
                    </button>
                </div>
            </div>
        </div>

    );
};

export default LocationsHeader;
