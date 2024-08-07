'use client';

import Image from 'next/image';
import modernShoes from '../../../public/img/modern-shoes.png';
import starBlack from '../../../public/svg/star-black.svg';
import rectangle from '../../../public/img/rectangle.png';
import thumb from '../../../public/img/thumb.png';
import thumb2 from '../../../public/img/thumb2.png';
import Link from 'next/link';
import React from 'react';

const thumbNail = [
    {
        id: 1,
        picture: modernShoes,
    },
    {
        id: 2,
        picture: thumb,
    },
    {
        id: 3,
        picture: thumb2,
    },
];

const ModernShoes = () => {
    const [currentImage, setCurrentImage] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % thumbNail.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className="bg-[#F1DEB4] h-[600px] py-14">
            <div className="max-w-screen-xl mx-auto flex flex-row items-center gap-4">
                <div className="w-1/2">
                    <h1 className="font-semibold text-5xl w-2/3">
                        Find the best styles of modern shoes
                    </h1>
                    <h2 className="w-2/3 font-normal text-base my-7">
                        The most wanted styles is waiting for you. Find the best
                        styles of modern shoes for you .
                    </h2>

                    <Link href={'/product-fashion'}>
                        <button className="bg-[#005D63] w-[30%] p-4 text-white hover:opacity-95">
                            Explore Product
                        </button>
                    </Link>

                    <div className="flex flex-row items-center gap-2 mt-20">
                        {Array(3)
                            .fill(null)
                            .map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`${
                                        idx === currentImage
                                            ? 'bg-black'
                                            : 'bg-white'
                                    } w-10 h-1 transform transition-all duration-500`}
                                ></div>
                            ))}
                    </div>
                </div>

                <div className="w-1/2 relative">
                    <div className="relative w-2/3 h-[500px]">
                        {thumbNail.map((item, idx) => (
                            <Image
                                key={idx}
                                src={item.picture}
                                alt={`modern shoes ${idx + 1}`}
                                layout="fill"
                                objectFit="cover"
                                className={`absolute top-0 left-0 transition-opacity duration-500 ${
                                    idx === currentImage
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                }`}
                            />
                        ))}
                    </div>

                    <Image
                        src={starBlack}
                        alt="star black"
                        width={100}
                        height={100}
                        className="absolute top-20 -left-12"
                    />

                    <Image
                        src={rectangle}
                        alt="rectangle"
                        width={500}
                        height={500}
                        className="absolute bottom-0 left-0 w-[80.8%]"
                    />
                </div>
            </div>
        </div>
    );
};

export default ModernShoes;
