import Image from 'next/image';
import appleWatch from '../../../public/img/apple.png';
import iphone from '../../../public/img/ip.png';
import clock from '../../../public/img/clock.png';
import smartWatch from '../../../public/img/smartwatch.png';
import headPhone from '../../../public/img/head.png';
import ipot from '../../../public/img/ipot.png';
import laptop from '../../../public/img/laptop.png';

const explore = [
    {
        title: 'Apple Watch',
        icon: appleWatch,
    },
    {
        title: 'Iphone',
        icon: iphone,
    },
    {
        title: 'Alarm Clock',
        icon: clock,
    },
    {
        title: 'Smart Watch',
        icon: smartWatch,
    },
    {
        title: 'Head Phone',
        icon: headPhone,
    },
    {
        title: 'Ipot earphone',
        icon: ipot,
    },
    {
        title: 'Laptop',
        icon: laptop,
    },
];

const Explore = () => {
    return (
        <div className="bg-white py-14">
            <div className="max-w-screen-xl mx-auto">
                <h1 className="font-semibold text-3xl w-[25%] mb-10">
                    Explore, find exactly what you need
                </h1>

                <div className="grid grid-cols-4 gap-10">
                    {explore.map((item, idx) => (
                        <div
                            key={idx}
                            className="mb-4 flex flex-col items-center"
                        >
                            <div className="w-64 h-60 shadow-xl rounded-xl">
                                <Image
                                    src={item.icon}
                                    alt="image"
                                    width={800}
                                    height={800}
                                    className="w-full h-full rounded-xl"
                                />
                            </div>

                            <h2 className="font-semibold text-lg text-center mt-3">
                                {item.title}
                            </h2>
                        </div>
                    ))}
                </div>

                {/* <button className="flex items-center justify-center hover:opacity-95 mx-auto bg-[#005D63] text-white mt-8 py-4 px-8 w-34 h-14">
                    View All
                </button> */}
            </div>
        </div>
    );
};

export default Explore;
