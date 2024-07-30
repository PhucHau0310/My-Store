'use client';

import PieCharts from '@/components/charts/BieChart';
import LastTransaction from '@/components/charts/LastTransaction';
import LineCharts from '@/components/charts/LineChart';
import { BenefitHeaders } from '@/constants';

const Dashboard = () => {
    return (
        <div className="py-5">
            <h1 className="text-[#010101] font-semibold text-lg mb-4">
                DashBoard
            </h1>

            <div className="flex flex-row items-center gap-6 justify-between">
                {BenefitHeaders.map((item, idx) => (
                    <div
                        key={idx}
                        className="w-1/4 flex flex-row items-center justify-between bg-white border border-[#f1f1f1] rounded-xl py-4 px-14"
                    >
                        <item.icon sx={{ width: '30px', height: '30px' }} />
                        <div className="">
                            <h2 className="text-[#929498] font-normal text-base">
                                {item.title}
                            </h2>
                            <h3 className="text-black font-semibold text-lg">
                                250{' '}
                                <span className="ml-3 text-[#0ba009]">
                                    +3.5%
                                </span>
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            <LineCharts />
            <div className="flex flex-row items-start gap-4 ">
                <LastTransaction />
                <PieCharts />
            </div>
        </div>
    );
};

export default Dashboard;
