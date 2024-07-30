import Image from 'next/image';
import saleDay from '../../../public/img/sale.png';
import ItemCart from '../../cards/ItemCart';

const fakeData = [
    {
        id: '1',
        name: 'Mid Century Modern T-Shirt',
        picture: '',
        version: '1.0',
        description: 'nice good awesome',
        price: 110,
        quantity: 20,
        published: true,
        categoryId: '1',
        category: {
            id: '1.1',
            name: 'Men-Cloths',
            description: '',
            image: '',
            published: true,
        },
    },
    {
        id: '2',
        name: 'Mid Century Modern T-Shirt',
        picture: '',
        version: '1.0',
        description: 'nice good awesome',
        price: 110,
        quantity: 20,
        published: true,
        categoryId: '2',
        category: {
            id: '2.1',
            name: 'Men-Cloths',
            description: '',
            image: '',
            published: true,
        },
    },
    {
        id: '3',
        name: 'Mid Century Modern T-Shirt',
        picture: '',
        version: '1.0',
        description: 'nice good awesome',
        price: 110,
        quantity: 20,
        published: true,
        categoryId: '3',
        category: {
            id: '3.1',
            name: 'Men-Cloths',
            description: '',
            image: '',
            published: true,
        },
    },
    {
        id: '4',
        name: 'Mid Century Modern T-Shirt',
        picture: '',
        version: '1.0',
        description: 'nice good awesome',
        price: 110,
        quantity: 20,
        published: true,
        categoryId: '4',
        category: {
            id: '4.1',
            name: 'Men-Cloths',
            description: '',
            image: '',
            published: true,
        },
    },
];

const SaleOffer = () => {
    return (
        <div className="bg-white py-14">
            <div className="max-w-screen-xl mx-auto">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="font-semibold text-3xl mb-10 w-[25%]">
                        Hurry, dont miss out on this offers
                    </h1>

                    <button className="w-36 text-white bg-[#005D63] px-4 py-3 hover:text-[#005D63] hover:border hover:border-[#005D63] hover:bg-white transform transition-colors duration-300">
                        Browse All
                    </button>
                </div>

                <div className="w-1/2 h-[300px]">
                    <Image
                        src={saleDay}
                        alt="sale day"
                        width={500}
                        height={500}
                        className="w-full h-full"
                    />
                </div>

                <div className="flex flex-row items-center gap-10 overflow-y-auto scrollY">
                    {fakeData.map((product, idx) => (
                        <ItemCart key={idx} dataProduct={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SaleOffer;
