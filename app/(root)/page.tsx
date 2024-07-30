import Categories from '@/components/items/home/Categories';
import Feature from '@/components/items/home/Feature';
import ModernShoes from '@/components/items/home/ModernShoes';
import OurNewProducts from '@/components/items/home/OurNewProducts';
import PopularProducts from '@/components/items/home/PopularProducts';
import ReadBlog from '@/components/items/home/ReadBlog';
import SaleOffer from '@/components/items/home/SaleOffer';
import WhatshotIcon from '@mui/icons-material/Whatshot';

export default function Home() {
    return (
        <>
            <ModernShoes />
            <Categories />
            <PopularProducts />
            <OurNewProducts />

            <div className="bg-[#131717] flex flex-row items-center mt-10 mb-28 h-16 overflow-hidden gap-3 -rotate-3">
                {Array(5)
                    .fill(null)
                    .map((_, idx) => (
                        <p key={idx} className="text-white flex-shrink-0">
                            <WhatshotIcon sx={{ color: 'red' }} />
                            GET 50% OFF IN THE BELOW PRODUCT
                        </p>
                    ))}
            </div>

            <SaleOffer />
            <Feature />
            <ReadBlog />
        </>
    );
}
