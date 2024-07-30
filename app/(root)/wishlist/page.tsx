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

import girl1 from '../../../public/img/girl-1.png';

function createData(
    name: string,
    price: number,
    quantity: number,
    stockStatus: string
) {
    return { name, price, quantity, stockStatus };
}

const rows = [
    createData('Frozen yoghurt', 159, 1, 'In Stock'),
    createData('Ice cream sandwich', 237, 2, 'In Stock'),
    createData('Eclair', 262, 3, 'In Stock'),
    createData('Cupcake', 305, 4, 'In Stock'),
    createData('Gingerbread', 356, 5, 'In Stock'),
];
const WishList = () => {
    return (
        <div className="bg-white mt-20 pb-28">
            <div className="max-w-screen-lg mx-auto">
                <h1 className="font-semibold text-4xl mb-6 text-center">
                    Wish List
                </h1>
                <p className="text-[#566363] font-normal text-base text-center mb-12">
                    3 items in your wishlist
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
                            {rows.map((row) => (
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
                                        <button className="text-[#566363]">
                                            <CloseIcon />
                                        </button>
                                        <Image
                                            src={girl1}
                                            alt="image"
                                            width={80}
                                            height={80}
                                            className=""
                                        />
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.price}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.stockStatus}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.quantity}
                                    </TableCell>
                                    <TableCell align="right">
                                        <button className="text-white bg-[#005D63] px-4 py-2 rounded-lg">
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
