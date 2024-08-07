'use client';

import useProducts from '@/hooks/useProducts';
import ItemCart from '../../cards/ItemCart';
import React from 'react';
import { Product } from '@/interface';
import { CircularProgress } from '@mui/material';
import Link from 'next/link';

const OurNewProducts = () => {
    const { products, isLoading } = useProducts();
    const [randomProduct, setRandomProduct] = React.useState<Product[]>([]);

    const divRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const container = divRef.current;
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
                        scrollPosition += 300;
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
        if (products.length > 0) {
            const shuffledProduct = products.sort(() => 0.5 - Math.random());
            setRandomProduct(shuffledProduct.slice(0, 8));
        }
    }, [products]);

    return (
        <div className="bg-white py-14">
            <div className="max-w-screen-xl mx-auto">
                <h1 className="font-semibold text-3xl mb-10">
                    Our New Products
                </h1>

                <div className="flex flex-row items-center justify-between">
                    <h2 className="text-[#566363] w-1/3">
                        Browse our new products and make your day more beautiful
                        and glorious.
                    </h2>

                    <Link
                        href={'/product-electronics'}
                        className="w-36 text-center border border-[#005D63] text-[#005D63] px-4 py-3 hover:text-white hover:bg-[#005D63] transform transition-colors duration-300"
                    >
                        Browse All
                    </Link>
                </div>

                <div
                    ref={divRef}
                    className="flex flex-row items-center gap-10 overflow-y-auto scrollY"
                >
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        randomProduct.map((product, idx) => (
                            <ItemCart key={idx} dataProduct={product} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default OurNewProducts;
