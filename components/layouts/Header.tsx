'use client';

import Image from 'next/image';
import flagVN from '../../public/svg/flag-vietnam.svg';
import NotificationsIcon from '@mui/icons-material/Notifications';
import * as React from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { useUser } from '@clerk/nextjs';

const Header = () => {
    const hours = new Date().getHours();
    const { user } = useUser();

    const divideDate = (hours: number) => {
        let string = '';

        for (let i = 1; i < 24; i++) {
            if (hours >= 12 && hours < 18) {
                string = 'Afternoon';
            } else if (hours >= 18) {
                string = 'Evening';
            } else {
                string = 'Morning';
            }
        }

        return string;
    };

    return (
        <div className="fixed w-[82%] top-0 right-0 z-20 bg-[#f8f8f8] flex flex-row items-center justify-between pt-4 pb-6 px-8 border-b border-b-[#f1f1f1]">
            <div>
                <h1 className="text-[#010101] font-semibold text-lg">
                    Good {divideDate(hours)}, John
                </h1>

                <p className="text-[#80888b] font-normal text-base">
                    Today, let's catch up on what's unfolding in your store
                </p>
            </div>

            <div className="flex flex-row items-center gap-10">
                <div className="flex flex-row items-center gap-2">
                    <Image
                        src={flagVN}
                        alt="flag-vietnam"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <p
                        className="text-[#010101] font-semibold
                    "
                    >
                        Viet Nam <span>(VN)</span>
                    </p>
                </div>

                <div className="flex flex-row items-center gap-8">
                    <Badge
                        badgeContent={4}
                        color="primary"
                        sx={{
                            border: '1px solid #f1f1f1',
                            padding: '4px',
                            borderRadius: '99px',
                        }}
                    >
                        <NotificationsIcon color="action" />
                    </Badge>

                    <Image
                        src={user?.imageUrl ?? ''}
                        alt="avatar-user"
                        width={40}
                        height={40}
                        className="rounded-full shadow-xl"
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;
