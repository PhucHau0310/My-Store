'use client';

import Image from 'next/image';
import girl1 from '../../../../../public/img/girl-1.png';
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Rating } from '@mui/material';
import React from 'react';
import ItemTestimonial from '@/components/cards/ItemTestimonial';

const fakeData = [
    {
        title: '5 Stars',
        quantity: 37,
    },
    {
        title: '4 Stars',
        quantity: 20,
    },
    {
        title: '3 Stars',
        quantity: 12,
    },
    {
        title: '2 Stars',
        quantity: 8,
    },
    {
        title: '1 Stars',
        quantity: 0,
    },
];

const ProductDetail = () => {
    const [valueRating, setValueRating] = React.useState(0);
    const [valueQuantity, setValueQuantity] = React.useState(1);

    return (
        <div className="bg-white mt-20 pb-28">
            <div className="max-w-screen-xl mx-auto">
                <div className="flex flex-row items-center justify-between gap-20">
                    <div className="w-1/2 h-[500px]">
                        <Image
                            src={girl1}
                            alt="image"
                            width={800}
                            height={800}
                            className="w-full h-full"
                        />
                    </div>

                    <div className="w-1/2 h-[500px]">
                        <h2 className="text-[#566363] font-normal text-base">
                            Women-Cloths
                        </h2>
                        <h1 className="text-[#131717] font-semibold text-xl mb-2">
                            Modern Green Sweater
                        </h1>
                        <p className="text-[#F86624] font-normal text-base">
                            <span className="line-through text-[#566363] mr-2">
                                $102
                            </span>
                            $60
                        </p>
                        <div className="text-[#FFD44D] mt-3 flex flex-row items-center gap-2">
                            <StarIcon />
                            <span className="text-[#566363]">5.0</span>
                            <span className="text-[#566363]">(37)</span>
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
                        <p className="w-[70%] text-[#566363] my-8">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam,{' '}
                        </p>
                        <button className="w-[70%] bg-[#005D63] font-medium py-4 text-white">
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

                        <p className="text-[#131717] mt-4">77 Reviews</p>
                        <div className="flex flex-row items-center mt-2 gap-0.5 text-[#FFD44D]">
                            {Array(5)
                                .fill(null)
                                .map((_, idx) => (
                                    <StarIcon />
                                ))}
                        </div>

                        <div className="mt-4">
                            {fakeData.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-row items-center justify-between mb-4"
                                >
                                    <p>{item.title}</p>
                                    <div className="w-[75%] relative">
                                        <div className="bg-[#C4D1D0] h-1 w-full"></div>
                                        <div
                                            className="absolute left-0 top-0 bg-[#404b4b] h-1"
                                            style={{
                                                // width: `${item.percentage}%`,
                                                width: `${60}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <p>{item.quantity}</p>
                                </div>
                            ))}
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
                                placeholder="Tell us what do you think"
                                className="mt-4 border border-[#C4D1D0] p-4 w-full h-[180px] outline-none text-[#566363] placeholder:text-[#566363]"
                            />
                        </div>
                        <button className="bg-[#005D63] p-4 text-white mt-6 hover:opacity-95">
                            Submit Review
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-8 mt-16">
                    {Array(6)
                        .fill(null)
                        .map((review, idx) => (
                            <ItemTestimonial key={idx} dataReview={null} />
                        ))}
                </div>
                <button className="mt-16 text-white bg-[#005D63] py-4 px-6 hover:opacity-95 flex mx-auto">
                    Load More
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
