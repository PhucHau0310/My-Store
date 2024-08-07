'use client';

import { Category } from '@/interface';
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowModes,
    GridToolbar,
} from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { Switch } from '@mui/material';
import AddCategory from '@/components/form/AddCategory';
import useCategories from '@/hooks/useCategories';
import { useDataGridManager } from '@/hooks/useDataGridManager';

interface CategoriesExtend extends Category {
    isNew?: boolean;
}

const Categories = () => {
    const [openAddCategory, setOpenAddCategory] = React.useState(false);
    const { categories } = useCategories();

    useEffect(() => {
        setRows(categories);
    }, [categories]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Category ID', width: 230 },
        {
            field: 'image',
            headerName: 'Icon',
            width: 100,
            description: 'This column is not sortable.',
            sortable: false,
            editable: true,
            renderCell(params) {
                return (
                    <div className="h-full relative">
                        <Image
                            src={params.row.image ?? ''}
                            alt="image"
                            width={40}
                            height={40}
                            className="rounded-full shadow-lg shadow-slate-600 h-[80%] absolute left-0 top-1/2 -translate-y-1/2 object-cover"
                        />
                    </div>
                );
            },
            align: 'center',
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
            editable: true,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 250,
            editable: true,
        },
        {
            field: 'published',
            headerName: 'Published',
            width: 180,
            editable: true,
            renderCell: (params) => {
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
    } = useDataGridManager<CategoriesExtend>(categories, '/api/category');

    return (
        <div className="py-5 pb-10 ">
            <div className="flex flex-row justify-between items-center">
                <div>
                    <h1 className="text-[#010101] font-semibold text-2xl mb-2">
                        Categories
                    </h1>
                    <p className="text-[#80888b] font-normal text-base">
                        Lets check your category details
                    </p>
                </div>
                <button
                    onClick={() => setOpenAddCategory(true)}
                    className="bg-white rounded-xl shadow-lg hover:drop-shadow-md transform transition-all duration-300 p-4 text-black font-semibold text-base"
                >
                    Add Category
                </button>

                {openAddCategory && (
                    <AddCategory
                        openAddCategory={openAddCategory}
                        setOpenAddCategory={setOpenAddCategory}
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

export default Categories;
