import Image from 'next/image';
import people from '../../public/people.png';

const Categories = () => {
    return (
        <div className="bg-white py-14">
            <div className="max-w-screen-xl mx-auto">
                <h1 className="font-semibold text-3xl w-[25%] mb-10 mx-auto text-center">
                    Explore, find exactly what you need
                </h1>

                <div className="grid grid-cols-3 gap-5">
                    {Array(7)
                        .fill(null)
                        .map((_, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center"
                            >
                                <div className="bg-[#F1DEB4] p-4 rounded-lg mb-3">
                                    <Image
                                        src={people}
                                        alt="image"
                                        width={200}
                                        height={200}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                                <h2 className="text-lg font-medium">Fashion</h2>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;
