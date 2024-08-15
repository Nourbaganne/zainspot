import React from 'react'
import { useQuery } from '@tanstack/react-query';
import AvailableCity from './availableCity';
import UnavailableCity from './unavailableCity';
import { getCities } from '../lib/getCitites';

interface City {
    id: number;
    name: string;
    hidden: boolean;
    imageUrl: string;
}


const Cities = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["cities"],
        queryFn: getCities,
    });


    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (isError) {
        return <div>{error.message}</div>;
    }

    const cities = data?.data || [];
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:pl-4">
            {Array.isArray(cities) && cities.length > 0 && (
                cities.map((city: City) =>
                    city.hidden ? (
                        <AvailableCity key={city.id} city={city} index={city?.id} />
                    ) : (
                        <UnavailableCity key={city.id} city={city} index={city?.id} />
                    )
                )
            )}
        </div>
    )
}

export default Cities