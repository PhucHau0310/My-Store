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
import Cart from '../form/Cart';
import { useSelector } from 'react-redux';
import { Product } from '@prisma/client';
import Link from 'next/link';
import useProducts from '@/hooks/useProducts';
import Image from 'next/image';
import { Rating } from '@mui/material';

interface ProductExtends extends Product {
    quantityBuy: number;
}

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
    const [clickCart, setClickCart] = React.useState(false);
    const [showNavbar, setShowNavbar] = React.useState(true);
    const [lastScrollY, setLastScrollY] = React.useState(0);
    const { products } = useProducts();

    const router = useRouter();

    const filteredProducts = React.useMemo(() => {
        if (!valueSearch) return products;
        return products.filter(
            (product) =>
                product?.name
                    ?.toLowerCase()
                    .includes(valueSearch.toLowerCase()) ||
                product?.description
                    ?.toLowerCase()
                    .includes(valueSearch.toLowerCase()) ||
                product.category.name
                    .toLowerCase()
                    .includes(valueSearch.toLowerCase())
        );
    }, [products, valueSearch]);

    const controlNavbar = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY) {
                setShowNavbar(false);
            } else {
                // scroll up
                setShowNavbar(true);
            }
            setLastScrollY(window.scrollY);
        }
    };

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            // Cleanup function
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY]);

    const handleString = (link: string) => {
        return link.toLocaleLowerCase().split(' ').join('-');
    };

    const wishlistItems = useSelector(
        (state: { wishlist: { items: Product[] } }) => state.wishlist.items
    );

    const cartItems = useSelector(
        (state: { cart: { items: ProductExtends[] } }) => state.cart.items
    );

    return (
        <div
            className={`bg-[#005D63] pb-3 sticky top-0 z-20 ${
                showNavbar ? 'navbar--visible' : 'navbar--hidden'
            } transform transition-transform duration-500`}
        >
            {clickCart && <Cart setClickCart={setClickCart} />}

            {valueSearch && (
                <div className="z-30 h-[400px] overflow-y-scroll shadow-lg absolute top-14 bg-white left-0 right-0 w-[768px] mx-auto">
                    {filteredProducts.map((item) => {
                        const avgRating =
                            item.Review.reduce(
                                (total, curr) => total + curr.rating,
                                0
                            ) / item.Review.length;
                        return (
                            <div className="flex flex-row items-center justify-between  px-4 py-5 border-b border-b-slate-400 cursor-pointer">
                                <div className="flex flex-row items-center gap-8">
                                    <div className="w-16 h-16">
                                        <Image
                                            src={item.picture}
                                            alt="product"
                                            width={200}
                                            height={200}
                                            className="w-full h-full rounded-full"
                                        />
                                    </div>

                                    <div>
                                        <h1 className="text-lg font-semibold">
                                            {item.name}
                                        </h1>
                                        <h2 className="text-slate-500 text-base font-normal">
                                            {item.category.name}
                                        </h2>
                                        <p className="text-slate-500 text-base font-medium">
                                            ${item.price}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center">
                                    <Rating
                                        name="read-only"
                                        value={avgRating}
                                        readOnly
                                    />
                                    ({item.Review.length} Reviewers)
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="max-w-screen-xl py-3 mx-auto flex flex-row items-center justify-between">
                <Link href={'/'}>
                    <h1
                        // onClick={() => router.push('/')}
                        className="text-white w-44 font-semibold text-2xl cursor-pointer hover:scale-105 transition-all"
                    >
                        My<span className="text-red-300">Store</span>
                    </h1>
                </Link>

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
                    <div className="text-white cursor-pointer relative">
                        <SignedOut>
                            <AccountCircleOutlinedIcon
                                onClick={() => setIsVisible(true)}
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
                                <Link href={'/sign-in'}>
                                    <button
                                        // onClick={() => router.push('/sign-in')}
                                        className="hover:bg-slate-500 w-full p-2 border-b border-b-white"
                                    >
                                        Sign In
                                    </button>
                                </Link>
                                <Link href={'/sign-up'}>
                                    <button
                                        // onClick={() => router.push('/sign-up')}
                                        className="hover:bg-slate-500 w-full p-2"
                                    >
                                        Sign up
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>

                    <div
                        className=""
                        //  onClick={() => router.push('/wishlist')}
                    >
                        <Link href={'/wishlist'}>
                            <IconButton aria-label="cart">
                                <StyledBadge
                                    badgeContent={wishlistItems.length}
                                    color="secondary"
                                >
                                    <FavoriteBorderOutlinedIcon
                                        sx={{
                                            color: 'white',
                                            width: '25px',
                                            height: '25px',
                                        }}
                                    />
                                </StyledBadge>
                            </IconButton>
                        </Link>
                    </div>

                    <div onClick={() => setClickCart(true)}>
                        <IconButton aria-label="cart">
                            <StyledBadge
                                badgeContent={cartItems.length}
                                color="secondary"
                            >
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

            <div className="w-[60%] mt-0.5 mx-auto text-white">
                <ul className="flex flex-row items-center justify-between">
                    {ListNavigate.map((item) => (
                        <li
                            onClick={() => {
                                if (!item.nestedTitle) {
                                    router.push(
                                        `/${item.title.toLocaleLowerCase()}`
                                    );
                                }

                                if (item.title === 'Home') {
                                    router.push('/');
                                }
                            }}
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
                                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 pt-8 w-48">
                                    <ul className="bg-[#005D63] shadow-lg">
                                        {item.nestedTitle.map(
                                            (itemNested: any) => (
                                                <li
                                                    // onClick={() =>
                                                    //     router.push(
                                                    //         handleString(
                                                    //             itemNested.title
                                                    //         )
                                                    //     )
                                                    // }
                                                    key={itemNested.id}
                                                    className="border-y border-y-[#1E787D] px-5 py-3 hover:text-[#FFD44D] transition-all duration-300 ease-in-out transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                                                >
                                                    <Link
                                                        href={handleString(
                                                            itemNested.title
                                                        )}
                                                    >
                                                        {itemNested.title}
                                                    </Link>
                                                </li>
                                            )
                                        )}
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
