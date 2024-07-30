import Image from 'next/image';
import { Product } from '@/interface';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import appleWatch from '../../public/img/apple-watch.png';

const ItemCart2 = ({ dataProduct }: { dataProduct: Product }) => {
    return (
        <div className="w-[85%] bg-[#FFFFFF] drop-shadow-xl rounded-xl p-5">
            <div>
                <Image
                    // src={dataProduct?.picture ?? ''}
                    src={appleWatch}
                    alt="image"
                    width={800}
                    height={800}
                    className="w-full h-full rounded-xl hover:scale-105 transform transition-transform duration-300 cursor-pointer"
                />
            </div>

            <div className="flex flex-row items-center justify-between my-3">
                <h1 className="text-[#131717] font-semibold text-lg">
                    {dataProduct?.name}
                </h1>
                <div>
                    <FavoriteBorderIcon />
                </div>
            </div>

            <div className="flex flex-row items-center justify-between">
                <div className="text-[#FFD44D] flex flex-row items-center gap-1">
                    <StarIcon />
                    <span className="text-[#566363]">5.0</span>
                    <span className="text-[#566363]">(18)</span>
                </div>

                <p className="text-[#131717] font-semibold text-lg">
                    ${dataProduct?.price}
                </p>
            </div>
        </div>
    );
};

export default ItemCart2;
