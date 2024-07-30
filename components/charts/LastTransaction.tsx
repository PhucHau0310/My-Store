import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    orderId: string,
    orderTime: string,
    name: string,
    price: number,
    status: string
) {
    return { orderId, orderTime, name, price, status };
}

const rows = [
    createData('12323', 'Nov 16, 2023 6:12 PM', 'Nguyen Hau', 24, 'Processing'),
    createData('12244', 'Nov 16, 2023 6:12 PM', 'Nguyen Hau', 24, 'Delivered'),
    createData('29232', 'Nov 16, 2023 6:12 PM', 'Nguyen Hau', 24, 'Pending'),
    createData('93342', 'Nov 16, 2023 6:12 PM', 'Nguyen Hau', 24, 'Cancelled'),
    createData('42321', 'Nov 16, 2023 6:12 PM', 'Nguyen Hau', 24, 'Shipped'),
];

const LastTransaction = () => {
    const convertBgColor = (str: string) => {
        switch (str) {
            case 'Processing':
                return '#1e3faa';
            case 'Delivered':
                return '#27725b';
            case 'Pending':
                return '#be8518';
            case 'Cancelled':
                return '#b90101';
            case 'Shipped':
                return '#fbc02d';
            default:
                return '#dbdddf';
        }
    };

    return (
        <div className="mt-10 w-2/3 bg-white border border-[#f1f1f1] rounded-xl py-4 px-14  overflow-x-scroll">
            <h1 className="text-lg font-semibold mb-4">Last Transaction</h1>

            <TableContainer component={Paper} className="scrollY pb-2">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell align="right">Order Time</TableCell>
                            <TableCell align="right">Username</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.orderId}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.orderId}
                                </TableCell>
                                <TableCell align="right">
                                    {row.orderTime}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell
                                    align="right"
                                    style={{
                                        backgroundColor: `${convertBgColor(
                                            row.status
                                        )}`,
                                        borderRadius: '99px',
                                        color: 'white',
                                        textAlign: 'center',
                                        width: '15px',
                                    }}
                                >
                                    {row.status}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default LastTransaction;
