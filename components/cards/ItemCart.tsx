'use client';

import { Product } from '@/interface';
import Image from 'next/image';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import tShirt from '../../public/img/t-shirt.png';
import React from 'react';

const ItemCart = ({ dataProduct }: { dataProduct: Product }) => {
    const [hoverImage, setHoverImage] = React.useState(false);
    return (
        <div className="w-[31%] mt-20 flex-shrink-0 pb-12">
            <div
                onMouseEnter={() => setHoverImage(true)}
                onMouseLeave={() => setHoverImage(false)}
                className="relative"
            >
                <Image
                    // src={dataProduct?.picture ?? ''}
                    src={tShirt}
                    alt="image product"
                    width={800}
                    height={800}
                    className="w-full h-[320px] cursor-pointer"
                />

                {hoverImage && (
                    <div className="absolute px-8 bg-[#FFD44D] text-[#131717] h-14 bottom-0 left-0 right-0 flex flex-row items-center justify-between transform transition-all ease-in-out duration-300">
                        <h2 className="font-semibold">Added to Wish List</h2>
                        <div className="flex flex-row items-center gap-3">
                            <p className="underline font-medium cursor-pointer">
                                View
                            </p>
                            <div className="cursor-pointer">
                                <CloseIcon />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-row items-center justify-between mt-3 mb-2">
                <h1 className="text-[#566363]">
                    {dataProduct?.category?.name}
                </h1>

                <div className="text-[#131717] hover:scale-105 cursor-pointer transform transition-all duration-300">
                    <FavoriteBorderIcon />
                </div>
            </div>

            <h1 className="text-[#131717] font-semibold text-lg">
                {dataProduct?.name}
            </h1>

            <div className="flex flex-row items-center justify-between">
                <div className="text-[#FFD44D] flex flex-row items-center gap-1">
                    <StarIcon />
                    <span className="text-[#566363]">5.0</span>
                    <span className="text-[#566363]">(18)</span>
                </div>

                <p className="text-[#131717] font-semibold text-lg">
                    ${dataProduct?.price}
                </p>
            </div>

            <button className="border border-[#005D63] font-medium text-base w-full mt-5 py-4 text-[#005D63] hover:bg-[#005D63] hover:text-white transform transition-colors duration-500">
                Add to Cart
            </button>
        </div>
    );
};

export default ItemCart;
