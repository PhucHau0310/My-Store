'use client';

import { Product } from '@/interface';
import Image from 'next/image';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addToWishlist,
    removeFromWishlist,
} from '@/lib/redux/slices/wishlistSlice';
import Link from 'next/link';

const ItemCart = ({ dataProduct }: { dataProduct: Product }) => {
    const [hoverImage, setHoverImage] = React.useState(false);

    const { items } = useSelector(
        (state: { wishlist: { items: Product[] } }) => state.wishlist
    );

    const isProductInWishlist = items.some(
        (item) => item.id === dataProduct.id
    );

    const dispatch = useDispatch();

    const handleAddWishList = (data: Product, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToWishlist(data));
    };

    const handleRemoveWishlist = (id: string) => {
        dispatch(removeFromWishlist(id));
    };

    const avgRating =
        dataProduct.Review && dataProduct.Review?.length > 0
            ? dataProduct.Review.reduce(
                  (total, curr) => total + curr.rating,
                  0
              ) / dataProduct.Review.length
            : 0;
    return (
        <div className="w-[31%] mt-20 flex-shrink-0 pb-12">
            <div
                onMouseEnter={() => setHoverImage(true)}
                onMouseLeave={() => setHoverImage(false)}
                className="relative"
            >
                <Image
                    src={dataProduct?.picture ?? ''}
                    alt="image product"
                    width={800}
                    height={800}
                    className="w-full h-[320px] cursor-pointer"
                />

                {hoverImage && isProductInWishlist && (
                    <div className="absolute px-8 bg-[#FFD44D] text-[#131717] h-14 bottom-0 left-0 right-0 flex flex-row items-center justify-between transform transition-all ease-in-out duration-300">
                        <h2 className="font-semibold">Added to Wish List</h2>
                        <div className="flex flex-row items-center gap-3">
                            <Link
                                href={'/wishlist'}
                                className="underline font-medium cursor-pointer"
                            >
                                View
                            </Link>
                            <div
                                onClick={() =>
                                    handleRemoveWishlist(dataProduct.id)
                                }
                                className="cursor-pointer"
                            >
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

                <div
                    onClick={(e) => handleAddWishList(dataProduct, e)}
                    className={`${
                        isProductInWishlist ? 'text-red-500' : 'text-[#131717]'
                    } hover:scale-105 cursor-pointer transform transition-all duration-300`}
                >
                    <FavoriteBorderIcon />
                </div>
            </div>

            <h1 className="text-[#131717] font-semibold text-lg">
                {dataProduct?.name}
            </h1>

            <div className="flex flex-row items-center justify-between">
                <div className="text-[#FFD44D] flex flex-row items-center gap-1">
                    <StarIcon />
                    <span className="text-[#566363]">
                        {avgRating.toFixed(1)}
                    </span>
                    <span className="text-[#566363]">
                        ({dataProduct.Review?.length ?? 0})
                    </span>
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
