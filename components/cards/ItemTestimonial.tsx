import { Review } from '@/interface';
import StarIcon from '@mui/icons-material/Star';
import { Rating } from '@mui/material';
import Image from 'next/image';

const ItemTestimonial = ({ dataReview }: { dataReview: Review | null }) => {
    const convertTimeUs = (dateString: string) => {
        const date = new Date(dateString);

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        };

        const formattedDate = date.toLocaleString('en-US', options);

        return formattedDate;
    };

    return (
        <div className="shadow-xl px-4 py-10 w-full">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-3">
                    <div className="w-10 h-10">
                        <Image
                            src={dataReview?.user.picture ?? ''}
                            alt="image"
                            width={60}
                            height={60}
                            className="w-full h-full rounded-full"
                        />
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-[#131717] font-medium text-base">
                            {dataReview?.user.username}
                        </h1>
                        <p className="text-[#889595] font-normal text-sm">
                            {convertTimeUs(dataReview?.reviewDate ?? '')}
                        </p>
                    </div>
                </div>

                <div className="w-32">
                    <Rating
                        name="read-only"
                        value={dataReview?.rating || 0}
                        readOnly
                        precision={0.5}
                        sx={{
                            color: '#FFD44D',
                        }}
                    />
                </div>
            </div>
            <p className="text-[#000000] text-base mt-6">
                {dataReview?.comment}
            </p>
        </div>
    );
};

export default ItemTestimonial;
