'use client';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '@/interface';
import { removeFromWishlist } from '@/lib/redux/slices/wishlistSlice';
import { addToCart } from '@/lib/redux/slices/cartSlice';
import { resStatus } from '@/lib/redux/slices/statusSlice';

const WishList = () => {
    const dispatch = useDispatch();
    const { items } = useSelector(
        (state: { wishlist: { items: Product[] } }) => state.wishlist
    );

    const handleRemoveWishlist = (id: string) => {
        dispatch(removeFromWishlist(id));
    };

    const handleAddToCart = (data: Product) => {
        dispatch(addToCart({ ...data, quantityBuy: 1 }));
        dispatch(removeFromWishlist(data.id));

        dispatch(resStatus({ status: 200, message: 'Add To Cart Success' }));
    };
    return (
        <div className="bg-white mt-20 pb-28">
            <div className="max-w-screen-lg mx-auto">
                <h1 className="font-semibold text-4xl mb-6 text-center">
                    Wish List
                </h1>
                <p className="text-[#566363] font-normal text-base text-center mb-12">
                    {items.length} items in your wishlist
                </p>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    Product Name
                                </TableCell>
                                <TableCell align="right">Unit Price</TableCell>
                                <TableCell align="right">
                                    Stock Status
                                </TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: '8px',
                                        }}
                                    >
                                        <button
                                            onClick={() =>
                                                handleRemoveWishlist(row.id)
                                            }
                                            className="text-[#566363]"
                                        >
                                            <CloseIcon />
                                        </button>
                                        <Image
                                            src={row.picture}
                                            alt="image"
                                            width={80}
                                            height={80}
                                            className="object-cover w-20 h-20"
                                        />
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.price}
                                    </TableCell>
                                    <TableCell align="right">
                                        {/* {row.stockStatus} */}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.quantity}
                                    </TableCell>
                                    <TableCell align="right">
                                        <button
                                            onClick={() => handleAddToCart(row)}
                                            className="text-white bg-[#005D63] px-4 py-2 rounded-lg"
                                        >
                                            Add To Cart
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default WishList;
