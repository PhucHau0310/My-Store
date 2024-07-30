'use client';

import CloseIcon from '@mui/icons-material/Close';
import girl1 from '../../public/img/girl-1.png';
import Image from 'next/image';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useRouter } from 'next/navigation';

const Cart = ({
    setClickCart,
}: {
    setClickCart: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const router = useRouter();
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
                        {Array(5)
                            .fill(null)
                            .map((item, idx) => (
                                <div key={idx} className="w-[85%] mb-4">
                                    <div className="flex flex-row items-center justify-between border-b border-b-[#C4D1D0] pb-5">
                                        <p className="text-[#131717] font-normal text-base">
                                            Item {idx + 1}
                                        </p>
                                        <div className="flex flex-row items-center gap-8">
                                            <button className="text-[#566363] border-b border-b-[#566363]">
                                                Edit
                                            </button>
                                            <button className="text-[#566363] border-b border-b-[#566363]">
                                                Remove
                                            </button>

                                            <div className="flex flex-row items-center gap-2">
                                                <button className="bg-[#C4D1D0] p-1 text-[#131717]">
                                                    <RemoveIcon />
                                                </button>
                                                <span className="border border-[#C4D1D0] py-1 px-3 text-[#566363]">
                                                    1
                                                </span>
                                                <button className="bg-[#C4D1D0] p-1 text-[#131717]">
                                                    <AddIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row items-center gap-4 mt-3">
                                        <Image
                                            src={girl1}
                                            alt="image"
                                            width={100}
                                            height={100}
                                            className=""
                                        />
                                        <div className="flex flex-col justify-between">
                                            <h2 className="text-[#131717] font-semibold text-lg">
                                                Modern Green Sweater
                                            </h2>
                                            <p className="text-[#566363] text-lg font-normal my-2">
                                                Cart ID: 12345678910
                                            </p>
                                            <p className="text-[#131717] font-semibold text-lg">
                                                $60
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
                                $582
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

                        <button
                            onClick={() => {
                                router.push(`/checkout`);
                                setClickCart(false);
                            }}
                            className="bg-[#005D63] py-4 text-white text-base font-semibold w-full"
                        >
                            Check Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
