'use client';

import SearchIcon from '@mui/icons-material/Search';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { ListNavigate } from '@/constants';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import useClickOutside from '@/hooks/useCickOutside';
import { useRouter } from 'next/navigation';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 8,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const Navbar = () => {
    const [valueSearch, setValueSearch] = React.useState<string | null>(null);
    const [idTitleClick, setIdTitleClick] = React.useState(-1);
    const { ref, isVisible, setIsVisible } = useClickOutside(false);

    const router = useRouter();

    return (
        <div className="bg-[#005D63] pb-5 sticky top-0 z-10">
            <div className="max-w-screen-xl py-3 mx-auto flex flex-row items-center justify-between">
                <h1 className="text-white w-44 font-semibold text-2xl cursor-pointer hover:scale-105 transition-all">
                    My<span className="text-red-300">Store</span>
                </h1>

                <div className="w-[60%] flex flex-row items-center">
                    <input
                        value={valueSearch ?? ''}
                        onChange={(e) => setValueSearch(e.target.value)}
                        type="text"
                        placeholder="Search for anything"
                        className="w-full pl-2 py-2 outline-none placeholder:text-white text-white bg-transparent border border-white"
                    />
                    <button className="text-[#005D63] bg-[#FFD44D] p-2">
                        <SearchIcon sx={{ width: '25px', height: '25px' }} />
                    </button>
                </div>

                <div className="flex flex-row items-center gap-8">
                    <div
                        onClick={() => setIsVisible(true)}
                        className="text-white cursor-pointer relative"
                    >
                        <SignedOut>
                            <AccountCircleOutlinedIcon
                                sx={{ width: '30px', height: '30px' }}
                            />
                        </SignedOut>

                        <SignedIn>
                            <UserButton />
                        </SignedIn>

                        {isVisible && (
                            <div
                                ref={ref}
                                className="absolute top-10 bg-[#005D63] w-40 border border-white p-2"
                            >
                                <button
                                    onClick={() => router.push('/sign-in')}
                                    className="hover:bg-slate-500 w-full p-2 border-b border-b-white"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => router.push('/sign-up')}
                                    className="hover:bg-slate-500 w-full p-2"
                                >
                                    Sign up
                                </button>
                            </div>
                        )}
                    </div>
                    <div>
                        <IconButton aria-label="cart">
                            <StyledBadge badgeContent={4} color="secondary">
                                <FavoriteBorderOutlinedIcon
                                    sx={{
                                        color: 'white',
                                        width: '25px',
                                        height: '25px',
                                    }}
                                />
                            </StyledBadge>
                        </IconButton>
                    </div>
                    <div>
                        <IconButton aria-label="cart">
                            <StyledBadge badgeContent={4} color="secondary">
                                <ShoppingBagOutlinedIcon
                                    sx={{
                                        color: 'white',
                                        width: '25px',
                                        height: '25px',
                                    }}
                                />
                            </StyledBadge>
                        </IconButton>
                    </div>
                </div>
            </div>

            <div className="w-[60%] mt-2 mx-auto text-white">
                <ul className="flex flex-row items-center justify-between">
                    {ListNavigate.map((item) => (
                        <li
                            key={item.id}
                            onMouseEnter={() => setIdTitleClick(item.id)}
                            onMouseLeave={() => setIdTitleClick(-1)}
                            className="hover:underline group relative flex flex-row items-center p-1 cursor-pointer"
                        >
                            {item.title}
                            {item.nestedTitle && (
                                <div className="text-white">
                                    <KeyboardArrowDownOutlinedIcon />
                                </div>
                            )}

                            {idTitleClick === item.id && item.nestedTitle && (
                                <div className="absolute top-5 left-1/2 -translate-x-1/2 pt-8 w-48">
                                    <ul className="bg-[#005D63] shadow-lg">
                                        {item.nestedTitle.map((itemNested) => (
                                            <li
                                                key={itemNested.id}
                                                className="border-y border-y-[#1E787D] px-5 py-3 hover:text-[#FFD44D] transition-all duration-300 ease-in-out transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                                            >
                                                {itemNested.title}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
