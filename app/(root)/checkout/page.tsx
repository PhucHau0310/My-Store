import Image from 'next/image';
import paymentImg from '../../../public/img/payment.png';

const CheckOut = () => {
    return (
        <div className="bg-white mt-20 pb-28">
            <div className="max-w-screen-xl mx-auto">
                <div className="w-full flex flex-row items-start">
                    <div className="w-1/2">
                        <h1 className="font-semibold text-xl mb-6 ">
                            Billing details
                        </h1>

                        <input
                            type="text"
                            placeholder="Your email address"
                            className="p-4 w-[80%] border border-[#C4D1D0] outline-none text-[#566363] placeholder:text-[#566363]"
                        />
                        <input
                            type="text"
                            placeholder="Your phone number"
                            className="mt-6 p-4 w-[80%] border border-[#C4D1D0] outline-none text-[#566363] placeholder:text-[#566363]"
                        />
                        <input
                            type="text"
                            placeholder="Your  address"
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
                                <span>$582.00</span>
                            </p>
                            <p className="mt-4 text-[#566363] flex flex-row items-center justify-between">
                                <span>Savings</span>
                                <span>$582.00</span>
                            </p>
                            <p className="mt-4 text-[#566363] flex flex-row items-center justify-between">
                                <span>Shipping</span>
                                <span>FREE</span>
                            </p>
                        </div>

                        <div className="flex flex-row justify-between w-[80%] mt-4 text-[#131717]">
                            <p className="font-semibold text-lg">Total</p>
                            <p className="font-semibold text-lg">$450.00</p>
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
                                />
                                <label
                                    htmlFor="cod"
                                    className="text-[#566363] font-normal text-base"
                                >
                                    Cash On Delivery
                                </label>
                            </div>

                            <div className="flex flex-row items-center justify-between mt-4 w-[80%]">
                                <div className="flex flex-row items-center gap-2 ">
                                    <input
                                        type="radio"
                                        id="card"
                                        name="pay_with"
                                        value="CREDIT_CARD"
                                        className="w-4 h-4"
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

                            <div className="flex flex-row items-center gap-2">
                                <input
                                    type="radio"
                                    id="paypal"
                                    name="pay_with"
                                    value="PAYPAL"
                                    className="w-4 h-4"
                                />
                                <label
                                    htmlFor="paypal"
                                    className="text-[#566363] font-normal text-base"
                                >
                                    Paypal
                                </label>
                            </div>
                        </div>

                        <button className="w-[80%] bg-[#FFD44D] mt-5 font-medium text-base text-[#131717] p-4">
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
