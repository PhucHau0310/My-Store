'use client';

import CloseIcon from '@mui/icons-material/Close';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import React from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { imageDb } from '@/lib/firebase';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { resStatus } from '@/lib/redux/slices/statusSlice';
import useCategories from '@/hooks/useCategories';
import { CircularProgress } from '@mui/material';

const AddDiscount = ({
    openAddDiscount,
    setOpenAddDiscount,
}: {
    openAddDiscount: boolean;
    setOpenAddDiscount: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const dispatch = useDispatch();
    const { categories } = useCategories();

    const [categoryID, setCategoryID] = React.useState<string>();
    const [code, setCode] = React.useState<string | null>(null);
    const [desc, setDesc] = React.useState<string | null>(null);
    const [discount, setDiscount] = React.useState<number | null>(null);
    const [startDate, setStartDate] = React.useState<string | null>(null);
    const [endDate, setEndDate] = React.useState<string | null>(null);
    const [isLoading, setLoading] = React.useState(false);

    const handleSubmit = async () => {
        if (!code || !discount || !categoryID || !startDate || !endDate) {
            dispatch(
                resStatus({
                    status: 500,
                    message: 'Please filled all information below, hihi',
                })
            );
            return;
        }

        setLoading(true);

        try {
            const dataPayload = {
                code: code,
                description: desc,
                categoryId: categoryID,
                discount: discount,
                startDate: new Date(startDate).toISOString(),
                endDate: new Date(endDate).toISOString(),
            };

            const res = await fetch(`/api/discount/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataPayload),
            });

            if (res.ok) {
                setCode(null);
                setDesc(null);
                setDiscount(null);
                setStartDate(null);
                setEndDate(null);
            }

            const { message } = await res.json();

            dispatch(
                resStatus({
                    status: res.status,
                    message: message,
                })
            );
        } catch (error) {
            console.log(error);
            dispatch(
                resStatus({
                    status: 500,
                    message: 'Failed to create discount',
                })
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="fixed z-40 left-0 right-0 bottom-0 top-0 bg-black bg-opacity-60">
            <div className="w-[82%] ml-auto h-full  bg-[#f8f8f8] pb-16 overflow-y-scroll">
                <div className="sticky top-0 bg-white flex flex-row justify-between items-center px-10 pt-3 pb-4">
                    <div>
                        <h1 className="text-[#010101] font-semibold text-2xl mb-2">
                            Add Discount
                        </h1>
                        <p className="text-[#80888b] font-normal text-base">
                            Add your discount and necessary information from
                            here
                        </p>
                    </div>
                    <button
                        onClick={() => setOpenAddDiscount(false)}
                        className="text-slate-500 shadow-lg bg-gray-100 p-3 hover:opacity-95 rounded-full"
                    >
                        <CloseIcon />
                    </button>
                </div>

                <div className="text-xl font-semibold  border-b-2 border-b-white">
                    <h2 className="w-[15%] py-4 px-10 border-b-4 border-b-blue-400">
                        Basic Info
                    </h2>
                </div>

                <div className="flex flex-row gap-3 mt-4">
                    <div className="px-10 py-4 w-[70%]">
                        <div className="flex flex-row items-center">
                            <div className="flex flex-col gap-3 w-1/2">
                                <label
                                    htmlFor="code"
                                    className="text-lg font-medium"
                                >
                                    Code
                                </label>
                                <input
                                    value={code ?? ''}
                                    onChange={(e) => setCode(e.target.value)}
                                    type="text"
                                    id="code"
                                    placeholder="Code..."
                                    className="bg-white border border-[#80888b] w-[80%] rounded-lg outline-blue-500 p-4"
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-1/2">
                                <label
                                    htmlFor="discount"
                                    className="text-lg font-medium"
                                >
                                    Discount
                                </label>
                                <input
                                    value={discount ?? ''}
                                    onChange={(e) =>
                                        setDiscount(Number(e.target.value))
                                    }
                                    type="text"
                                    id="discount"
                                    placeholder="Discount..."
                                    className="bg-white border border-[#80888b] w-ful rounded-lg outline-blue-400 p-4"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 mt-6 w-[40%]">
                            <label
                                htmlFor="category"
                                className="text-lg font-medium"
                            >
                                Category
                            </label>
                            <select
                                value={categoryID ?? ''}
                                onChange={(e) => setCategoryID(e.target.value)}
                                id="category"
                                name="category"
                                className="bg-white border border-[#80888b] rounded-lg outline-blue-400 p-4 "
                            >
                                {categories.map((cate, idx) => (
                                    <option value={cate.id} key={idx}>
                                        {cate.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-row items-center mt-6">
                            <div className="flex flex-col gap-3 w-1/2">
                                <label
                                    htmlFor="startDate"
                                    className="text-lg font-medium"
                                >
                                    Start Date
                                </label>
                                <input
                                    value={startDate ?? ''}
                                    onChange={(e) =>
                                        setStartDate(e.target.value)
                                    }
                                    type="date"
                                    id="startDate"
                                    className="bg-white border border-[#80888b] w-[80%] rounded-lg outline-blue-500 p-4"
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-1/2">
                                <label
                                    htmlFor="endDate"
                                    className="text-lg font-medium"
                                >
                                    End Date
                                </label>
                                <input
                                    value={endDate ?? ''}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    type="date"
                                    id="endDate"
                                    className="bg-white border border-[#80888b] w-ful rounded-lg outline-blue-400 p-4"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 mt-10">
                            <label
                                htmlFor="desc"
                                className="text-lg font-medium"
                            >
                                Description
                            </label>
                            <textarea
                                value={desc ?? ''}
                                onChange={(e) => setDesc(e.target.value)}
                                id="desc"
                                placeholder="Product Description..."
                                className="bg-white h-[120px] border border-[#80888b] w-[80%] rounded-lg outline-blue-400 p-4"
                            />
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    className="fixed bottom-8 right-7 text-white bg-blue-500 rounded-lg p-3 shadow-lg hover:scale-105 transform transition-transform duration-300"
                >
                    {isLoading ? (
                        <CircularProgress sx={{ color: 'white' }} />
                    ) : (
                        <p>Add Discount</p>
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddDiscount;
