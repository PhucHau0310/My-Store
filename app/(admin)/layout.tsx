'use client';

import AlertNotification from '@/components/layouts/AlertNotification';
import Header from '@/components/layouts/Header';
import LeftSideBar from '@/components/layouts/LeftSideBar';
import NextTopLoader from 'nextjs-toploader';
import React from 'react';
import { useSelector } from 'react-redux';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { status, message } = useSelector(
        (state: {
            status: { status: number | null; message: string | null };
        }) => state.status
    );

    return (
        <div className="w-full flex flex-row">
            <div className="z-50">
                <NextTopLoader />
            </div>
            {status && <AlertNotification status={status} message={message} />}
            <LeftSideBar />
            <Header />
            <main className="w-[82%] ml-auto mt-[92px] bg-[#f8f8f8] px-8">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
