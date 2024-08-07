'use client';

import Image from 'next/image';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import AddBlog from '@/components/form/AddBlog';
import { CircularProgress } from '@mui/material';
import { Post } from '@/interface';

const Blog = () => {
    const [openAddBlog, setOpenAddBlog] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);
    const [blogs, setBlogs] = React.useState<Post[]>([]);

    React.useEffect(() => {
        const getBlogs = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/blog`);
                const data = await res.json();

                if (res.ok) {
                    setBlogs(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getBlogs();
    }, []);

    return (
        <div className="bg-white pb-18">
            {openAddBlog && (
                <AddBlog
                    openAddBlog={openAddBlog}
                    setOpenAddBlog={setOpenAddBlog}
                />
            )}

            <div className="bg-[#F1DEB4] py-28">
                <h1 className="font-semibold text-6xl mb-6 text-center">
                    Read our latest blog
                </h1>
                <p className="font-normal text-base text-center w-1/3 mx-auto">
                    We provide actionable insights to help you stay on the
                    cutting edge of ecommerce. Join our thought leadership
                    community to get ecommerce tips right to your inbox
                </p>
            </div>

            <div className="max-w-screen-xl mx-auto pt-1 pb-20">
                <div className="w-full mt-20">
                    <h2 className="text-[#131717] font-semibold text-3xl mb-10">
                        Latest from the anyone
                    </h2>

                    <div className="grid grid-cols-3 gap-3 w-full">
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            blogs.map((blog, idx) => (
                                <div key={idx} className="w-[80%] mb-10">
                                    <div className="w-full h-[200px]">
                                        <Image
                                            src={blog.picture ?? ''}
                                            alt="image"
                                            width={500}
                                            height={500}
                                            className="w-full h-full"
                                        />
                                    </div>

                                    <h3 className="text-base mt-4 font-semibold text-[#131717]">
                                        {blog.title}
                                    </h3>
                                    <h3 className="text-base mt-4 font-normal text-[#131717]">
                                        {blog.content}
                                    </h3>
                                    <p className="text-[#566363] mt-2 text-sm font-normal">
                                        {blog.createdAt.toString().slice(0, 10)}{' '}
                                        | {blog.author.username}
                                    </p>

                                    <p className="hover:underline mt-3 font-semibold text-base cursor-pointer text-green-700">
                                        Read More
                                    </p>
                                </div>
                            ))
                        )}
                    </div>

                    <button className="flex mx-auto mt-14 bg-[#005D63] py-4 px-6 hover:opacity-95 text-white">
                        Load More
                    </button>
                </div>
            </div>

            <button
                onClick={() => setOpenAddBlog(true)}
                className="fixed bottom-5 right-5 bg-[#005D63] text-white rounded-full p-4 hover:scale-105 transform transition-transform duration-300"
            >
                <AddIcon />
            </button>
        </div>
    );
};

export default Blog;
