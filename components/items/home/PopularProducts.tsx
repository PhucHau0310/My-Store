import { Product } from '@/interface';
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

const PopularProducts = () => {
    return (
        <div className="bg-white py-14">
            <div className="max-w-screen-xl mx-auto">
                <h1 className="font-semibold text-3xl mb-10">
                    Our Popular Products
                </h1>

                <div className="flex flex-row items-center justify-between">
                    <h2 className="text-[#566363] w-1/3">
                        Browse our most popular products and make your day more
                        beautiful and glorious.
                    </h2>

                    <button className="w-36 border border-[#005D63] text-[#005D63] px-4 py-3 hover:text-white hover:bg-[#005D63] transform transition-colors duration-300">
                        Browse All
                    </button>
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

export default PopularProducts;
