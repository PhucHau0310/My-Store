import Image from 'next/image';
import modernShoes from '../../public/modern-shoes.png';
import starBlack from '../../public/star-black.svg';
import rectangle from '../../public/rectangle.png';

const ModernShoes = () => {
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

                    <button className="bg-[#005D63] w-[30%] p-4 text-white hover:opacity-95">
                        Explore Product
                    </button>

                    <div className="flex flex-row items-center gap-2 mt-20">
                        {Array(3)
                            .fill(null)
                            .map((_, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white w-10 h-1"
                                ></div>
                            ))}
                    </div>
                </div>

                <div className="w-1/2 relative">
                    <Image
                        src={modernShoes}
                        alt="modern shoes"
                        width={500}
                        height={500}
                        className="w-2/3"
                    />

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
