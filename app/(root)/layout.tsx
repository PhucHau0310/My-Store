'use client';

import AlertNotification from '@/components/layouts/AlertNotification';
import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';
import useOneUser from '@/hooks/useOneUser';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    const { userId } = useAuth();
    const { user } = useOneUser(userId);

    const { status, message } = useSelector(
        (state: {
            status: { status: number | null; message: string | null };
        }) => state.status
    );
    return (
        <div className="">
            {status && <AlertNotification status={status} message={message} />}
            <Navbar />
            <div className="">{children}</div>
            <Footer />
            {userId && user?.role === 'ADMIN' && (
                <Link
                    href={'/dashboard'}
                    className="fixed top-16 right-32 z-30 text-white bg-green-400 p-2 rounded-lg"
                >
                    Dashboard
                </Link>
            )}
        </div>
    );
};

export default RootLayout;
