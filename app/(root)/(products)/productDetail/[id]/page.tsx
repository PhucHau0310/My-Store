'use client';

import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CircularProgress, Rating, Skeleton } from '@mui/material';
import React from 'react';
import ItemTestimonial from '@/components/cards/ItemTestimonial';
import { usePathname } from 'next/navigation';
import { Product } from '@/interface';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/redux/slices/cartSlice';
import { resStatus } from '@/lib/redux/slices/statusSlice';
import { useAuth } from '@clerk/nextjs';

interface ProductExtends extends Product {
    quantityBuy: number;
}

const ProductDetail = () => {
    const [valueRating, setValueRating] = React.useState(0);
    const [valueQuantity, setValueQuantity] = React.useState(1);
    const [infoProduct, setInfoProduct] = React.useState<Product>();
    const [summary, setSummary] = React.useState<string | null>(null);
    const [infoReview, setInfoReview] = React.useState<string | null>(null);
    const [isLoading, setLoading] = React.useState(false);
    const [isLoadingProductDetail, setLoadingProductDetail] =
        React.useState(false);
    const { userId } = useAuth();

    const productId = usePathname().split('/')[2];
    const dispatch = useDispatch();

    React.useEffect(() => {
        const getProduct = async () => {
            setLoadingProductDetail(true);
            try {
                const res = await fetch(`/api/product/${productId}`);
                const { product } = await res.json();

                if (res.ok) {
                    setInfoProduct(product);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingProductDetail(false);
            }
        };

        getProduct();
    }, [productId]);

    let averageRating;
    let object: { [key: number]: number } = {};

    const totalRating =
        infoProduct &&
        infoProduct?.Review?.reduce((acc, curr) => acc + curr.rating, 0);

    averageRating =
        totalRating &&
        infoProduct?.Review &&
        totalRating / infoProduct?.Review.length;

    infoProduct?.Review.forEach((item, idx) => {
        let key = item.rating;
        if (!object[key]) {
            object[key] = 1;
        } else {
            object[key]++;
        }
    });

    // const convertArr = Object.entries(object).map(([key, value]) => ({
    //     [key]: value,
    // }));

    const handleAddToCart = (data: ProductExtends) => {
        dispatch(addToCart(data));
        dispatch(resStatus({ status: 200, message: 'Add To Cart Success' }));
    };

    const handleSubmitReview = async () => {
        setLoading(true);
        try {
            const data = {
                productId: productId,
                userId: userId,
                rating: valueRating,
                comment: `headline: ${summary}, review: ${infoReview}`,
            };

            const res = await fetch(`/api/review/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const dataRes = await res.json();

            if (res.ok) {
                setValueRating(1);
                setSummary(null);
                setInfoReview(null);
            }

            dispatch(
                resStatus({ status: res.status, message: dataRes.message })
            );
        } catch (error) {
            dispatch(
                resStatus({ status: 500, message: 'Failed to post new review' })
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white mt-20 pb-28">
            <div className="max-w-screen-xl mx-auto">
                <div className="flex flex-row items-center justify-between gap-20">
                    <div className="w-1/2 h-[500px]">
                        {!isLoadingProductDetail ? (
                            <Image
                                src={infoProduct?.picture ?? ''}
                                alt="image"
                                width={800}
                                height={800}
                                className="w-full h-full"
                            />
                        ) : (
                            <Skeleton
                                sx={{ height: 800 }}
                                animation="wave"
                                variant="rectangular"
                            />
                        )}
                    </div>

                    <div className="w-1/2 h-[500px]">
                        {isLoadingProductDetail ? (
                            <React.Fragment>
                                <Skeleton
                                    animation="wave"
                                    height={10}
                                    style={{ marginBottom: 6 }}
                                    width="20%"
                                />
                                <Skeleton
                                    animation="wave"
                                    height={10}
                                    style={{ marginBottom: 6 }}
                                    width="30%"
                                />
                                <Skeleton
                                    animation="wave"
                                    height={10}
                                    width="15%"
                                />
                            </React.Fragment>
                        ) : (
                            <>
                                <h2 className="text-[#566363] font-normal text-base">
                                    {infoProduct?.category.name}
                                </h2>
                                <h1 className="text-[#131717] font-semibold text-xl mb-2">
                                    {infoProduct?.name}
                                </h1>
                                <p className="text-[#F86624] font-normal text-base">
                                    <span className="line-through text-[#566363] mr-2">
                                        $0
                                    </span>
                                    ${infoProduct?.price}
                                </p>
                            </>
                        )}
                        <div className="text-[#FFD44D] mt-3 flex flex-row items-center gap-2">
                            <StarIcon />
                            <span className="text-[#566363]">
                                {averageRating?.toFixed(1)}
                            </span>
                            <span className="text-[#566363]">
                                ({infoProduct?.Review.length})
                            </span>
                        </div>
                        <div className="flex flex-row items-center gap-4 mt-8">
                            <span className="text-[#131717] font-semibold text-lg">
                                Quantity:{' '}
                            </span>
                            <div className="flex flex-row items-center gap-2">
                                <button
                                    onClick={() => {
                                        if (valueQuantity <= 1) {
                                            setValueQuantity(1);
                                        } else {
                                            setValueQuantity(valueQuantity - 1);
                                        }
                                    }}
                                    className="bg-[#C4D1D0] p-2 text-[#131717]"
                                >
                                    <RemoveIcon />
                                </button>
                                <span className="border border-[#C4D1D0] py-2 px-4 text-[#566363]">
                                    {valueQuantity}
                                </span>
                                <button
                                    onClick={() =>
                                        setValueQuantity(valueQuantity + 1)
                                    }
                                    className="bg-[#C4D1D0] p-2 text-[#131717]"
                                >
                                    <AddIcon />
                                </button>
                            </div>
                        </div>
                        {isLoadingProductDetail ? (
                            <Skeleton
                                animation="wave"
                                height={10}
                                width="50%"
                                style={{ marginBottom: 30, marginTop: 30 }}
                            />
                        ) : (
                            <p className="w-[70%] text-[#566363] my-8">
                                {infoProduct?.description}
                            </p>
                        )}
                        <button
                            onClick={() =>
                                infoProduct?.id &&
                                handleAddToCart({
                                    ...infoProduct,
                                    quantityBuy: valueQuantity,
                                })
                            }
                            className="w-[70%] bg-[#005D63] font-medium py-4 text-white"
                        >
                            Add to Cart
                        </button>
                        <button className="w-[70%] mt-4 font-medium bg-[#FFD44D] py-4 text-[#131717]">
                            Check Out
                        </button>
                    </div>
                </div>

                <div className="flex flex-row items-start justify-between gap-20 mt-24">
                    <div className="w-1/2">
                        <h2 className="text-[#131717] font-semibold text-xl">
                            Customer Reviews
                        </h2>

                        <div className="flex flex-row items-center mt-2 gap-0.5">
                            <Rating
                                name="read-only"
                                value={averageRating || 0}
                                readOnly
                                precision={0.5}
                                sx={{
                                    color: '#FFD44D',
                                }}
                            />
                            <span className="text-[#566363] ml-2">
                                {averageRating?.toFixed(1)}
                            </span>{' '}
                        </div>

                        <div className="mt-4">
                            {[5, 4, 3, 2, 1].map((star, idx) => {
                                const count = object[star] || 0;
                                const percentage =
                                    (count /
                                        (infoProduct?.Review.length || 1)) *
                                    100;

                                return (
                                    <div
                                        key={idx}
                                        className="flex flex-row items-center justify-between mb-4"
                                    >
                                        <p>{star} stars</p>
                                        <div className="w-[75%] relative">
                                            <div className="bg-[#C4D1D0] h-1 w-full"></div>
                                            <div
                                                className="absolute left-0 top-0 bg-[#404b4b] h-1"
                                                style={{
                                                    width: `${percentage}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <p>{count}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="w-1/2">
                        <h2 className="text-[#131717] font-semibold text-xl">
                            Customer Reviews
                        </h2>
                        <Rating
                            name="simple-controlled"
                            value={valueRating}
                            onChange={(event, newValue) => {
                                setValueRating(newValue ?? 0);
                            }}
                            sx={{ marginTop: '10px' }}
                        />
                        <div className="w-[70%]">
                            <p className="text-[#131717] mt-4 font-medium">
                                Ad a headline
                            </p>

                            <input
                                value={summary ?? ''}
                                onChange={(e) => setSummary(e.target.value)}
                                type="text"
                                placeholder="Write a summary of your review"
                                className="mt-4 border border-[#C4D1D0] p-4 w-full outline-none text-[#566363] placeholder:text-[#566363]"
                            />
                        </div>
                        <div className="mt-8 w-[70%]">
                            <p className="text-[#131717] mt-4 font-medium">
                                Write a review
                            </p>

                            <textarea
                                value={infoReview ?? ''}
                                onChange={(e) => setInfoReview(e.target.value)}
                                placeholder="Tell us what do you think"
                                className="mt-4 border border-[#C4D1D0] p-4 w-full h-[180px] outline-none text-[#566363] placeholder:text-[#566363]"
                            />
                        </div>
                        <button
                            onClick={handleSubmitReview}
                            className="bg-[#005D63] p-4 text-white mt-6 hover:opacity-95"
                        >
                            {isLoading ? <CircularProgress /> : 'Submit Review'}
                        </button>
                    </div>
                </div>

                {infoProduct?.Review && infoProduct?.Review.length >= 1 && (
                    <>
                        <div className="grid grid-cols-3 gap-8 mt-16">
                            {infoProduct.Review.slice(0, 9).map(
                                (review, idx) => (
                                    <ItemTestimonial
                                        key={idx}
                                        dataReview={review}
                                    />
                                )
                            )}
                        </div>
                        <button className="mt-16 text-white bg-[#005D63] py-4 px-6 hover:opacity-95 flex mx-auto">
                            Load More
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
