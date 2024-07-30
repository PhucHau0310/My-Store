import { Features } from '@/constants';
import Image from 'next/image';

const Feature = () => {
    return (
        <div className="bg-[#FFD44D] py-24">
            <div className="max-w-screen-xl mx-auto flex flex-row items-center justify-between gap-8">
                {Features.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white px-4 py-10 hover:shadow-2xl hover:scale-105 transform transition-transform duration-300 cursor-pointer"
                    >
                        <div className="w-1/2 h-[80px] mx-auto">
                            <Image
                                src={item.icon}
                                alt="svg"
                                width={60}
                                height={60}
                                className="w-full h-full"
                            />
                        </div>

                        <h1 className="text-[#131717] font-semibold text-xl text-center my-3">
                            {item.title}
                        </h1>
                        <p className="text-[#566363] font-normal text-base text-center">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feature;
