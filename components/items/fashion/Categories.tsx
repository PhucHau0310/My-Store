import ItemCart3 from '@/components/cards/ItemCart3';

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
];

const Categories = () => {
    return (
        <div className="bg-white mt-20 pb-28">
            <div className="max-w-screen-xl mx-auto">
                <div className="w-2/3 mx-auto flex flex-row items-center justify-between">
                    {[
                        'All Category',
                        'Men Product',
                        'Women Product',
                        'Accesories',
                    ].map((item, idx) => (
                        <button
                            className="border border-[#005D63] rounded-3xl px-4 py-3 text-[#131717] hover:bg-[#005D63] hover:text-white transform transition-colors duration-500"
                            key={idx}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <div className="flex flex-row justify-between mt-20">
                    {fakeData.map((product, idx) => (
                        <ItemCart3 key={idx} dataProduct={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;
