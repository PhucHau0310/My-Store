import Image from 'next/image';
import girl1 from '../../../public/img/girl-1.png';
import girl2 from '../../../public/img/girl-2.png';

const Bringing = () => {
    return (
        <div className="bg-white py-14">
            <div className="max-w-screen-xl mx-auto">
                <div className="w-full flex flex-row items-end">
                    <div className="w-2/3">
                        <h1 className="font-semibold text-3xl mb-4 w-[30%]">
                            Bringing You the Elements of Style
                        </h1>

                        <h2 className="text-[#566363] text-sm w-[45%]">
                            Circle back minimize backword overflow yet products
                            need full resourcing and support form a cross-
                            functional team in order to be built
                        </h2>
                    </div>
                </div>

                <div className="flex flex-row items-center gap-32 justify-between mt-16 pb-4">
                    <div className="w-full h-auto">
                        <Image
                            src={girl1}
                            alt="image"
                            width={500}
                            height={500}
                            className="w-full h-full"
                        />
                    </div>
                    <div className="w-full h-auto">
                        <Image
                            src={girl2}
                            alt="image"
                            width={800}
                            height={800}
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bringing;
