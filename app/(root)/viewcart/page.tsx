'use client';

import { Product } from '@/interface';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
    addToCart,
    removeFromCart,
    updateQtyBuy,
} from '@/lib/redux/slices/cartSlice';
import Link from 'next/link';
import React from 'react';
import { Promotion } from '@prisma/client';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

interface ProductExtends extends Product {
    quantityBuy: number;
}

const viewCart = () => {
    const [codeCoupon, setCodeCoupon] = React.useState<string | null>(null);
    const [promotions, setPromotions] = React.useState<Promotion[]>([]);
    const [messageApply, setMessageApply] = React.useState<{
        status: number | null;
        message: string | null;
    }>({ status: null, message: null });
    const [totalDiscounts, setTotalDiscounts] = React.useState<number>(0);
    const [listsCode, setListsCode] = React.useState<string[]>([]);

    const carts = useSelector(
        (state: { cart: { items: ProductExtends[] } }) => state.cart.items
    );

    const dispatch = useDispatch();

    const handleQuantityChange = (productId: string, newQuantity: number) => {
        const product = carts.find((item) => item.id === productId);
        if (product) {
            // dispatch(removeFromCart(product.id));
            dispatch(
                updateQtyBuy({ productId: productId, dataUpdate: newQuantity })
            );
            dispatch(addToCart({ ...product, quantityBuy: newQuantity }));
        }
    };

    React.useEffect(() => {
        const getPromotions = async () => {
            try {
                const res = await fetch(`/api/discount`);
                const data = await res.json();

                if (res.ok) {
                    setPromotions(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getPromotions();
    }, []);

    const handleApply = () => {
        if (!codeCoupon) {
            setMessageApply({
                status: 500,
                message: 'Please enter discount code!',
            });
            return;
        }

        const currentPromotion = promotions.find((item) => {
            const currentDate = new Date();
            const startDate = new Date(item.startDate);
            const endDate = new Date(item.endDate);
            return (
                item.code === codeCoupon &&
                currentDate >= startDate &&
                currentDate <= endDate &&
                item.isActive
            );
        });

        const validCode = carts.find(
            (item) => item.categoryId === currentPromotion?.categoryId
        );

        if (currentPromotion && validCode) {
            setListsCode((prev) => [...prev, currentPromotion.code]);

            setMessageApply({
                status: 200,
                message: 'Apply discount code success!',
            });

            const discountAmount = carts.reduce((acc, curr) => {
                if (curr.categoryId === currentPromotion.categoryId) {
                    return (
                        acc +
                        ((curr.price * currentPromotion.discount) / 100) *
                            curr.quantityBuy
                    );
                }
                return acc;
            }, 0);

            setTotalDiscounts((prev) => prev + discountAmount);
        } else {
            setMessageApply({
                status: 500,
                message:
                    'Coupon code is invalid or categoryId not match or expired discount, please once again!',
            });
        }
    };

    // console.log(listsCode);
    return (
        <div className="bg-white mt-20 pb-28">
            <div className="max-w-screen-xl mx-auto">
                <div className="w-full flex flex-row items-start">
                    <div className="w-[60%]">
                        <h1 className="font-semibold text-xl mb-6 ">
                            Shopping Cart ({carts.length} items)
                        </h1>

                        <div>
                            {carts.map((item, idx) => (
                                <div key={idx} className="w-[85%] mb-4">
                                    <div className="flex flex-row items-center justify-between border-b border-b-[#C4D1D0] pb-5">
                                        <p className="text-[#131717] font-normal text-base">
                                            Item {idx + 1}
                                        </p>
                                        <div className="flex flex-row items-center gap-8">
                                            <button
                                                onClick={() =>
                                                    dispatch(
                                                        removeFromCart(item.id)
                                                    )
                                                }
                                                className="text-[#566363] border-b border-b-[#566363]"
                                            >
                                                Remove
                                            </button>

                                            <div className="flex flex-row items-center gap-2">
                                                <p className="text-base font-medium">
                                                    Qty:{' '}
                                                </p>
                                                <button
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            item.id,
                                                            Math.max(
                                                                item.quantityBuy -
                                                                    1,
                                                                1
                                                            )
                                                        )
                                                    }
                                                    className="bg-[#C4D1D0] p-1 text-[#131717]"
                                                >
                                                    <RemoveIcon />
                                                </button>
                                                <span className="border border-[#C4D1D0] py-1 px-3 text-[#566363]">
                                                    {item.quantityBuy}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            item.id,
                                                            item.quantityBuy + 1
                                                        )
                                                    }
                                                    className="bg-[#C4D1D0] p-1 text-[#131717]"
                                                >
                                                    <AddIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row items-center gap-4 mt-3">
                                        <Image
                                            src={item.picture}
                                            alt="image"
                                            width={100}
                                            height={100}
                                            className=""
                                        />
                                        <div className="flex flex-col justify-between">
                                            <h2 className="text-[#131717] font-semibold text-lg">
                                                {item.name}
                                            </h2>
                                            <p className="text-[#566363] text-lg font-normal my-2">
                                                Cart ID: {item.categoryId}
                                            </p>
                                            <p className="text-[#131717] font-semibold text-lg">
                                                ${item.price}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-[40%]">
                        <h2 className="font-semibold text-xl mb-4 w-[80%]">
                            Discount Coupon
                        </h2>

                        <div className="w-full">
                            <input
                                value={codeCoupon ?? ''}
                                onChange={(e) => setCodeCoupon(e.target.value)}
                                type="text"
                                className="outline-none border border-[#C4D1D0] p-2 w-[55%]"
                                placeholder="Coupon code..."
                            />
                            <button
                                onClick={handleApply}
                                className="bg-blue-600 text-white p-2 w-[23%] ml-2 hover:bg-opacity-95"
                            >
                                Apply
                            </button>
                        </div>

                        {messageApply.status && (
                            <p
                                className={`${
                                    messageApply.status === 200
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                } mb-2 mt-3 w-[80%]`}
                            >
                                {messageApply.message}
                            </p>
                        )}

                        {listsCode.length >= 1 && (
                            <ul className="ml-10">
                                {listsCode.map((item, idx) => (
                                    <li key={idx} className="">
                                        <FiberManualRecordIcon
                                            sx={{
                                                width: '12px',
                                                height: '12px',
                                            }}
                                        />{' '}
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <h1 className="font-semibold text-xl mt-8 mb-6 border-b border-b-[#C4D1D0] pb-6 w-[80%]">
                            Order Summary
                        </h1>

                        <div className="w-[80%] border-b border-b-[#C4D1D0] pb-6">
                            <p className="text-[#566363] flex flex-row items-center justify-between">
                                <span>Original Price</span>
                                <span>
                                    $
                                    {carts
                                        .reduce(
                                            (acc, curr) =>
                                                acc +
                                                curr.quantityBuy * curr.price,
                                            0
                                        )
                                        .toFixed(2)}
                                </span>
                            </p>
                            <p className="mt-4 text-[#566363] flex flex-row items-center justify-between">
                                <span>Savings</span>
                                <span>$10.00</span>
                            </p>
                            <p className="mt-4 text-[#566363] flex flex-row items-center justify-between">
                                <span>Shipping</span>
                                <span>FREE</span>
                            </p>
                            <p className="mt-4 text-[#566363] flex flex-row items-center justify-between">
                                <span>Discount</span>
                                <span>${totalDiscounts}</span>
                            </p>
                        </div>

                        <div className="flex flex-row justify-between w-[80%] mt-4 text-[#131717]">
                            <p className="font-semibold text-lg">Total</p>
                            <p className="font-semibold text-lg">
                                $
                                {(
                                    carts.reduce(
                                        (acc, curr) =>
                                            acc + curr.quantityBuy * curr.price,
                                        0
                                    ) - totalDiscounts
                                ).toFixed(2)}
                            </p>
                        </div>
                        <Link
                            href={{
                                pathname: '/checkout',
                                query: { discount: totalDiscounts },
                            }}
                            className="w-[80%] flex items-center justify-center bg-[#FFD44D] mt-5 font-medium text-base text-[#131717] p-4"
                        >
                            Place Order
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default viewCart;
