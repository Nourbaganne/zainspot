import Link from "next/link";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { FaArrowRight } from 'react-icons/fa';
import { AreaChart } from "@tremor/react";

interface CardUsersProps {
    userStats: {
        totalUsers: number,
        yearlyCounts: {
            year: number,
            count: number,
            incrementPercentage: number,
            monthlyBreakdown: [
                {
                    month: string,
                    count: number
                }
            ]
        },
        monthlyCounts: {
            month: number,
            count: number,
            incrementPercentage: number
        }
    };
    visitorStats: {
        totalVisitors: number,
        increasment: number,
        yearlyData: [
            {
                month: string,
                visitors: number
            }
        ]
    }
}

const CardUsers = ({ userStats, visitorStats }: CardUsersProps) => {
    const chartdata = userStats?.yearlyCounts.monthlyBreakdown.map((userMonth) => {
        const visitorMonth = visitorStats.yearlyData.find(
            (visitorMonth) => visitorMonth.month === userMonth.month
        );

        return {
            date: userMonth.month,
            subscribers: userMonth.count,
            visitors: visitorMonth ? visitorMonth.visitors : 0,
        };
    });

    return (
        <div className="card">
            <div className="flex flex-col md:flex-row md:justify-between items-center gap-x-6">
                {/* Card Header */}
                <div className="w-full md:w-5/12 flex-between">
                    <div className="flex-center">
                        <span className="text-3xl font-bold">{userStats?.totalUsers}</span>
                        <span className="text-md font-light ml-3">Users</span>
                    </div>
                    <div className="text-center md:flex md:items-center md:gap-2">
                        <span
                            className={`${userStats.yearlyCounts.incrementPercentage < 0 ? 'badge-danger' : 'badge-success'
                                }`}
                        >
                            {userStats?.yearlyCounts.incrementPercentage < 0 ? (
                                <FiArrowDown className="inline" />
                            ) : (
                                <FiArrowUp className="inline" />
                            )}
                            <span className="text-sm">{userStats?.yearlyCounts.incrementPercentage}%</span>
                        </span>
                        <div>
                            <span className="text-gray-400 text-xs">vs. {userStats?.yearlyCounts.year - 1}</span>
                        </div>
                    </div>
                </div>

                {/* Year Selector */}
                <div className="mt-4 md:mt-0 grid grid-cols-2 gap-4 w-full md:w-6/12 md:pl-6">
                    <select name="year" id="selectYear" className="form-control form-control-lg">
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                    </select>
                    <Link href="/owner/users" className="btn btn-lg btn-primary">
                        <span>View Details</span>
                        <FaArrowRight className="inline ml-2" />
                    </Link>
                </div>
            </div>

            {/* Graph */}
            <div className="mt-4">
                <AreaChart
                    className="my-12"
                    data={chartdata}
                    index="date"
                    categories={['subscribers', 'visitors']}
                    colors={['yellow-600', 'green-600']}
                    showLegend={false}
                    showTooltip={false}
                    connectNulls={true}
                />
                {/* Legend */}
                <div className="flex items-center">
                    <div className="circle-xs bg-yellow-600"></div>
                    <span className="ml-2 text-gray-800">Subscribers</span>
                    <div className="ml-8 circle-xs bg-green-600"></div>
                    <span className="ml-2 text-gray-800">Visitors</span>
                </div>
            </div>
        </div>
    );
};

export default CardUsers;