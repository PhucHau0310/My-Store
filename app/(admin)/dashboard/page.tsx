'use client';

import PieCharts from '@/components/charts/BieChart';
import LastTransaction from '@/components/charts/LastTransaction';
import LineCharts from '@/components/charts/LineChart';
import { BenefitHeaders } from '@/constants';
import useProducts from '@/hooks/useProducts';
import { Order } from '@/interface';
// import { Order } from '@prisma/client';
import React from 'react';

const Dashboard = () => {
    const { products } = useProducts();
    const [orders, setOrders] = React.useState<Order[]>([]);

    React.useEffect(() => {
        const orders = async () => {
            try {
                const res = await fetch(`/api/order`);
                const data = await res.json();

                if (res.ok) {
                    setOrders(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        orders();
    }, []);

    const completedOrderLength = orders.filter(
        (item) => item.status === 'DELIVERED'
    );

    const canceledOrderLength = orders.filter(
        (item) => item.status === 'CANCELLED'
    );

    const mathOptions = (text: string) => {
        switch (text) {
            case 'Total Products':
                return products.length;

            case 'Completed Order':
                return completedOrderLength.length > 0
                    ? completedOrderLength.length
                    : 0;

            case 'Canceled Order':
                return canceledOrderLength.length > 0
                    ? canceledOrderLength.length
                    : 0;

            default:
                return 0;
        }
    };

    const totalSale = orders.reduce((total, order) => {
        return total + order.totalAmount;
    }, 0);

    let productSales: { [key: string]: number } = {};

    orders.forEach((order) => {
        order.orderItems.forEach((item) => {
            if (!productSales[item.productId]) {
                productSales[item.productId] = item.quantity;
            } else {
                productSales[item.productId] += item.quantity;
            }
        });
    });

    const topSellingProducts = Object.entries(productSales)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([productId, quantity]) => ({ productId, quantity }));

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
                                {mathOptions(item.title)}
                                <span className="ml-3 text-[#0ba009]">
                                    +1.0%
                                </span>
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            <LineCharts totalSale={totalSale} orders={orders} />
            <PieCharts topSellingProducts={topSellingProducts} />
            <LastTransaction />
        </div>
    );
};

export default Dashboard;
