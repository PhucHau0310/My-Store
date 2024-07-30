import Image from 'next/image';
import appleWatch from '../../../public/img/apple-watch.png';

const Explore = () => {
    return (
        <div className="bg-white py-14">
            <div className="max-w-screen-xl mx-auto">
                <h1 className="font-semibold text-3xl w-[25%] mb-10">
                    Explore, find exactly what you need
                </h1>

                <div className="grid grid-cols-4 gap-10">
                    {Array(8)
                        .fill(null)
                        .map((product, idx) => (
                            <div key={idx} className="mb-4">
                                <div>
                                    <Image
                                        src={appleWatch}
                                        alt="image"
                                        width={800}
                                        height={800}
                                        className="w-full h-full rounded-xl"
                                    />
                                </div>

                                <h2 className="font-semibold text-lg text-center mt-3">
                                    Apple Watch
                                </h2>
                            </div>
                        ))}
                </div>

                <button className="flex items-center justify-center hover:opacity-95 mx-auto bg-[#005D63] text-white mt-8 py-4 px-8 w-34 h-14">
                    View All
                </button>
            </div>
        </div>
    );
};

export default Explore;
