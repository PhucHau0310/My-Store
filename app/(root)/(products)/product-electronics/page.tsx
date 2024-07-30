import ItemCart2 from '@/components/cards/ItemCart2';
import TuneIcon from '@mui/icons-material/Tune';

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
    {
        id: '5',
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
    {
        id: '6',
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

const ProductElectronics = () => {
    return (
        <div className="bg-white mt-20 pt-2 pb-28">
            <div className="max-w-screen-xl mx-auto">
                <h1 className="font-semibold text-3xl mb-10">
                    Find something you love
                </h1>
                <div className="flex flex-row items-start justify-between w-full">
                    <div className="flex flex-row items-start gap-4">
                        <button className="text-[#566363] bg-[#F7F7F7] p-3 w-36 rounded-lg hover:text-white hover:bg-[#005D63] transform transition-colors duration-300">
                            Latest
                        </button>
                        <button className="text-[#566363] bg-[#F7F7F7] p-3 w-36 rounded-lg hover:text-white hover:bg-[#005D63] transform transition-colors duration-300">
                            Top Selling
                        </button>
                    </div>
                    <button className="w-36 h-12 text-[#566363] bg-[#F7F7F7]  rounded-lg hover:text-white hover:bg-[#005D63] transform transition-colors duration-300">
                        <TuneIcon /> All Filters
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-10 mt-8">
                    {fakeData.map((product, idx) => (
                        <ItemCart2 key={idx} dataProduct={product} />
                    ))}
                </div>

                <button className="bg-[#005D63] text-white mt-14 py-4 px-6 hover:opacity-95 rounded-lg mx-auto flex">
                    Load More
                </button>
            </div>
        </div>
    );
};

export default ProductElectronics;
