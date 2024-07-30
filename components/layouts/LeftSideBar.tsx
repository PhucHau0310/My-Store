'use client';

import { ListNavigateDashboard } from '@/constants';
import { usePathname, useRouter } from 'next/navigation';

const LeftSideBar = () => {
    const router = useRouter();
    const slug = usePathname().split('/')[2];
    return (
        <div className="fixed w-[18%] bg-[#d8e2eb] h-screen">
            <div className="w-[80%] mx-auto">
                <h1
                    onClick={() => router.push('/')}
                    className="w-full text-center pt-4 pb-8 text-white font-semibold text-3xl cursor-pointer hover:scale-105 transition-all"
                >
                    My<span className="text-red-300">Store</span>
                </h1>

                <div>
                    {ListNavigateDashboard.map((item, idx) => (
                        <div key={idx}>
                            <h2 className="text-[#89949e] ml-4 font-normal text-sm mb-3">
                                {item.title}
                            </h2>

                            <div>
                                {item.nestedList.map((itemNested, idx) => (
                                    <div
                                        onClick={() => {
                                            if (
                                                itemNested.title === 'Overview'
                                            ) {
                                                router.push('/dashboard');
                                            } else {
                                                router.push(
                                                    `/dashboard/${itemNested.title.toLocaleLowerCase()}`
                                                );
                                            }
                                        }}
                                        key={idx}
                                        className={`${
                                            slug ===
                                                itemNested.title?.toLocaleLowerCase() &&
                                            'bg-white'
                                        } flex flex-row items-center gap-3 hover:bg-white p-3 ml-4 mb-2 rounded-xl cursor-pointer transform transition-all duration-300`}
                                    >
                                        <itemNested.icon />{' '}
                                        <span>{itemNested.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeftSideBar;
