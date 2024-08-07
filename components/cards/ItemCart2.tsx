'use client';

import Image from 'next/image';
import { Product } from '@/interface';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '@/lib/redux/slices/wishlistSlice';
import Link from 'next/link';

const ItemCart2 = ({ dataProduct }: { dataProduct: Product }) => {
    const avgRating =
        dataProduct.Review && dataProduct.Review?.length > 0
            ? dataProduct.Review.reduce(
                  (total, curr) => total + curr.rating,
                  0
              ) / dataProduct.Review.length
            : 0;

    const dispatch = useDispatch();

    const { items } = useSelector(
        (state: { wishlist: { items: Product[] } }) => state.wishlist
    );

    const isProductInWishlist = items.some(
        (item) => item.id === dataProduct.id
    );

    const handleAddWishList = (data: Product, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToWishlist(data));
    };

    return (
        <div className="w-[85%] bg-[#FFFFFF] drop-shadow-xl rounded-xl p-5">
            <Link
                href={`/productDetail/${dataProduct.id}`}
                className="w-72 h-72 block"
            >
                <Image
                    src={dataProduct?.picture ?? ''}
                    alt="image"
                    width={800}
                    height={800}
                    className="w-full h-full rounded-xl hover:scale-105 transform transition-transform duration-300 cursor-pointer"
                />
            </Link>

            <div className="flex flex-row items-center justify-between my-3">
                <Link href={`/productDetail/${dataProduct.id}`}>
                    <h1 className="text-[#131717] font-semibold text-lg">
                        {dataProduct?.name}
                    </h1>
                </Link>
                <div
                    className={`${
                        isProductInWishlist && 'text-red-500'
                    } cursor-pointer`}
                    onClick={(e) => handleAddWishList(dataProduct, e)}
                >
                    <FavoriteBorderIcon />
                </div>
            </div>

            <div className="flex flex-row items-center justify-between">
                <Link
                    href={`/productDetail/${dataProduct.id}`}
                    className="text-[#FFD44D] flex flex-row items-center gap-1"
                >
                    <StarIcon />
                    <span className="text-[#566363]">{avgRating}</span>
                    <span className="text-[#566363]">
                        ({dataProduct?.Review?.length})
                    </span>
                </Link>

                <p className="text-[#131717] font-semibold text-lg">
                    ${dataProduct?.price}
                </p>
            </div>
        </div>
    );
};

export default ItemCart2;
