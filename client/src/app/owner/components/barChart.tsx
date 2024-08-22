import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockChartData = [
    { month: 'Jan', revenue: 50000, azer: 40001, qwer: 30001 },
    { month: 'Feb', revenue: 45000, azer: 40002, qwer: 30002 },
    { month: 'Mar', revenue: 55000, azer: 40003, qwer: 30003 },
    { month: 'Apr', revenue: 60000, azer: 40004, qwer: 30004 },
    { month: 'May', revenue: 52000, azer: 40005, qwer: 30005 },
    { month: 'Jun', revenue: 58000, azer: 40006, qwer: 30006 },
    { month: 'Jul', revenue: 62000, azer: 40007, qwer: 30007 },
    { month: 'Aug', revenue: 59000, azer: 40008, qwer: 30008 },
    { month: 'Sep', revenue: 61000, azer: 40009, qwer: 30009 },
    { month: 'Oct', revenue: 63000, azer: 40010, qwer: 30010 },
    { month: 'Nov', revenue: 64000, azer: 40011, qwer: 30011 },
    { month: 'Dec', revenue: 67000, azer: 40012, qwer: 30012 },
];

const CustomStackedBarChart = () => (
    <ResponsiveContainer width="100%" height={400}>
        <BarChart data={mockChartData} barSize={20}>
            <CartesianGrid 
                stroke="#ddd" 
                strokeDasharray="none" 
                vertical={false} 
            />
            <XAxis dataKey="month" />
            <YAxis 
                axisLine={false} // Hides the Y-axis line
                tickLine={false} // Hides the ticks on the Y-axis
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" stackId="a" fill="#23599D" />
            <Bar dataKey="azer" stackId="a" fill="#00927C" />
            <Bar dataKey="qwer" stackId="a" fill="#D6A62C" />
        </BarChart>
    </ResponsiveContainer>
);

export default CustomStackedBarChart;
