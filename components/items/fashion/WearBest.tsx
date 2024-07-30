import Image from 'next/image';
import tShirts from '../../../public/img/t-shirts.png';
import tShirts2 from '../../../public/img/t-shirt-2.png';
import tShirts3 from '../../../public/img/t-shirt-3.png';
import tShirts4 from '../../../public/img/t-shirt-4.png';
import tShirts5 from '../../../public/img/t-shirt-5.png';
import ellipse from '../../../public/svg/ellipse.svg';
import { Features3 } from '@/constants';

const WearBest = () => {
    return (
        <div>
            <div className="w-full h-auto relative mb-64">
                <Image
                    src={tShirts}
                    alt="image"
                    width={1200}
                    height={1200}
                    className="w-full h-full"
                />

                <Image
                    src={tShirts2}
                    alt="image"
                    width={500}
                    height={500}
                    className="w-1/4 h-auto absolute right-0 top-[40%]"
                />

                <Image
                    src={ellipse}
                    alt="image"
                    width={500}
                    height={500}
                    className="w-1/4 h-auto absolute left-[6%]  -bottom-[30%]"
                />

                <h1 className="absolute left-[6%] w-1/3 -bottom-[22%] text-8xl font-bold ">
                    Wear the best
                </h1>
                <p className="absolute -bottom-[30%] w-1/5 left-1/3 text-[#131717] font-medium text-sm">
                    The most wanted styles is waiting for you. Find the best
                    styles of modern shoes for you. Still, the second option
                    holds promised. could make the tagline.
                </p>
            </div>

            <div className="max-w-screen-xl mx-auto flex flex-row items-center justify-between gap-14 mb-28">
                <div className="w-[55%] h-[516px]">
                    <Image
                        src={tShirts3}
                        alt="image"
                        width={800}
                        height={800}
                        className="w-full h-full"
                    />
                </div>

                <div className="w-[45%] flex flex-col gap-4">
                    <div className="w-[80%] h-[250px]">
                        <Image
                            src={tShirts4}
                            alt="image"
                            width={800}
                            height={800}
                            className="w-full h-full"
                        />
                    </div>
                    <div className="w-[80%] h-[250px]">
                        <Image
                            src={tShirts5}
                            alt="image"
                            width={800}
                            height={800}
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto flex flex-row items-center justify-between gap-10 mb-36">
                {Features3.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-[#FAFAFA] py-14 cursor-pointer transform transition-all duration-300 hover:drop-shadow-lg w-1/3 flex flex-col gap-3 items-center justify-center"
                    >
                        <div className="w-20 h-20 bg-[#E5E5E5] p-4 rounded-full mx-auto">
                            <Image
                                src={item.icon}
                                alt="icon"
                                width={100}
                                height={100}
                                className="w-full h-full"
                            />
                        </div>

                        <h2 className="font-semibold text-lg mx-auto w-[50%] text-center">
                            {item.title}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WearBest;
