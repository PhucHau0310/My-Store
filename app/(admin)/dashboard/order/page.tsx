'use client';

import * as React from 'react';
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowModes,
    GridToolbar,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Order } from '@prisma/client';
import { useDataGridManager } from '@/hooks/useDataGridManager';

interface OrderExtends extends Order {
    isNew?: boolean;
}

const Orderr = () => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Invoice ID', width: 200 },
        {
            field: 'orderDate',
            headerName: 'Date of Created',
            width: 200,
            editable: true,
            renderCell(params) {
                return <p>{convertTimeUs(params.row.orderDate)}</p>;
            },
        },
        {
            field: 'username',
            headerName: 'Customer',
            width: 130,
            renderCell(params) {
                return <p>{params.row.user.username}</p>;
            },
        },
        {
            field: 'totalAmount',
            headerName: 'Amount',
            type: 'number',
            width: 110,
        },
        {
            field: 'paymentMethod',
            headerName: 'Payment Method',
            width: 150,
            renderCell(params) {
                return <p>{params.row.payment.paymentMethod}</p>;
            },
        },
        {
            field: 'shippingAddress',
            headerName: 'Shipping Address',
            width: 260,
            description: 'This column is not sortable.',
            sortable: false,
            editable: true,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            editable: true,
            headerAlign: 'center',
            renderCell(params) {
                const bgColor = textColorOptions(params.row.status);
                return (
                    <p
                        style={{ backgroundColor: bgColor, color: 'white' }}
                        className="mx-auto flex items-center justify-center mt-2 rounded-xl px-1 w-[85%] h-2/3"
                    >
                        {params.row.status}
                    </p>
                );
            },
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const [orders, setOrders] = React.useState<Order[]>([]);

    const textColorOptions = (text: string) => {
        switch (text) {
            case 'PENDING':
                return '#be8518';
            case 'PROCESSING':
                return '#1e3faa';
            case 'DELIVERED':
                return '#27725b';
            case 'CANCELLED':
                return '#b90101';
            case 'SHIPPED':
                return '#fbc02d';
            default:
                return '#26c6da';
        }
    };

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

    React.useEffect(() => {
        const orders = async () => {
            try {
                const res = await fetch(`/api/order`);
                const data = await res.json();

                if (res.ok) {
                    setOrders(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        orders();
    }, []);

    React.useEffect(() => {
        setRows(orders);
    }, [orders]);

    const {
        rows,
        setRows,
        rowModesModel,
        setRowModesModel,
        sureDelete,
        idToDelete,
        handleRowEditStop,
        handleEditClick,
        handleSaveClick,
        handleDeleteClick,
        handleDeleteConfirm,
        handleCancelClick,
        processRowUpdate,
        handleRowModesModelChange,
        setSureDelete,
        setIdToDelete,
    } = useDataGridManager<OrderExtends>(orders, '/api/order');

    return (
        <div className="py-5 pb-10">
            <h1 className="text-[#010101] font-semibold text-2xl mb-2">
                Order
            </h1>
            <p className="text-[#80888b] font-normal text-base">
                Lets check your order details
            </p>

            {sureDelete && (
                <div className="fixed z-30 w-[400px] top-10 left-1/2 -translate-x-1/2 bg-white shadow-lg shadow-black p-4 rounded-lg">
                    <p className="font-semibold text-red-400 text-center">
                        Are you sure delete order have ID: {idToDelete} ?
                    </p>

                    <div className="flex flex-row items-center gap-8 text-white mt-5">
                        <button
                            onClick={() => {
                                setIdToDelete(null);
                                setSureDelete(false);
                            }}
                            className="w-1/2 bg-blue-400 p-1 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                handleDeleteConfirm();
                                setSureDelete(false);
                            }}
                            className="w-1/2 bg-red-600 p-1 rounded-lg"
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}

            <div
                style={{ height: 450, width: '100%' }}
                className="rounded-2xl mt-8"
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>
        </div>
    );
};

export default Orderr;
