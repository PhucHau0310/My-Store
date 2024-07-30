import Image from 'next/image';
import e from '../../../public/img/ecommerce.png';

const OurBlog = () => {
    return (
        <div className="bg-white py-14">
            <div className="max-w-screen-xl mx-auto">
                <div className="w-full flex flex-row items-end">
                    <div className="w-2/3">
                        <h1 className="font-semibold text-3xl mb-4 w-[28%]">
                            Read our blogs
                        </h1>

                        <h2 className="text-[#566363] text-sm w-[45%]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. In urna, non nisl tincidunt ut elementum
                            turpis.
                        </h2>
                    </div>

                    <button className="bg-[#005D63] text-white px-6 py-4 rounded-2xl hover:bg-white hover:text-[#005D63] hover:border hover:border-[#005D63] transform transition-colors duration-300">
                        READ ALL BLOGS
                    </button>
                </div>

                <div className="flex flex-row items-center gap-32 justify-between mt-24 pb-4">
                    {Array(2)
                        .fill(null)
                        .map((blog, idx) => (
                            <div key={idx}>
                                <div className="w-full h-auto">
                                    <Image
                                        src={e}
                                        alt="image"
                                        width={500}
                                        height={500}
                                        className="w-full h-full"
                                    />
                                </div>

                                <p className="text-[#005D63] font-medium text-sm my-4">
                                    April 30, 2020
                                </p>
                                <h2 className="font-semibold text-xl text-[#131717]">
                                    How to collaborate with companies
                                </h2>

                                <h3 className="text-[#889595] text-sm my-3 font-normal">
                                    I will say this will be a game-changer for
                                    designers. They have a very interesting idea
                                    of sorting resources (templates and blocks)
                                    with a huge collection of resources. This
                                    will make the design work faster.
                                </h3>

                                <button className="text-[#181817] font-semibold hover:underline">
                                    READ MORE
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default OurBlog;
