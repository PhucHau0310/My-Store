'use client';

import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Product } from '@/interface';
import {
    addToCart,
    removeFromCart,
    updateQtyBuy,
} from '@/lib/redux/slices/cartSlice';
import Link from 'next/link';

interface ProductExtends extends Product {
    quantityBuy: number;
}

const Cart = ({
    setClickCart,
}: {
    setClickCart: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const carts = useSelector(
        (state: { cart: { items: ProductExtends[] } }) => state.cart.items
    );

    return (
        <div className="fixed z-40 left-0 right-0 h-screen pt-[115px] bg-[#005D63] bg-opacity-70">
            <div className="max-w-screen-xl mx-auto h-[580px] bg-white relative">
                <button
                    onClick={() => setClickCart(false)}
                    className="bg-[#F1DEB4] p-2 text-[#131717] absolute right-0 top-0"
                >
                    <CloseIcon />
                </button>

                <div className="py-12 px-20 flex flex-row items-start justify-between gap-4">
                    <div className="w-1/2 h-[550px] pb-10 overflow-y-scroll">
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
                                        <p className="text-base font-medium">
                                            Qty: {item.quantityBuy}
                                        </p>
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
                                            Cart ID: ${item.categoryId}
                                        </p>
                                        <p className="text-[#131717] font-semibold text-lg">
                                            ${item.price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-1/2">
                        <div className="flex flex-row items-center justify-between border-b border-b-[#C4D1D0] pb-8">
                            <h1 className="text-[#131717] font-semibold text-lg">
                                Cart order total{' '}
                                <span className="ml-2">(3)</span>
                            </h1>
                            <p className="text-[#131717] font-semibold text-lg">
                                $
                                {carts.reduce(
                                    (acc, curr) =>
                                        acc + curr.price * curr.quantityBuy,
                                    0
                                )}
                            </p>
                        </div>

                        <p className="text-[#566363] text-base my-8">
                            <span className="text-lg">
                                Congrats! You get Free Shipping.
                            </span>
                            <br />
                            Excludes furniture, mattresses & other exclusions
                            apply.
                        </p>

                        <Link
                            href={'/viewcart'}
                            onClick={() => setClickCart(false)}
                        >
                            <button
                                // onClick={() => {
                                //     router.push(`/viewcart`);
                                //     setClickCart(false);
                                // }}
                                className="bg-[#005D63] mb-6 py-4 text-white text-base font-semibold w-full"
                            >
                                View Cart
                            </button>
                        </Link>

                        <Link
                            href={'/checkout'}
                            onClick={() => setClickCart(false)}
                        >
                            <button
                                // onClick={() => {
                                //     router.push(`/checkout`);
                                //     setClickCart(false);
                                // }}
                                className="bg-[#FFD44D] py-4 text-black text-base font-semibold w-full"
                            >
                                Check Out
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
