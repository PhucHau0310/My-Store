'use client';

import AddDiscount from '@/components/form/AddDiscount';
import { Promotion } from '@prisma/client';
import React from 'react';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import useCategories from '@/hooks/useCategories';

const Discount = () => {
    const [openAddDiscount, setOpenAddDiscount] = React.useState(false);
    const [promotions, setPromotions] = React.useState<Promotion[]>([]);
    const { categories } = useCategories();

    React.useEffect(() => {
        const getPromotions = async () => {
            try {
                const res = await fetch(`/api/discount`);
                const data = await res.json();

                if (res.ok) {
                    setPromotions(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getPromotions();
    }, []);
    return (
        <div className="py-5 pb-28">
            <div className="flex flex-row justify-between items-center">
                <div>
                    <h1 className="text-[#010101] font-semibold text-2xl mb-2">
                        Discounts
                    </h1>
                    <p className="text-[#80888b] font-normal text-base">
                        Lets check your discount details
                    </p>
                </div>
                <button
                    onClick={() => setOpenAddDiscount(true)}
                    className="bg-white rounded-xl shadow-lg hover:drop-shadow-md transform transition-all duration-300 p-4 text-black font-semibold text-base"
                >
                    Add Discount
                </button>

                {openAddDiscount && (
                    <AddDiscount
                        openAddDiscount={openAddDiscount}
                        setOpenAddDiscount={setOpenAddDiscount}
                    />
                )}
            </div>
            {/* 
            {sureDelete && (
                <div className="fixed z-30 w-[400px] top-10 left-1/2 -translate-x-1/2 bg-white shadow-lg shadow-black p-4 rounded-lg">
                    <p className="font-semibold text-red-400 text-center">
                        Are you sure delete category have ID: {idToDelete} ?
                    </p>

                    <div className="flex flex-row items-center gap-8 text-white mt-5">
                        <button
                            onClick={() => {
                                setIdToDelete(null);
                                setSureDelete(false);
                            }}
                            className="w-1/2 bg-blue-400 p-1 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                handleDeleteConfirm();
                                setSureDelete(false);
                            }}
                            className="w-1/2 bg-red-600 p-1 rounded-lg"
                        >
                            Save
                        </button>
                    </div>
                </div>
            )} */}

            <div
                style={{ height: 450, width: '100%' }}
                className="rounded-2xl mt-7"
            >
                <div className="grid grid-cols-3 gap-7">
                    {promotions.map((item, idx) => (
                        <div
                            key={idx}
                            className="p-5 rounded-lg text-white"
                            style={{
                                backgroundColor: '#0093E9',
                                backgroundImage:
                                    ' linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            }}
                        >
                            <div className="flex flex-row items-center justify-between ">
                                <p className="font-medium text-2xl">
                                    GIFT CARD
                                </p>
                                <CardGiftcardIcon
                                    sx={{ width: '80px', height: '80px' }}
                                />
                            </div>
                            <p className="text-4xl font-semibold">
                                {item.discount}% OFF
                            </p>
                            <p className="mt-3 font-medium text-base">
                                {item.code}
                            </p>
                            {categories.map(
                                (cate, idx) =>
                                    cate.id === item.categoryId && (
                                        <p className="mt-2 text-base font-normal">
                                            {cate.name}
                                        </p>
                                    )
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Discount;
