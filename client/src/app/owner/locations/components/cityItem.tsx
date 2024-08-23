import { CityProps } from '../page';
import hiddenLogo from '@/app/assets/owner/locations/hidden-logo.svg';
import unhiddenLogo from '@/app/assets/owner/locations/eye-outline.svg';
import deleteLogo from '@/app/assets/owner/locations/trash-outline.svg';
import editLogo from '@/app/assets/owner/locations/edit-outline.svg';
import Image from 'next/image';
import { useCurrency } from '@/app/contexts/CurrencyContext';
import { MoneyValue } from '@/app/components/MoneyValue';
import { useDeleteCity } from '@/app/lib/deleteCity';
import { useHideCity } from '@/app/lib/useHideCity';


const CityItem = ({ id, city, country, location, goldPrice, classicPrice, hidden }: CityProps) => {
    const { currency } = useCurrency();
    const { mutate: deleteCity } = useDeleteCity();
    const { mutate: hideCity } = useHideCity();

    const handleDeleteCity = () => {
        deleteCity(id);
    };

    const handleHideCity = () => {
        hideCity(id);
    }

    return (
        <div className='flex justify-between py-4 px-2 border-b'>
            <div className='flex text-sm text-text gap-28'>
                <h1 className='font-light max-w-40'>
                    {location.title}
                </h1>
                <div className='flex flex-col'>
                    <h1 className='font-semibold'>{city}</h1>
                    <p className='font-light text-span max-w-24'>{country}</p>
                </div>
                <div className='flex flex-col justify-between'>
                    {/* Gold Price Section */}
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs font-semibold'>1 year single payment</h1>
                        <div className='flex gap-8'>
                            <p className='font-light text-span'>1 Year: </p>
                            <span className='text-primary font-semibold'>
                                <MoneyValue
                                    value={goldPrice?.value}
                                    fromCurrency="USD"
                                    toCurrency={currency}
                                    decimals={0}
                                />
                            </span>
                        </div>
                    </div>
                    {/* Tax Section */}
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs font-semibold text-alert-dark'>Manual Payment Tax fee</h1>
                        <div className='flex gap-8'>
                            <p className='font-light text-span'>1 Year: </p>
                            <span className='text-alert-dark font-semibold'>
                                <MoneyValue
                                    value={goldPrice?.tax}
                                    fromCurrency="USD"
                                    toCurrency={currency}
                                    decimals={0}
                                />
                            </span>
                        </div>
                    </div>
                </div>
                {/* Classic Price Section */}
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-10'>
                            <h1 className='text-xs font-semibold'>1 year single payment</h1>
                            <h1 className='text-xs font-semibold text-alert-dark'>Tax fee</h1>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-span font-light'>1 year</p>
                            <span className='text-primary font-semibold'>
                                <MoneyValue
                                    value={classicPrice.perMonth[0].amount}
                                    fromCurrency="USD"
                                    toCurrency={currency}
                                    decimals={0}
                                />
                            </span>
                            <span className='text-alert-dark font-semibold'>
                                <MoneyValue
                                    value={classicPrice.perMonth[0].tax}
                                    fromCurrency="USD"
                                    toCurrency={currency}
                                    decimals={0}
                                />
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between'>
                            <h1 className='text-xs font-semibold'>Per Month</h1>
                            <h1 className='text-xs font-semibold text-alert-dark'>Tax fee</h1>
                        </div>
                        {
                            classicPrice?.perMonth
                                .filter(month => month.duration !== 12)
                                .map((month, index) => (
                                    <div key={index} className='flex justify-between'>
                                        <p className='text-span font-light'>{`${month.duration} Months:`}</p>
                                        <span className='font-semibold text-primary'>
                                            <MoneyValue
                                                value={month?.amount}
                                                fromCurrency="USD"
                                                toCurrency={currency}
                                                decimals={0}
                                            />
                                        </span>
                                        <span className='text-alert-dark font-semibold'>
                                            <MoneyValue
                                                value={month?.tax}
                                                fromCurrency="USD"
                                                toCurrency={currency}
                                                decimals={0}
                                            />
                                        </span>
                                    </div>
                                ))
                        }
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-3 text-xs font-semibold items-start'>

                <div className='flex gap-1'>
                    <button className='flex items-center gap-2  text-span py-3 px-5 border-2 border-span rounded-md'>
                       <Image src={editLogo} alt='edit-city' />
                        Edit
                    </button>
                    <button
                        onClick={handleHideCity}
                    >
                        {hidden ? (
                            <div className={`flex items-center gap-2  text-span py-3 px-5 border-2 border-span rounded-md `}>
                                <Image src={unhiddenLogo} alt='hide-city' className='w-4' />
                                Unhide
                            </div>
                        ) : (
                            <div className={`flex items-center gap-2  text-span py-3 px-5 border-2 border-span rounded-md `}>
                                <Image src={hiddenLogo} alt='hide-city' />
                                Hide
                            </div>
                        )}

                    </button>

                </div>


                <button
                    onClick={handleDeleteCity}
                    className='flex self-end  items-center gap-2 text-alert-dark '
                >
                    <Image src={deleteLogo} alt='delete-city' />
                    Delete Permanently
                </button>
            </div>
        </div>
    );
};

export default CityItem;
