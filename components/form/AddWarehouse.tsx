'use client';

import { resStatus } from '@/lib/redux/slices/statusSlice';
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

const AddWarehouse = ({
    openAddWarehouse,
    setOpenAddWarehouse,
}: {
    openAddWarehouse: boolean;
    setOpenAddWarehouse: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [name, setName] = React.useState<string | null>(null);
    const [location, setLocation] = React.useState<string | null>(null);
    const [isLoading, setLoading] = React.useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        if (!name || !location) {
            dispatch(
                resStatus({
                    status: 500,
                    message: 'Please filled all information below',
                })
            );

            return;
        }
        setLoading(true);
        try {
            const data = {
                name: name,
                location: location,
            };

            const res = await fetch(`/api/warehouse/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const resData = await res.json();

            if (res.ok) {
                setName(null);
                setLocation(null);
            }

            dispatch(
                resStatus({ status: res.status, message: resData.message })
            );
        } catch (error) {
            console.log(error);
            dispatch(
                resStatus({
                    status: 500,
                    message: 'Failed to post new warehouse',
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
                            Add Warehouse
                        </h1>
                        <p className="text-[#80888b] font-normal text-base">
                            Add your warehouse and necessary information from
                            here
                        </p>
                    </div>
                    <button
                        onClick={() => setOpenAddWarehouse(false)}
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
                        <div className="flex flex-col gap-3">
                            <label
                                htmlFor="name"
                                className="text-lg font-medium"
                            >
                                Warehouse Title / Name
                            </label>
                            <input
                                value={name ?? ''}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                id="name"
                                placeholder="Category Title/Name..."
                                className="bg-white border border-[#80888b] w-[80%] rounded-lg outline-blue-500 p-4"
                            />
                        </div>
                        <div className="flex flex-col gap-3 mt-10">
                            <label
                                htmlFor="location"
                                className="text-lg font-medium"
                            >
                                Warehouse location
                            </label>
                            <input
                                value={location ?? ''}
                                onChange={(e) => setLocation(e.target.value)}
                                type="text"
                                id="location"
                                placeholder="Category Title/Name..."
                                className="bg-white border border-[#80888b] w-[80%] rounded-lg outline-blue-500 p-4"
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
                        <p>Add Warehouse</p>
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddWarehouse;
