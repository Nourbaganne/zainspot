import { Currency } from "@/app/lib/currencyConvert";
import Image from 'next/image';
import MapImage from '@/app/assets/owner/reports/map.png';
import { MoneyValue } from '@/app/components/MoneyValue';
import { FaArrowRight } from 'react-icons/fa';
import Translation from "@/app/components/translation";

interface CountyProps {
    name: string;
    value: number;
    percentage?: number;
    subscribers?: number;
}

const CardLocations = ({ countries, currency }: { countries: CountyProps[], currency: Currency }) => {
    return (
        <div className="card flex flex-col md:flex-row p-4 bg-white rounded-lg ">
            <div className="flex-center">
                <Image src={MapImage} alt="ZainSpot locations in the map" />
            </div>
            <div className="mt-4">
                <div>
                    <div><span className="card-number">
                        {countries && `${countries.length}`}
                    </span></div>
                    <div className="mt-2">
                        <span className="card-title">
                            <Translation translationKey="cardLocations_header" />
                        </span>
                    </div>
                </div>
                <div className="mt-2">
                    <div className="overflow-x-auto">
                        <table className="min-w-[480px] md:min-w-[600px] text-left bg-background rounded-lg">
                            <thead>
                                <tr className="border-b-2">
                                    <th className="text-gray-400 font-medium px-4 py-2">
                                        <Translation translationKey="cardLocations_country" />
                                    </th>
                                    <th className="text-gray-400 font-medium text-end pr-6 py-2 border-b-2 border-green-600">
                                        <Translation translationKey="cardLocations_subscribers" />
                                    </th>
                                    <th className="text-primary font-medium text-end pr-6 py-2">
                                        <Translation translationKey="cardLocations_earned" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(countries) ? (
                                    countries.map((country, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="text-gray-500 py-4 px-4">{country.name}</td>
                                            <td className="pr-8 text-end py-4">{country.subscribers?.toLocaleString()}</td>
                                            <td className="text-end py-4 font-semibold pr-8">
                                                <MoneyValue
                                                    value={country.value}
                                                    fromCurrency="USD"
                                                    toCurrency={currency}
                                                    decimals={0}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="text-center py-4">
                                            <Translation translationKey="cardLocations_empty" />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6">
                        <a href="/owner/locations" className="btn btn-outline-primary btn-lg">
                            <span>
                                <Translation translationKey="cardLocations_redirection" />
                            </span>
                            <FaArrowRight className="inline ml-2" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardLocations;