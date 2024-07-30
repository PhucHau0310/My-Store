'use client';

import ItemCart3 from '@/components/cards/ItemCart3';
import useClickOutside from '@/hooks/useCickOutside';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';

const fakeData = [
    {
        id: '1',
        name: 'Mid Century Modern T-Shirt',
        picture: '',
        version: '1.0',
        description: 'nice good awesome',
        price: 110,
        quantity: 20,
        published: true,
        categoryId: '1',
        category: {
            id: '1.1',
            name: 'Men-Cloths',
            description: '',
            image: '',
            published: true,
        },
    },
    {
        id: '2',
        name: 'Mid Century Modern T-Shirt',
        picture: '',
        version: '1.0',
        description: 'nice good awesome',
        price: 110,
        quantity: 20,
        published: true,
        categoryId: '2',
        category: {
            id: '2.1',
            name: 'Men-Cloths',
            description: '',
            image: '',
            published: true,
        },
    },
    {
        id: '3',
        name: 'Mid Century Modern T-Shirt',
        picture: '',
        version: '1.0',
        description: 'nice good awesome',
        price: 110,
        quantity: 20,
        published: true,
        categoryId: '3',
        category: {
            id: '3.1',
            name: 'Men-Cloths',
            description: '',
            image: '',
            published: true,
        },
    },
    {
        id: '4',
        name: 'Mid Century Modern T-Shirt',
        picture: '',
        version: '1.0',
        description: 'nice good awesome',
        price: 110,
        quantity: 20,
        published: true,
        categoryId: '1',
        category: {
            id: '1.1',
            name: 'Men-Cloths',
            description: '',
            image: '',
            published: true,
        },
    },
    {
        id: '5',
        name: 'Mid Century Modern T-Shirt',
        picture: '',
        version: '1.0',
        description: 'nice good awesome',
        price: 110,
        quantity: 20,
        published: true,
        categoryId: '2',
        category: {
            id: '2.1',
            name: 'Men-Cloths',
            description: '',
            image: '',
            published: true,
        },
    },
    {
        id: '6',
        name: 'Mid Century Modern T-Shirt',
        picture: '',
        version: '1.0',
        description: 'nice good awesome',
        price: 110,
        quantity: 20,
        published: true,
        categoryId: '3',
        category: {
            id: '3.1',
            name: 'Men-Cloths',
            description: '',
            image: '',
            published: true,
        },
    },
    {
        id: '7',
        name: 'Mid Century Modern T-Shirt',
        picture: '',
        version: '1.0',
        description: 'nice good awesome',
        price: 110,
        quantity: 20,
        published: true,
        categoryId: '3',
        category: {
            id: '3.1',
            name: 'Men-Cloths',
            description: '',
            image: '',
            published: true,
        },
    },
];

const ProductFashion = () => {
    const { ref, isVisible, setIsVisible } = useClickOutside(false);
    const [valueSort, setValueSort] = React.useState('Sort By Latest');

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
                        <div className="relative flex flex-row items-center justify-between">
                            <p className="text-[#566363] font-normal text-base">
                                Shiong <span>1-15</span> of <span>22</span>{' '}
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
                                    className="absolute right-0 top-14 flex flex-col items-start border border-[#C4D1D0] bg-white"
                                >
                                    {['Sort By Latest', 'Sort Top Selling'].map(
                                        (item, idx) => (
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
                                        )
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-3 gap-8 mt-12">
                            {fakeData.map((product, idx) => (
                                <ItemCart3 key={idx} dataProduct={product} />
                            ))}
                        </div>

                        <button className="bg-[#005D63] text-white flex mx-auto px-4 py-3 rounded-lg mt-10 hover:opacity-95">
                            Load More
                        </button>
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
                                ].map((item, idx, arr) => (
                                    <p
                                        key={idx}
                                        className="border-b-2 border-b-[#E5E5E5] mb-4 font-normal text-base"
                                    >
                                        {item} (15)
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
                                className="text-[#005D63] my-5"
                            />

                            <div className="flex flex-row items-center justify-between">
                                <p className="font-normal text-base">
                                    Price: <span>$80 - 500</span>
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
