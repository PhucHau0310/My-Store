import Image from 'next/image';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AddIcon from '@mui/icons-material/Add';
import girl1 from '../../../public/img/girl-1.png';

const Blog = () => {
    return (
        <div className="bg-white pb-18">
            <div className="bg-[#F1DEB4] py-28">
                <h1 className="font-semibold text-6xl mb-6 text-center">
                    Read our latest blog
                </h1>
                <p className="font-normal text-base text-center w-1/3 mx-auto">
                    We provide actionable insights to help you stay on the
                    cutting edge of ecommerce. Join our thought leadership
                    community to get ecommerce tips right to your inbox
                </p>
            </div>

            <div className="max-w-screen-xl mx-auto py-12">
                <div className="w-full">
                    <h2 className="text-[#131717] font-semibold text-3xl mb-10">
                        Featured
                    </h2>
                    <div className="w-full flex flex-row gap-10 items-center justify-between">
                        <div className="w-1/3 h-[300px]">
                            <Image
                                src={girl1}
                                alt="image"
                                width={500}
                                height={500}
                                className="w-full h-full"
                            />

                            <h3 className="text-base mt-4 font-semibold text-[#131717]">
                                30 type of modern trendy fashion for women and
                                men in 2022 worlwide
                            </h3>
                            <p className="text-[#566363] mt-2 text-sm font-normal">
                                July 7, 2022 | By Warner
                            </p>
                        </div>

                        <div className="text-red-400 w-16 h-16">
                            <EmojiEmotionsIcon
                                sx={{ width: '64px', height: '64px' }}
                            />
                        </div>

                        <div className="w-1/3 h-[300px]">
                            <Image
                                src={girl1}
                                alt="image"
                                width={500}
                                height={500}
                                className="w-full h-full"
                            />

                            <h3 className="text-base mt-4 font-semibold text-[#131717]">
                                30 type of modern trendy fashion for women and
                                men in 2022 worlwide
                            </h3>
                            <p className="text-[#566363] mt-2 text-sm font-normal">
                                July 7, 2022 | By Warner
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-36">
                    <h2 className="text-[#131717] font-semibold text-3xl mb-10">
                        Latest from the anyone
                    </h2>

                    <div className="grid grid-cols-3 gap-3 w-full">
                        {Array(9)
                            .fill(null)
                            .map((blog, idx) => (
                                <div key={idx} className="w-[80%] h-[350px]">
                                    <Image
                                        src={girl1}
                                        alt="image"
                                        width={500}
                                        height={500}
                                        className="w-full h-[70%]"
                                    />

                                    <h3 className="text-base mt-4 font-semibold text-[#131717]">
                                        30 type of modern trendy fashion for
                                        women and men in 2022 worlwide
                                    </h3>
                                    <p className="text-[#566363] mt-2 text-sm font-normal">
                                        July 7, 2022 | By Warner
                                    </p>
                                </div>
                            ))}
                    </div>

                    <button className="flex mx-auto mt-14 bg-[#005D63] py-4 px-6 hover:opacity-95 text-white">
                        Load More
                    </button>
                </div>
            </div>

            <button className="fixed bottom-5 right-5 bg-[#005D63] text-white rounded-full p-4 hover:scale-105 transform transition-transform duration-300">
                <AddIcon />
            </button>
        </div>
    );
};

export default Blog;
