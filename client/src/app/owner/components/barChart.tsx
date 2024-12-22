import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';
import dayjs from 'dayjs';

const colors = ["#23599D", "#00927C", "#D6A62C", "#A62CD6", "#9D3523", "#4A3D99", "#E4D00A"];


const transformData = (subscriptions: any[]) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const dataMap: any = {};

    months.forEach(month => {
        dataMap[month] = { month };
    });


    subscriptions.forEach(sub => {
        const month = dayjs(sub.startDate).format('MMM'); 
        const city = sub.city.split(',')[0]; 

        if (!dataMap[month]) {
            dataMap[month] = { month };
        }

        if (!dataMap[month][city]) {
            dataMap[month][city] = 0;
        }
        dataMap[month][city] += sub.price;
    });

    const cities = Array.from(new Set(subscriptions.map(sub => sub.city.split(',')[0])));
    months.forEach(month => {
        cities.forEach(city => {
            if (!dataMap[month][city]) {
                dataMap[month][city] = 0; 
            }
        });
    });

    return Object.values(dataMap); 
};


const CustomStackedBarChart = ({ subscriptions }: { subscriptions: any[] }) => {
    // Transform the subscriptions data
    const chartData = useMemo(() => transformData(subscriptions), [subscriptions]);

    // Dynamically get the city keys from the first entry in the transformed data
    const cityKeys = chartData.length > 0 
    ? Object.keys(chartData[0] as Record<string, any>).filter(key => key !== 'month') 
    : [];


    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} barSize={20}>
                <CartesianGrid stroke="#ddd" strokeDasharray="none" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend
                    iconType="circle"
                    align="left"
                    verticalAlign="bottom"
                    formatter={(value) => <span style={{ marginRight: '50px' }}>{value}</span>}
                />
                
                {/* Dynamically generate Bar components based on city keys */}
                {cityKeys.map((city, index) => (
                    <Bar 
                        key={city} 
                        dataKey={city} 
                        stackId="a" 
                        fill={colors[index % colors.length]} 
                    />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
};

export default CustomStackedBarChart;
