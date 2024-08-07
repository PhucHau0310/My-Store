'use client';

import Image from 'next/image';
import useCategories from '@/hooks/useCategories';

const Categories = () => {
    const { categories } = useCategories();

    return (
        <div className="bg-white py-14">
            <div className="max-w-screen-xl mx-auto">
                <h1 className="font-semibold text-3xl w-[25%] mb-10 mx-auto text-center">
                    Explore, find exactly what you need
                </h1>

                <div className="grid grid-cols-3 gap-8">
                    {categories.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center p-4 rounded-lg"
                        >
                            <div className="bg-[#F1DEB4] shadow-lg w-full h-64 p-4 rounded-lg mb-3 cursor-pointer flex justify-center items-center overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt="image"
                                    layout="fixed"
                                    width={180}
                                    height={180}
                                    className="object-cover hover:scale-105 transform transition-transform duration-300"
                                />
                            </div>
                            <h2 className="text-lg font-medium cursor-pointer text-center">
                                {item.name}
                            </h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;
