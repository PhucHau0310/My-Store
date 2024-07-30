'use client';

import { usePathname } from 'next/navigation';

const Page = () => {
    const blogId = usePathname().split('/')[2];
    return (
        <div className="bg-white mt-20 pb-28">
            <div className="max-w-screen-xl mx-auto h-[400px]">
                <h1 className="font-semibold text-4xl mb-6 ">
                    Blog Detail {blogId}
                </h1>
            </div>
        </div>
    );
};

export default Page;
