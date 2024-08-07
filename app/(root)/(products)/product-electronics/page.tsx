'use client';

import ItemCart2 from '@/components/cards/ItemCart2';
import useProducts from '@/hooks/useProducts';
import { Product } from '@/interface';
import TuneIcon from '@mui/icons-material/Tune';
import { CircularProgress } from '@mui/material';
import React from 'react';

const ProductElectronics = () => {
    const { products, isLoading } = useProducts();
    const [visibleCount, setVisibleCount] = React.useState(6);
    const [filteredProducts, setFilteredProducts] = React.useState<Product[]>(
        []
    );

    React.useEffect(() => {
        const filtered = products.filter(
            (item: Product) =>
                item.category.name === 'Mobile Device' ||
                item.category.name === 'Computer Device' ||
                item.category.name === 'Smart Watch'
        );
        setFilteredProducts(filtered);
    }, [products]);

    return (
        <div className="bg-white mt-20 pt-2 pb-28">
            <div className="max-w-screen-xl mx-auto">
                <h1 className="font-semibold text-3xl mb-10">
                    Find something you love
                </h1>

                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <div className="flex flex-row items-start justify-between w-full">
                            <div className="flex flex-row items-start gap-4">
                                <button className="text-[#566363] bg-[#F7F7F7] p-3 w-36 rounded-lg hover:text-white hover:bg-[#005D63] transform transition-colors duration-300">
                                    Latest
                                </button>
                                <button className="text-[#566363] bg-[#F7F7F7] p-3 w-36 rounded-lg hover:text-white hover:bg-[#005D63] transform transition-colors duration-300">
                                    Top Selling
                                </button>
                            </div>
                            <button className="w-36 h-12 text-[#566363] bg-[#F7F7F7]  rounded-lg hover:text-white hover:bg-[#005D63] transform transition-colors duration-300">
                                <TuneIcon /> All Filters
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-10 mt-8">
                            {filteredProducts
                                .slice(0, visibleCount)
                                .map((product, idx) => (
                                    <ItemCart2
                                        key={idx}
                                        dataProduct={product}
                                    />
                                ))}
                        </div>

                        <button
                            onClick={() => setVisibleCount((prev) => prev + 6)}
                            className="bg-[#005D63] text-white mt-14 py-4 px-6 hover:opacity-95 rounded-lg mx-auto flex"
                        >
                            Load More
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductElectronics;
