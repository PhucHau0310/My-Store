'use client';

import Image from 'next/image';
import paymentImg from '../../../public/img/payment.png';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '@/interface';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { User } from '@prisma/client';
import { resStatus } from '@/lib/redux/slices/statusSlice';
import { CircularProgress } from '@mui/material';
import { clearCarts } from '@/lib/redux/slices/cartSlice';

interface ProductExtends extends Product {
    quantityBuy: number;
}

const CheckOut = () => {
    const [checkedCard, setCheckedCard] = React.useState(false);
    const [paymentMethod, setPaymentMethod] = React.useState('');
    const [shipAddress, setShipAddress] = React.useState<string | null>(null);
    const [email, setEmail] = React.useState<string | null>(null);
    const [phone, setPhone] = React.useState<string | null>(null);
    const [isLoading, setLoading] = React.useState(false);

    const discountQuery = useSearchParams().get('discount');
    const router = useRouter();

    const carts = useSelector(
        (state: { cart: { items: ProductExtends[] } }) => state.cart.items
    );

    const handlePlaceOrder = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(event.target.value);
        setCheckedCard(event.target.value === 'CREDIT_CARD');
    };

    const { userId } = useAuth();
    const dispatch = useDispatch();

    React.useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${userId}`);
                const data: User = await res.json();

                if (res.ok) {
                    setEmail(data.email);
                    setPhone(data.mobile);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [userId]);

    const handleSubmit = async () => {
        if (!userId) {
            dispatch(
                resStatus({
                    status: 500,
                    message: 'Please sign in to checkout your orders!',
                })
            );
            return;
        }
        if (!paymentMethod || !email || !phone || !shipAddress) {
            dispatch(
                resStatus({
                    status: 500,
                    message:
                        'Please filled all information below and choose once payment method',
                })
            );

            return;
        }

        setLoading(true);
        try {
            const total = (
                carts.reduce(
                    (acc, curr) => acc + curr.quantityBuy * curr.price,
                    0
                ) - Number(discountQuery)
            ).toFixed(2);

            const data = {
                userId: userId,
                totalAmount: total,
                shippingAddress: shipAddress,
                paymentMethod: paymentMethod,
                carts: carts, // Add this line to include the cart items
            };

            const res = await fetch(`/api/order/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const { message } = await res.json();

            if (res.ok) {
                dispatch(clearCarts());

                const emailData = {
                    name: 'Customer',
                    email: email,
                    subject: 'Order Success',
                    message: 'Congratulation!!',
                };

                await fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(emailData),
                });

                router.push('/');
            }

            dispatch(resStatus({ status: res.status, message: message }));
        } catch (error) {
            console.log(error);
            dispatch(resStatus({ status: 500, message: 'Failed to checkout' }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white mt-20 pb-28">
            <div className="max-w-screen-xl mx-auto">
                <div className="w-full flex flex-row items-start">
                    <div className="w-1/2">
                        <h1 className="font-semibold text-xl mb-6 ">
                            Billing details
                        </h1>

                        <input
                            value={email ?? ''}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="Your email address..."
                            className="p-4 w-[80%] border border-[#C4D1D0] outline-none text-[#566363] placeholder:text-[#566363]"
                        />
                        <input
                            value={phone ?? ''}
                            onChange={(e) => setPhone(e.target.value)}
                            type="text"
                            placeholder="Your phone number..."
                            className="mt-6 p-4 w-[80%] border border-[#C4D1D0] outline-none text-[#566363] placeholder:text-[#566363]"
                        />
                        <input
                            value={shipAddress ?? ''}
                            onChange={(e) => setShipAddress(e.target.value)}
                            type="text"
                            placeholder="Your  address..."
                            className="mt-6 p-4 w-[80%] border border-[#C4D1D0] outline-none text-[#566363] placeholder:text-[#566363]"
                        />
                    </div>

                    <div className="w-1/2">
                        <h1 className="font-semibold text-xl mb-6 border-b border-b-[#C4D1D0] pb-6 w-[80%]">
                            Your order
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
                                <span>${Number(discountQuery).toFixed(2)}</span>
                            </p>
                        </div>

                        <div className="flex flex-row justify-between w-[80%] mt-4 text-[#131717]">
                            <p className="font-semibold text-lg">Total</p>
                            <p className="font-semibold text-lg">
                                ${' '}
                                {(
                                    carts.reduce(
                                        (acc, curr) =>
                                            acc + curr.quantityBuy * curr.price,
                                        0
                                    ) - Number(discountQuery)
                                ).toFixed(2)}
                            </p>
                        </div>

                        <h1 className="font-semibold text-xl mb-6 mt-10">
                            Pay With
                        </h1>

                        <div>
                            <div className="flex flex-row items-center gap-2">
                                <input
                                    type="radio"
                                    id="cod"
                                    name="pay_with"
                                    value="CASH_ON_DELIVERY"
                                    className="w-4 h-4"
                                    onChange={handlePlaceOrder}
                                />
                                <label
                                    htmlFor="cod"
                                    className="text-[#566363] font-normal text-base"
                                >
                                    Cash On Delivery
                                </label>
                            </div>

                            <div className="flex flex-row items-center justify-between mt-4 mb-3 w-[80%]">
                                <div className="flex flex-row items-center gap-2 ">
                                    <input
                                        type="radio"
                                        id="card"
                                        name="pay_with"
                                        value="CREDIT_CARD"
                                        className="w-4 h-4"
                                        onChange={handlePlaceOrder}
                                    />
                                    <label
                                        htmlFor="card"
                                        className="text-[#566363] font-normal text-base"
                                    >
                                        Card
                                    </label>
                                </div>

                                <Image
                                    src={paymentImg}
                                    alt="image"
                                    width={70}
                                    height={70}
                                />
                            </div>
                            {checkedCard && (
                                <div className="w-[80%] my-6">
                                    <input
                                        type="text"
                                        placeholder="Card Number"
                                        className="text-[#C4D1D0] w-1/2 outline-none p-4 border border-[#C4D1D0]"
                                    />
                                    <div className="flex flex-row gap-4 mt-4">
                                        <input
                                            type="text"
                                            placeholder="Expiration date"
                                            className="text-[#C4D1D0] w-1/2 outline-none p-4 border border-[#C4D1D0]"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Security code"
                                            className="text-[#C4D1D0] w-1/2 outline-none p-4 border border-[#C4D1D0]"
                                        />
                                    </div>
                                    <div className="flex flex-row gap-4 mt-4">
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            className="text-[#C4D1D0] w-1/2 outline-none p-4 border border-[#C4D1D0]"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            className="text-[#C4D1D0] w-1/2 outline-none p-4 border border-[#C4D1D0]"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-row items-center gap-2">
                                <input
                                    type="radio"
                                    id="paypal"
                                    name="pay_with"
                                    value="PAYPAL"
                                    className="w-4 h-4"
                                    onChange={handlePlaceOrder}
                                />
                                <label
                                    htmlFor="paypal"
                                    className="text-[#566363] font-normal text-base"
                                >
                                    Paypal
                                </label>
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-[80%] bg-[#FFD44D] mt-5 font-medium text-base text-[#131717] p-4"
                        >
                            {isLoading ? <CircularProgress /> : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
