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
import Image from 'next/image';
import { Switch } from '@mui/material';
import AddProduct from '@/components/form/AddProduct';
import { Product } from '@/interface';
import { useDataGridManager } from '@/hooks/useDataGridManager';
import useProducts from '@/hooks/useProducts';
import useCategories from '@/hooks/useCategories';
import { Stock } from '@prisma/client';

interface ProductExtends extends Product {
    isNew?: boolean;
}

const Products = () => {
    const [openAddProduct, setOpenAddProduct] = React.useState(false);
    const [stocks, setStocks] = React.useState<Stock[]>([]);
    const { products } = useProducts();
    const { categories } = useCategories();

    React.useEffect(() => {
        setRows(products);
    }, [products]);

    React.useEffect(() => {
        const getStocks = async () => {
            try {
                const res = await fetch(`/api/stock`);
                const data = await res.json();

                if (res.ok) {
                    setStocks(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getStocks();
    }, []);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Product ID', width: 180 },
        { field: 'name', headerName: 'Product Name', width: 180 },
        {
            field: 'picture',
            headerName: 'Picture',
            width: 80,
            renderCell(params) {
                return (
                    <div className="flex items-center h-full justify-start">
                        <Image
                            src={params.row.picture ?? ''}
                            alt="image"
                            width={40}
                            height={40}
                            className="rounded-full shadow-xl shadow-slate-700 h-[80%] object-cover"
                        />
                    </div>
                );
            },
            align: 'center',
        },
        {
            field: 'categoryName',
            headerName: 'Category',
            width: 130,
            valueGetter: (params, row) => {
                if (!row) return;
                const category = categories.find(
                    (cat) => cat.id === row.categoryId
                );

                return category ? category.name : 'Unknown';
            },
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
            // description: 'This column is not sortable.',
            // sortable: false,
            editable: true,
            valueGetter: (params, row) => {
                if (!row) return;
                const stock = stocks.find((item) => item.productId === row.id);

                return stock ? stock.quantity : 0;
            },
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
    } = useDataGridManager<ProductExtends>(products, '/api/product');

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

            {sureDelete && (
                <div className="fixed z-30 w-[400px] top-10 left-1/2 -translate-x-1/2 bg-white shadow-lg shadow-black p-4 rounded-lg">
                    <p className="font-semibold text-red-400 text-center">
                        Are you sure delete category have ID: {idToDelete} ?
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
                className="rounded-2xl mt-7"
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    checkboxSelection
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

export default Products;
