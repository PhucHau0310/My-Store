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
import Image from 'next/image';
import girl1 from '../../../../public/img/girl-1.png';
import { Switch } from '@mui/material';
import AddProduct from '@/components/form/AddProduct';

interface Row {
    id: number;
    name: string;
    picture: any;
    price: number;
    salePrice: number;
    quantity: number;
    stock: number;
    categoryName: string;
    published: boolean;
    version: string;
    action: null;
    isNew?: boolean;
}

const Products = () => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Product ID', width: 130 },
        { field: 'name', headerName: 'Product Name', width: 130 },
        {
            field: 'picture',
            headerName: 'Picture',
            width: 130,
            renderCell(params) {
                return (
                    <Image
                        src={params.row.picture ?? ''}
                        alt="image"
                        width={50}
                        height={50}
                        className="rounded-full object-cover"
                    />
                );
            },
            align: 'center',
        },
        {
            field: 'categoryName',
            headerName: 'Category',
            width: 130,
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            width: 110,
        },
        {
            field: 'salePrice',
            headerName: 'Sale Price',
            type: 'number',
            width: 110,
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 110,
            type: 'number',
        },
        {
            field: 'stock',
            headerName: 'Stock',
            width: 110,
            type: 'number',
            description: 'This column is not sortable.',
            sortable: false,
            editable: true,
        },
        {
            field: 'version',
            headerName: 'Version',
            width: 120,
            editable: true,
        },
        {
            field: 'published',
            headerName: 'Published',
            width: 120,
            editable: true,
            renderCell(params) {
                return (
                    <Switch
                        checked={params.row.published}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        color="success"
                    />
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
                            // onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            // onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        // onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        // onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const dataRow: Row[] = [
        {
            id: 1,
            name: 'Nguyen Hau',
            picture: girl1,
            categoryName: 'Fashion',
            price: 20,
            salePrice: 10,
            quantity: 30,
            stock: 20,
            published: true,
            version: '1.0',
            action: null,
        },
        {
            id: 2,
            name: 'Nguyen Hau',
            picture: girl1,
            categoryName: 'Fashion',
            price: 20,
            salePrice: 10,
            quantity: 30,
            stock: 20,
            published: true,
            version: '1.0',
            action: null,
        },
        {
            id: 3,
            name: 'Nguyen Hau',
            picture: girl1,
            categoryName: 'Fashion',
            price: 20,
            salePrice: 10,
            quantity: 30,
            stock: 20,
            published: true,
            version: '1.0',
            action: null,
        },
        {
            id: 4,
            name: 'Nguyen Hau',
            picture: girl1,
            categoryName: 'Fashion',
            price: 20,
            salePrice: 10,
            quantity: 30,
            stock: 20,
            published: true,
            version: '1.0',
            action: null,
        },
        {
            id: 5,
            name: 'Nguyen Hau',
            picture: girl1,
            categoryName: 'Fashion',
            price: 20,
            salePrice: 10,
            quantity: 30,
            stock: 20,
            published: true,
            version: '1.0',
            action: null,
        },
        {
            id: 6,
            name: 'Nguyen Hau',
            picture: girl1,
            categoryName: 'Fashion',
            price: 20,
            salePrice: 10,
            quantity: 30,
            stock: 20,
            published: true,
            version: '1.0',
            action: null,
        },
        {
            id: 7,
            name: 'Nguyen Hau',
            picture: girl1,
            categoryName: 'Fashion',
            price: 20,
            salePrice: 10,
            quantity: 30,
            stock: 20,
            published: true,
            version: '1.0',
            action: null,
        },
    ];

    const [rows, setRows] = React.useState<Row[]>(dataRow);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
        {}
    );

    const [checked, setChecked] = React.useState(true);
    const [openAddProduct, setOpenAddProduct] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <div className="py-5 pb-10 ">
            <div className="flex flex-row justify-between items-center">
                <div>
                    <h1 className="text-[#010101] font-semibold text-2xl mb-2">
                        Products
                    </h1>
                    <p className="text-[#80888b] font-normal text-base">
                        Lets check your product details
                    </p>
                </div>
                <button
                    onClick={() => setOpenAddProduct(true)}
                    className="bg-white rounded-xl shadow-lg hover:drop-shadow-md transform transition-all duration-300 p-4 text-black font-semibold text-base"
                >
                    Add Product
                </button>

                {openAddProduct && (
                    <AddProduct
                        openAddProduct={openAddProduct}
                        setOpenAddProduct={setOpenAddProduct}
                    />
                )}
            </div>

            <div
                style={{ height: 450, width: '100%' }}
                className="rounded-2xl mt-7"
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    checkboxSelection
                    // onRowModesModelChange={handleRowModesModelChange}
                    // onRowEditStop={handleRowEditStop}
                    // processRowUpdate={processRowUpdate}
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

export default Products;
