'use client';

import ItemCart2 from '@/components/cards/ItemCart2';
import useProducts from '@/hooks/useProducts';
import { Product } from '@/interface';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import React from 'react';

const BestCollection = () => {
    const { products, isLoading } = useProducts();
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

        const shuffledProduct = filtered.sort(() => 0.5 - Math.random());
        setFilteredProducts(shuffledProduct.slice(0, 6));
    }, [products]);

    return (
        <div className="bg-white mt-20 pt-32 pb-28">
            <div className="max-w-screen-xl mx-auto">
                <div className="flex flex-row items-start justify-between w-full">
                    <h1 className="font-semibold text-3xl mb-10">
                        Our Best Collection
                    </h1>

                    <div className="flex flex-row items-center gap-2 w-[12%]">
                        <button className="w-1/2 h-12 bg-white border border-[#005D63] text-[#005D63] rounded-lg">
                            <WestIcon />
                        </button>

                        <button className="w-1/2 h-12 text-white bg-[#005D63] rounded-lg">
                            <EastIcon />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-10 mt-8">
                    {filteredProducts.map((product, idx) => (
                        <ItemCart2 key={idx} dataProduct={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BestCollection;
