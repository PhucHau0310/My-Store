import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';
import Link from 'next/link';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="">
            <Navbar />
            <div className="">{children}</div>
            <Footer />
            <Link
                href={'/dashboard'}
                className="fixed top-16 right-32 z-30 text-white bg-green-400 p-2 rounded-lg"
            >
                Dashboard
            </Link>
        </div>
    );
};

export default RootLayout;
