import imgFake from '../../../public/img/ecommerce.png';
import Image from 'next/image';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const fakeBlog = [
    {
        id: 1,
        image: imgFake,
        title: '7 examples of the best eCommerce websites to take notes from',
    },
    {
        id: 2,
        image: imgFake,
        title: '7 examples of the best eCommerce websites to take notes from',
    },
    {
        id: 3,
        image: imgFake,
        title: '7 examples of the best eCommerce websites to take notes from',
    },
    {
        id: 4,
        image: imgFake,
        title: '7 examples of the best eCommerce websites to take notes from',
    },
];

const ReadBlog = () => {
    return (
        <div className="bg-white py-14">
            <div className="max-w-screen-xl mx-auto">
                <h1 className="font-semibold text-3xl mb-4 w-[28%]">
                    Learn how to build and grow your online store
                </h1>

                <h2 className="text-[#566363] text-sm w-[28%]">
                    Get insider tips and step-by-step guidance from eCommerce
                    experts and successful Wix Merchants.
                </h2>

                <div className="flex flex-row items-center gap-10 mt-14 mb-12">
                    {fakeBlog.map((item, idx) => (
                        <div key={idx} className="w-[25%]">
                            <div className="w-full h-[200px] cursor-pointer">
                                <Image
                                    src={item.image}
                                    alt="image"
                                    width={500}
                                    height={500}
                                    className="w-full h-full"
                                />
                            </div>

                            <h3 className="text-[#566363] text-base my-5 cursor-pointer">
                                {item.title}
                            </h3>

                            <button className="text-[#131717] font-semibold border-b-2 border-b-[#131717]">
                                Read the blog <ChevronRightIcon />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReadBlog;
