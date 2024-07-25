'use client';

import { ListLinkFooter } from '@/constants';
import StarIcon from '@mui/icons-material/Star';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import CopyrightIcon from '@mui/icons-material/Copyright';
import paypal from '../../public/paypal.svg';
import visa from '../../public/visa.svg';
import card from '../../public/card.svg';
import Image from 'next/image';

const Footer = () => {
    return (
        <>
            <div className="bg-[#131717]">
                <div className="max-w-screen-xl mx-auto py-8">
                    <div className=" pb-10 border-b border-b-[#404B4B] flex flex-col items-center justify-center">
                        <h1 className="text-white font-medium text-lg">
                            Excellent
                        </h1>

                        <div className="flex flex-row gap-2 items-center my-2">
                            {Array(5)
                                .fill(null)
                                .map((_, idx) => (
                                    <div className="text-white bg-[#00B67A] p-2">
                                        <StarIcon />
                                    </div>
                                ))}
                        </div>

                        <h2 className="text-white font-normal">
                            Based on{' '}
                            <span className="font-semibold border-b-2 border-white">
                                13,586 reviews
                            </span>
                        </h2>

                        <div className="text-[#00B67A] mt-3 flex flex-row items-center">
                            <StarIcon />
                            <h3 className="text-white font-semibold text-base">
                                Trustpilot
                            </h3>
                        </div>
                    </div>

                    <div className="pt-8 pb-4">
                        <div className="w-full flex flex-row items-start">
                            <ul className="flex flex-row items-start justify-between w-[80%]">
                                {ListLinkFooter.map((item) => (
                                    <li
                                        key={item.id}
                                        className="w-[20%] text-white"
                                    >
                                        <p className="text-lg font-semibold mb-4">
                                            {item.title}
                                        </p>
                                        <ul className="text-[#A6B6B6]">
                                            {item.nestedTitle.map(
                                                (nestedItem) => (
                                                    <li
                                                        key={nestedItem.id}
                                                        className="mb-4 cursor-pointer hover:underline"
                                                    >
                                                        {nestedItem.title}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </li>
                                ))}
                            </ul>

                            <div className="w-[20%]">
                                <h3 className="text-white text-lg font-semibold mb-4">
                                    Follow Us
                                </h3>

                                <div className="flex flex-row items-center gap-2">
                                    {[FacebookIcon, LinkedInIcon, XIcon].map(
                                        (Item, idx) => (
                                            <div
                                                key={idx}
                                                className="text-white hover:bg-[#005D63] cursor-pointer bg-[#404B4B] w-8 h-8 flex items-center justify-center"
                                            >
                                                <Item
                                                    sx={{
                                                        width: '22px',
                                                        height: '22px',
                                                    }}
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#F1DEB4] py-6">
                <div className="max-w-screen-xl mx-auto flex flex-row items-center justify-between">
                    <h2 className="text-white font-semibold text-xl  w-64">
                        My <span className="text-red-300">Store</span>
                    </h2>

                    <div className="flex flex-row items-center gap-2">
                        {[paypal, visa, card].map((item, idx) => (
                            <div>
                                <Image
                                    src={item}
                                    alt={item}
                                    width={50}
                                    height={50}
                                    className=""
                                />
                            </div>
                        ))}
                    </div>

                    <h2 className="">
                        Copyright <CopyrightIcon /> NguyenPhucHau All Rights
                        Reserved
                    </h2>
                </div>
            </div>
        </>
    );
};

export default Footer;
