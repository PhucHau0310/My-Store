import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="">
            <Navbar />
            <div className="">{children}</div>
            <Footer />
        </div>
    );
};

export default RootLayout;
