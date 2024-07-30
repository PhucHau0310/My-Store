import Image from 'next/image';
import { Product } from '@/interface';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import appleWatch from '../../public/img/apple-watch.png';

const ItemCart3 = ({ dataProduct }: { dataProduct: Product }) => {
    return (
        <div>
            <div>
                <Image
                    // src={dataProduct?.picture ?? ''}
                    src={appleWatch}
                    alt="image"
                    width={800}
                    height={800}
                    className="w-full h-full cursor-pointer"
                />
            </div>
            <div className="flex flex-row items-center justify-between my-3">
                <p className="text-[#566363] font-normal text-base">
                    {dataProduct?.category?.name}
                </p>
                <div>
                    <FavoriteBorderIcon />
                </div>
            </div>

            <h1 className="text-[#131717] font-semibold text-lg">
                {dataProduct?.name}
            </h1>
            <p className="text-[#131717] font-semibold text-base my-2">
                ${dataProduct?.price}
            </p>

            <div className="flex flex-row items-center justify-between">
                <div className="text-[#FFD44D] flex flex-row items-center gap-1">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <span className="text-[#566363]">(18 reviewers)</span>
                </div>
            </div>
        </div>
    );
};

export default ItemCart3;
