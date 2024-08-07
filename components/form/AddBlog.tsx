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
import { CircularProgress } from '@mui/material';
import { useAuth } from '@clerk/nextjs';

const AddBlog = ({
    openAddBlog,
    setOpenAddBlog,
}: {
    openAddBlog: boolean;
    setOpenAddBlog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [title, setTitle] = React.useState<string | null>(null);
    const [content, setContent] = React.useState<string | null>(null);
    const [renderImg, setRenderImg] = React.useState<string | null>(null);
    const [file, setFile] = React.useState<File | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [isLoading, setLoading] = React.useState(false);

    const dispatch = useDispatch();
    const { userId } = useAuth();

    const handleUploadFile = (e: any) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setRenderImg(URL.createObjectURL(selectedFile));
    };

    const handleSubmit = async () => {
        if (!file || !title || !content || !userId) {
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
            // Upload file to Firebase Storage
            const imgRef = ref(imageDb, `files/${v4()}`);
            const snapshot = await uploadBytes(imgRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            const dataPayload = {
                title: title,
                content: content,
                picture: downloadURL,
                authorId: userId,
            };

            const res = await fetch(`/api/blog/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataPayload),
            });

            if (res.ok) {
                setTitle(null);
                setContent(null);
                setFile(null);
                setRenderImg(null);
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
                    message: 'Failed to create blog',
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
                            Add Blog
                        </h1>
                        <p className="text-[#80888b] font-normal text-base">
                            Add your blog and necessary information from here
                        </p>
                    </div>
                    <button
                        onClick={() => setOpenAddBlog(false)}
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
                    <div className="px-10 bg-[#f8f8f8] py-4 w-[30%]">
                        <p className="text-lg font-medium">Thumbnail</p>

                        <label
                            htmlFor="fileImg"
                            className="flex flex-col h-60 cursor-pointer text-blue-500 border border-[#80888b] mt-4 rounded-lg px-4 py-8"
                        >
                            <div className="text-center mb-4 ">
                                <AddAPhotoIcon />
                            </div>

                            {renderImg ? (
                                <div className="h-[82%] w-2/3 mx-auto border border-[#80888b] rounded-lg">
                                    <Image
                                        src={renderImg}
                                        alt="image"
                                        width={80}
                                        height={80}
                                        className="w-full h-full rounded-lg"
                                    />
                                </div>
                            ) : (
                                <>
                                    <p className="font-normal text-center text-base mb-2">
                                        Add another photo
                                    </p>
                                    <p className="font-normal text-center text-base">
                                        (Only *jpeg, *webp and *.png images will
                                        be accepted)
                                    </p>
                                </>
                            )}
                        </label>

                        <input
                            id="fileImg"
                            type="file"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleUploadFile}
                        />
                    </div>

                    <div className="px-10 py-4 w-[70%]">
                        <div className="flex flex-col gap-3">
                            <label
                                htmlFor="name"
                                className="text-lg font-medium"
                            >
                                Title
                            </label>
                            <input
                                value={title ?? ''}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                id="name"
                                placeholder="Category Title/Name..."
                                className="bg-white border border-[#80888b] w-[80%] rounded-lg outline-blue-500 p-4"
                            />
                        </div>
                        <div className="flex flex-col gap-3 mt-10">
                            <label
                                htmlFor="desc"
                                className="text-lg font-medium"
                            >
                                Content
                            </label>
                            <textarea
                                value={content ?? ''}
                                onChange={(e) => setContent(e.target.value)}
                                id="desc"
                                placeholder="Category Description..."
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
                        <p>POST BLOG</p>
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddBlog;
