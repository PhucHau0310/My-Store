'use client';

import { Review } from '@/interface';
import { useUser } from '@clerk/nextjs';
import StarIcon from '@mui/icons-material/Star';
import Image from 'next/image';

const ItemTestimonial = ({ dataReview }: { dataReview: Review | null }) => {
    const user = useUser();
    return (
        <div className="shadow-xl px-4 py-10 w-full">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-3">
                    <div className="w-10 h-10">
                        <Image
                            src={user.user?.imageUrl ?? ''}
                            alt="image"
                            width={60}
                            height={60}
                            className="w-full h-full rounded-full"
                        />
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-[#131717] font-medium text-base">
                            {dataReview?.user.username ?? 'Nguyen Phuc Hau'}
                        </h1>
                        <p className="text-[#889595] font-normal text-sm">
                            {dataReview?.createdAt ?? 'June 12, 2022'}
                        </p>
                    </div>
                </div>

                <div className="w-32">
                    {Array(5)
                        .fill(null)
                        .map((_, idx) => (
                            <StarIcon sx={{ color: 'yellow' }} />
                        ))}
                </div>
            </div>
            <p className="text-[#000000] text-base mt-6">
                I will say this will be a game-changer for designers. They have
                a very interesting idea of sorting resources (templates and
                blocks) with a huge collection of resources. This will make the
                design work faster.
            </p>
        </div>
    );
};

export default ItemTestimonial;
