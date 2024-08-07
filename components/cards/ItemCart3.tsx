'use client';

import Image from 'next/image';
import { Product } from '@/interface';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '@/lib/redux/slices/wishlistSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Rating } from '@mui/material';

const ItemCart3 = ({ dataProduct }: { dataProduct: Product }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { items } = useSelector(
        (state: { wishlist: { items: Product[] } }) => state.wishlist
    );

    const handleAddWishList = (data: Product, event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(addToWishlist(data));
    };

    const isProductInWishlist = items.some(
        (item) => item.id === dataProduct.id
    );

    const ratingAvg =
        dataProduct.Review?.reduce((total, review) => {
            return total + review.rating;
        }, 0) / dataProduct.Review?.length;

    return (
        <div
            // onClick={() => router.push(`/productDetail/${dataProduct.id}`)}
            className="hover:scale-105 transform transition-transform duration-300 cursor-pointer hover:shadow-xl hover:rounded-lg"
        >
            <Link href={`/productDetail/${dataProduct.id}`}>
                <div className="w-60 h-60">
                    <Image
                        src={dataProduct?.picture ?? ''}
                        alt="image"
                        width={800}
                        height={800}
                        className="w-full h-full object-cover cursor-pointer rounded-lg"
                    />
                </div>
                <div className="flex flex-row items-center justify-between my-3">
                    <p className="text-[#566363] font-normal text-base">
                        {dataProduct?.category?.name}
                    </p>
                    <div
                        className={`mr-2 ${
                            isProductInWishlist && 'text-red-500'
                        }`}
                        onClick={(e) => handleAddWishList(dataProduct, e)}
                    >
                        <FavoriteBorderIcon />
                    </div>
                </div>

                <h1 className="text-[#131717] font-semibold text-lg">
                    {dataProduct?.name}
                </h1>
                <p className="text-[#131717] font-semibold text-base my-2">
                    ${dataProduct?.price}
                </p>

                <div className="flex flex-row items-center justify-between">
                    <div className="text-[#FFD44D] flex flex-row items-center gap-1">
                        <Rating
                            name="read-only"
                            value={ratingAvg}
                            readOnly
                            precision={0.5}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '3px',
                            }}
                        />
                        <span className="text-[#566363]">
                            (
                            {dataProduct.Review ? dataProduct.Review.length : 0}{' '}
                            reviewers)
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ItemCart3;
