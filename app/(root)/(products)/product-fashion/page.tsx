'use client';

import ItemCart3 from '@/components/cards/ItemCart3';
import useClickOutside from '@/hooks/useCickOutside';
import useProducts from '@/hooks/useProducts';
import { Product } from '@/interface';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CircularProgress } from '@mui/material';
import React from 'react';

const ProductFashion = () => {
    const { ref, isVisible, setIsVisible } = useClickOutside(false);
    const [valueSort, setValueSort] = React.useState('Sort By Latest');
    const { products, isLoading } = useProducts();
    const [visibleCount, setVisibleCount] = React.useState(15);
    const [filteredProducts, setFilteredProducts] = React.useState<Product[]>(
        []
    );
    const [maxPrice, setMaxPrice] = React.useState(1000);
    const [priceRange, setPriceRange] = React.useState<[number, number]>([
        0,
        maxPrice,
    ]);

    React.useEffect(() => {
        const filtered = products.filter(
            (item: Product) =>
                (item.category.name === 'Men Fashion' ||
                    item.category.name === 'Women Fashion' ||
                    item.category.name === 'Beauty Products' ||
                    item.category.name === 'Modern Shoes') &&
                item.price >= priceRange[0] &&
                item.price <= priceRange[1]
        );
        setFilteredProducts(filtered);

        // Find the maximum price from the filtered products
        const max = Math.max(...filtered.map((p) => p.price), 500);

        // const max =
        //     filtered.length > 0 ? Math.max(...filtered.map((p) => p.price)) : 0;
        setMaxPrice(max);
    }, [products, priceRange]);

    const countQuantityProduct = (name: string) => {
        const math = products.filter((item) => item.category.name === name);

        return math.length;
    };

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 6);
    };

    const handleFilterCate = (cate: string) => {
        setFilteredProducts(
            products.filter((item) => item.category.name === cate)
        );
        setVisibleCount(15);
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        setPriceRange([0, value]);
    };

    return (
        <div className="bg-white mt-20 pb-28">
            <div className="max-w-screen-xl mx-auto">
                <h1 className="font-semibold text-3xl mb-6 text-center">
                    Product List
                </h1>

                <p className="text-[#566363] font-normal text-sm text-center">
                    We hear what you need. We plan, design and develop visionary
                    concept websites.
                </p>

                <div className="flex flex-row items-start gap-8 mt-16">
                    <div className="w-2/3">
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <>
                                <div className="relative flex flex-row items-center justify-between">
                                    <p className="text-[#566363] font-normal text-base">
                                        Showing <span>1-{visibleCount}</span> of{' '}
                                        <span>{filteredProducts.length}</span>{' '}
                                        results
                                    </p>

                                    <button
                                        onClick={() => setIsVisible(true)}
                                        className="text-[#131717] border border-[#C4D1D0] px-4 py-3 rounded-lg"
                                    >
                                        {valueSort}
                                        <KeyboardArrowDownIcon
                                            sx={{ color: 'black' }}
                                        />
                                    </button>

                                    {isVisible && (
                                        <div
                                            ref={ref}
                                            className="z-20 absolute right-0 top-14 flex flex-col items-start border border-[#C4D1D0] bg-white"
                                        >
                                            {[
                                                'Sort By Latest',
                                                'Sort Top Selling',
                                            ].map((item, idx) => (
                                                <button
                                                    onClick={() =>
                                                        setValueSort(item)
                                                    }
                                                    key={idx}
                                                    className={`${
                                                        valueSort === item &&
                                                        'cursor-not-allowed text-[#566363] line-through'
                                                    } text-[#131717] font-medium w-full px-4 py-3 border-b border-b-[#C4D1D0] hover:bg-gray-300`}
                                                >
                                                    {item}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-3 gap-8 mt-12">
                                    {filteredProducts
                                        .slice(0, visibleCount)
                                        .map((product, idx) => (
                                            <ItemCart3
                                                key={idx}
                                                dataProduct={product}
                                            />
                                        ))}
                                </div>

                                {visibleCount < filteredProducts.length && (
                                    <button
                                        onClick={handleLoadMore}
                                        className="bg-[#005D63] text-white flex mx-auto px-4 py-3 rounded-lg mt-10 hover:opacity-95"
                                    >
                                        Load More
                                    </button>
                                )}
                            </>
                        )}
                    </div>

                    <div className="w-1/3">
                        <div className="border border-[#E5E5E5] p-4 w-2/3 rounded-lg">
                            <h2 className="text-lg font-semibold">
                                Categories
                            </h2>

                            <div className="mt-5">
                                {[
                                    'Men Fashion',
                                    'Women Fashion',
                                    'Beauty Products',
                                    'Modern Shoes',
                                ].map((item, idx) => (
                                    <p
                                        onClick={() => handleFilterCate(item)}
                                        key={idx}
                                        className="cursor-pointer border-b-2 border-b-[#E5E5E5] mb-4 font-normal text-base"
                                    >
                                        {item} ({countQuantityProduct(item)})
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className="border border-[#E5E5E5] p-4 w-2/3 mt-10 rounded-lg">
                            <h2 className="text-lg font-semibold">
                                Filter by price
                            </h2>

                            <input
                                type="range"
                                name="range"
                                id="range"
                                min="0"
                                max={maxPrice}
                                value={priceRange[1]}
                                onChange={handlePriceChange}
                                className="text-[#005D63] my-5"
                            />

                            <div className="flex flex-row items-center justify-between">
                                <p className="font-normal text-base">
                                    Price:{' '}
                                    <span>
                                        ${priceRange[0]} - ${priceRange[1]}
                                    </span>
                                </p>

                                <button className="bg-[#005D63] py-2 px-4 text-white rounded-lg">
                                    Filter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductFashion;
