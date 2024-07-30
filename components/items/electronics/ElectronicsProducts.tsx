import Image from 'next/image';
import modernShoes from '../../../public/img/modern-shoes.png';
import clock from '../../../public/img/clock.png';
import { Features2 } from '@/constants';

const ElectronicsProducts = () => {
    return (
        <div className="bg-[#F1DEB4] h-[600px] py-14 relative">
            <div className="max-w-screen-xl mx-auto flex flex-row items-center gap-10">
                <div className="w-1/2">
                    <h1 className="font-semibold text-5xl w-[80%]">
                        Choose Your Latest Electronics Products
                    </h1>
                    <h2 className="w-2/3 font-normal text-base my-7">
                        The most wanted styles is waiting for you. Find the best
                        styles of modern shoes for you. Still, the second option
                        holds promised. could make the tagline.
                    </h2>

                    <button className="bg-[#005D63] rounded-lg w-[30%] p-4 text-white hover:opacity-95">
                        Explore Product
                    </button>
                </div>

                <div className="w-1/2 relative">
                    <Image
                        src={clock}
                        alt="clock image"
                        width={800}
                        height={800}
                        className="w-[58%] relative z-10"
                    />

                    <div className="absolute -top-6 -left-8 w-[200px] h-[210px] border-4 border-[#005D63] rounded-xl"></div>
                    <div className="absolute -bottom-6 right-[38%] w-[200px] h-[200px] bg-[#005D63] rounded-xl"></div>
                </div>
            </div>

            <div className="max-w-screen-xl drop-shadow-lg px-10 py-16 rounded-lg left-0 right-0 mx-auto absolute -bottom-[18%] bg-white flex flex-row items-center justify-between">
                {Features2.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-row items-center gap-4"
                    >
                        <div className="w-16 h-w-16">
                            <Image
                                src={item.icon}
                                alt="image"
                                width={50}
                                height={50}
                                className="w-full h-full"
                            />
                        </div>

                        <div className="text-[#000000]">
                            <h3 className="font-semibold text-lg">
                                {item.title}
                            </h3>
                            <p className="font-normal text-base mt-3">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ElectronicsProducts;
