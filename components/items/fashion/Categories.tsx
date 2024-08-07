'use client';

import ItemCart3 from '@/components/cards/ItemCart3';
import useProducts from '@/hooks/useProducts';
import { Product } from '@/interface';
import { CircularProgress } from '@mui/material';
import React from 'react';

const Categories = () => {
    const { products, isLoading } = useProducts();
    const [filteredProducts, setFilteredProducts] = React.useState<Product[]>(
        []
    );

    React.useEffect(() => {
        const filtered = products.filter(
            (item: Product) =>
                item.category.name === 'Men Fashion' ||
                item.category.name === 'Women Fashion' ||
                item.category.name === 'Beauty Products' ||
                item.category.name === 'Modern Shoes'
        );

        const shuffledProduct = filtered.sort(() => 0.5 - Math.random());
        setFilteredProducts(shuffledProduct.slice(0, 4));
    }, [products]);
    return (
        <div className="bg-white mt-20 pb-28">
            <div className="max-w-screen-xl mx-auto">
                <div className="w-2/3 mx-auto flex flex-row items-center justify-between">
                    {[
                        'All Category',
                        'Men Product',
                        'Women Product',
                        'Accesories',
                    ].map((item, idx) => (
                        <button
                            className="border border-[#005D63] rounded-3xl px-4 py-3 text-[#131717] hover:bg-[#005D63] hover:text-white transform transition-colors duration-500"
                            key={idx}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <div className="flex flex-row justify-between mt-20">
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        filteredProducts.map((product, idx) => (
                            <ItemCart3 key={idx} dataProduct={product} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Categories;
