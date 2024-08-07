'use client';

import Image from 'next/image';
import saleDay from '../../../public/img/sale.png';
import React from 'react';
import { Promotion } from '@prisma/client';
import { CircularProgress } from '@mui/material';
import DiscountIcon from '@mui/icons-material/Discount';
import useCategories from '@/hooks/useCategories';

const SaleOffer = () => {
    const [promotions, setPromotions] = React.useState<Promotion[]>([]);
    const [isLoading, setLoading] = React.useState(false);
    const { categories } = useCategories();

    React.useEffect(() => {
        const getPromotions = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/discount');
                const data = await res.json();

                if (res.ok) {
                    setPromotions(data);
                }
            } catch (error) {
                console.log();
            } finally {
                setLoading(false);
            }
        };

        getPromotions();
    }, []);

    return (
        <div className="bg-white py-14">
            <div className="max-w-screen-xl mx-auto">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="font-semibold text-3xl mb-10 w-[25%]">
                        Hurry, dont miss out on this offers
                    </h1>

                    <button className="w-36 text-white bg-[#005D63] px-4 py-3 hover:text-[#005D63] hover:border hover:border-[#005D63] hover:bg-white transform transition-colors duration-300">
                        Browse All
                    </button>
                </div>

                <div className="w-1/2 h-[300px]">
                    <Image
                        src={saleDay}
                        alt="sale day"
                        width={500}
                        height={500}
                        className="w-full h-full"
                    />
                </div>

                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <div className="flex flex-row items-center gap-10 overflow-y-auto scrollY pb-10 px-3 pt-3 mt-20">
                        {promotions.map((item, idx) => {
                            const category = categories.find(
                                (cate) => cate.id === item.categoryId
                            ); // Tìm category theo id
                            return (
                                <div
                                    key={idx}
                                    className="bg-white shadow-2xl shadow-slate-300 w-[300px] flex-shrink-0 flex flex-row justify-between rounded-xl p-4"
                                >
                                    <div>
                                        <h2 className="text-2xl font-semibold">
                                            {item.discount}% OFF
                                        </h2>
                                        <h3 className="mt-3 mb-2 font-normal text-lg">
                                            {category
                                                ? category.name
                                                : 'Unknown Category'}
                                        </h3>
                                        <h3 className="mt-2 mb-3 font-normal text-lg">
                                            {item.code}
                                        </h3>
                                        <span>
                                            {new Date(item.startDate)
                                                .toISOString()
                                                .slice(0, 10)}
                                        </span>
                                        {' - '}
                                        <span>
                                            {new Date(item.endDate)
                                                .toISOString()
                                                .slice(0, 10)}
                                        </span>
                                    </div>

                                    <DiscountIcon sx={{ color: 'blue' }} />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SaleOffer;
