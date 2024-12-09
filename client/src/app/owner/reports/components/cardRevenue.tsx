import { MoneyValue } from "@/app/components/MoneyValue";
import { Currency } from "@/app/lib/currencyConvert";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { DonutChart } from '@tremor/react';



interface CountyProps {
    name: string;
    value: number;
    percentage?: number;
    subscribers?: number;
}

interface RevenueProps {
    totalRevenue: number;
    percentageIncrease: number;
    topCountries: CountyProps[];
    allCountries: CountyProps[];
}

const CardRevenue = ({ revenue, currency }: { revenue: RevenueProps, currency: Currency }) => {

    const valueFormatter = (number: number) => `$ ${Intl.NumberFormat('us').format(number).toString()}`;
    const colorPalette = ['green-700', 'yellow-600', 'blue-600', 'red-500', 'purple-500'];

    const countriesWithColors = revenue.topCountries.map((country: CountyProps, index: number) => ({
        ...country,
        color: colorPalette[index % colorPalette.length],
    }));

    return (
        <div className="card">
            <div>
                <span className="card-title">Revenue</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <div>
                    <span className="text-3xl font-bold">
                        <MoneyValue
                            value={revenue.totalRevenue}
                            fromCurrency="USD"
                            toCurrency={currency}
                            decimals={0} />
                    </span>
                </div>
                <div className="text-center">
                    <span className={`${revenue.percentageIncrease < 0 ? 'badge-danger' : 'badge-success'}`}>
                        {revenue.percentageIncrease < 0
                            ? <FiArrowDown className="inline" />
                            : <FiArrowUp className="inline" />
                        }
                        <span className="text-sm">{revenue.percentageIncrease}%</span>
                    </span>
                    <div>
                        <span className="text-gray-400 text-xs">vs. last month</span>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex flex-col">
                <DonutChart
                    data={countriesWithColors}
                    colors={colorPalette}
                    variant="pie"
                    valueFormatter={valueFormatter}
                    onValueChange={(v) => console.log(v)}
                    className="w-full h-80"
                    showTooltip={false}
                />
                <div className="mt-4 xl:mt-12">
                    {countriesWithColors?.map((item: any) => (
                        <div key={item.name} className="grid grid-cols-4 text-left border-b py-3">
                            <div className="col-span-2 flex items-center gap-2">
                                <div className={`circle-xs bg-${item.color}`}></div>
                                <span className="text-gray-600">{item.name}</span>
                            </div>
                            <div>
                                <span className="font-bold">{item.percentage}%</span>
                            </div>
                            <div>
                                <span className="font-bold">
                                    <MoneyValue
                                        value={item.value}
                                        fromCurrency="USD"
                                        toCurrency={currency}
                                        decimals={0} />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardRevenue;