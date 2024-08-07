'use client';

import { Order, Product } from '@/interface';
import ItemCart from '../../cards/ItemCart';
import React from 'react';
import useProducts from '@/hooks/useProducts';
import Link from 'next/link';
import { CircularProgress } from '@mui/material';

const PopularProducts = () => {
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [topSellingProducts, setTopSellingProducts] = React.useState<
        Product[]
    >([]);
    const { products } = useProducts();
    const [isLoading, setLoading] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const container = containerRef.current;
        let scrollPosition = 0;
        let scrollInterval: any;

        const startScrolling = () => {
            scrollInterval = setInterval(() => {
                if (container) {
                    if (
                        scrollPosition + container.clientWidth >=
                        container.scrollWidth
                    ) {
                        scrollPosition = 0;
                    } else {
                        // scrollPosition += container.clientWidth;
                        scrollPosition += 250;
                    }
                    container.scrollTo({
                        left: scrollPosition,
                        behavior: 'smooth',
                    });
                }
            }, 2500);
        };

        startScrolling();

        // Cleanup function
        return () => clearInterval(scrollInterval);
    }, []);

    React.useEffect(() => {
        const orders = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/order`);
                const data = await res.json();

                if (res.ok) {
                    setOrders(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        orders();
    }, []);

    React.useEffect(() => {
        if (orders.length > 0) {
            const productSales: { [key: string]: number } = {};

            orders.forEach((order) => {
                order.orderItems.forEach((item) => {
                    if (!productSales[item.productId]) {
                        productSales[item.productId] = item.quantity;
                    } else {
                        productSales[item.productId] += item.quantity;
                    }
                });
            });

            const topSellingProductIds = Object.entries(productSales)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([productId]) => productId);

            const topProducts = products.filter((product) =>
                topSellingProductIds.includes(product.id)
            );
            setTopSellingProducts(topProducts);
        }
    }, [orders, products]);
    return (
        <div className="bg-white py-14">
            <div className="max-w-screen-xl mx-auto">
                <h1 className="font-semibold text-3xl mb-10">
                    Our Popular Products
                </h1>

                <div className="flex flex-row items-center justify-between">
                    <h2 className="text-[#566363] w-1/3">
                        Browse our most popular products and make your day more
                        beautiful and glorious.
                    </h2>

                    <Link
                        href={'/product-fashion'}
                        className="w-36 border text-center border-[#005D63] text-[#005D63] px-4 py-3 hover:text-white hover:bg-[#005D63] transform transition-colors duration-300"
                    >
                        Browse All
                    </Link>
                </div>

                <div
                    ref={containerRef}
                    className="transform transition-transform duration-500 flex flex-row items-center gap-10 overflow-y-auto scrollY"
                >
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        topSellingProducts.map((product, idx) => (
                            <ItemCart key={idx} dataProduct={product} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default PopularProducts;
