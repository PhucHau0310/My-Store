import { Order } from '@/interface';
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from 'dayjs';

// const xAxisData = [
//     new Date('2023-12-04'),
//     new Date('2023-12-05'),
//     new Date('2023-12-06'),
//     new Date('2023-12-07'),
//     new Date('2023-12-08'),
//     new Date('2023-12-09'),
//     new Date('2023-12-10'),
// ];
// const seriesData = [
//     [43, 38, 36, 30, 37, 43, 44],
//     [31, 28, 27, 27, 33, 40, 35],
// ];

const LineCharts = ({
    totalSale,
    orders,
}: {
    totalSale: number;
    orders: Order[];
}) => {
    orders.sort(
        (a, b) =>
            new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
    );

    const xData = orders.map((order) => new Date(order.orderDate));
    const yData = orders.map((order) => order.totalAmount);

    // console.log({ xData, yData });

    const yData2 = new Array(yData.length).fill(400);
    return (
        <div className="mt-10 bg-white border border-[#f1f1f1] rounded-xl py-4 px-14">
            <div className="mb-10">
                <h3 className="text-[#636b72] font-normal text-sm">
                    Look at your sale
                </h3>
                <h3 className="text-black font-semibold text-xl">
                    Sales Report
                </h3>
            </div>
            <div className="flex flex-row">
                <div className=" w-[18%]">
                    <p className="text-black font-semibold text-3xl">
                        $ {totalSale.toFixed(2)}
                    </p>
                    <p className="text-[#0ba115]">
                        $ 10.00 <span className="text-[#8bd496]">(+1.0%)</span>
                    </p>
                </div>
                <LineChart
                    xAxis={[
                        {
                            label: 'Date',
                            data: xData,
                            // tickInterval: 'auto',
                            tickInterval: xData,
                            scaleType: 'time',
                            valueFormatter: (date) =>
                                dayjs(date).format('MMM D'),
                        },
                    ]}
                    yAxis={[{ label: 'USD ($)' }]}
                    series={[
                        { label: 'Sales', data: yData },
                        // {
                        //     label: 'Promotions',
                        //     data: [],
                        // },
                        {
                            label: 'Promotions',
                            data: yData2,
                        },
                    ]}
                    height={400}
                />
            </div>
        </div>
    );
};

export default LineCharts;
