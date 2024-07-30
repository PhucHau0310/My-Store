'use client';

import * as React from 'react';
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowModes,
    GridRowModesModel,
    GridToolbar,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

interface Row {
    id: number;
    createdAt: string;
    username: string;
    totalAmount: number;
    paymentMethod: string;
    shippingAddress: string;
    status: string;
    action: null;
    isNew?: boolean;
}

const Order = () => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Invoice ID', width: 170 },
        { field: 'createdAt', headerName: 'Date of Created', width: 130 },
        {
            field: 'username',
            headerName: 'Customer',
            width: 130,
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

    const dataRow: Row[] = [
        {
            id: 1,
            createdAt: '18 Nov 2023',
            username: 'Jon',
            totalAmount: 35,
            paymentMethod: 'cash',
            shippingAddress: '22 Vo Oanh, Phuong 25, Quan Binh Thanh, TP.HCM',
            status: 'Processing',
            action: null,
        },
        {
            id: 2,
            createdAt: '18 Nov 2023',
            username: 'Cersei',
            totalAmount: 42,
            paymentMethod: 'cash',
            shippingAddress: '22 Vo Oanh, Phuong 25, Quan Binh Thanh, TP.HCM',
            status: 'Processing',
            action: null,
        },
        {
            id: 3,
            createdAt: '18 Nov 2023',
            username: 'Jaime',
            totalAmount: 45,
            paymentMethod: 'cash',
            shippingAddress: '22 Vo Oanh, Phuong 25, Quan Binh Thanh, TP.HCM',
            status: 'Processing',
            action: null,
        },
        {
            id: 4,
            createdAt: '18 Nov 2023',
            username: 'Arya',
            totalAmount: 16,
            paymentMethod: 'cash',
            shippingAddress: '22 Vo Oanh, Phuong 25, Quan Binh Thanh, TP.HCM',
            status: 'Processing',
            action: null,
        },
        {
            id: 5,
            createdAt: '18 Nov 2023',
            username: 'Daenerys',
            totalAmount: 20,
            paymentMethod: 'cash',
            shippingAddress: '22 Vo Oanh, Phuong 25, Quan Binh Thanh, TP.HCM',
            status: 'Processing',
            action: null,
        },
        {
            id: 6,
            createdAt: '18 Nov 2023',
            username: 'Hasd',
            totalAmount: 15,
            paymentMethod: 'cash',
            shippingAddress: '22 Vo Oanh, Phuong 25, Quan Binh Thanh, TP.HCM',
            status: 'Processing',
            action: null,
        },
        {
            id: 7,
            createdAt: '18 Nov 2023',
            username: 'Ferrara',
            totalAmount: 44,
            paymentMethod: 'cash',
            shippingAddress: '22 Vo Oanh, Phuong 25, Quan Binh Thanh, TP.HCM',
            status: 'Processing',
            action: null,
        },
        {
            id: 8,
            createdAt: '18 Nov 2023',
            username: 'Rossini',
            totalAmount: 36,
            paymentMethod: 'cash',
            shippingAddress: '22 Vo Oanh, Phuong 25, Quan Binh Thanh, TP.HCM',
            status: 'Processing',
            action: null,
        },
        {
            id: 9,
            createdAt: '18 Nov 2023',
            username: 'Harvey',
            totalAmount: 65,
            paymentMethod: 'cash',
            shippingAddress: '22 Vo Oanh, Phuong 25, Quan Binh Thanh, TP.HCM',
            status: 'Processing',
            action: null,
        },
    ];
    const [rows, setRows] = React.useState<Row[]>(dataRow);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
        {}
    );

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (
        params,
        event
    ) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow && editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false } as Row;
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleAddClick = () => {
        const id = Math.max(...rows.map((row) => row.id)) + 1;
        const newRow: Row = {
            id,
            createdAt: new Date().toLocaleDateString(),
            username: '',
            totalAmount: 0,
            paymentMethod: '',
            shippingAddress: '',
            status: 'Processing',
            action: null,
            isNew: true,
        };
        setRows((oldRows) => [...oldRows, newRow]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'username' },
        }));
    };
    return (
        <div className="py-5 pb-10">
            <h1 className="text-[#010101] font-semibold text-2xl mb-2">
                Order
            </h1>
            <p className="text-[#80888b] font-normal text-base">
                Lets check your order details
            </p>
            {/* 
            <button
                onClick={handleAddClick}
                className="mt-4 mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Add new order
            </button> */}

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

export default Order;
