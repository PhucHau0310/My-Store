import { PieChart } from '@mui/x-charts/PieChart';

const PieCharts = () => {
    return (
        <div className="mt-10 bg-white border border-[#f1f1f1] rounded-xl py-4 px-14">
            <h1 className="text-black text-center text-lg font-bold mb-4">
                Top 5 Selling Products
            </h1>
            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: 10, label: 'series A' },
                            { id: 1, value: 15, label: 'series B' },
                            { id: 2, value: 20, label: 'series C' },
                            { id: 3, value: 20, label: 'series D' },
                            { id: 4, value: 35, label: 'series E' },
                        ],
                    },
                ]}
                width={400}
                height={200}
            />
        </div>
    );
};

export default PieCharts;
