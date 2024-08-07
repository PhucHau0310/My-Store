'use client';

import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowModes,
    GridToolbar,
} from '@mui/x-data-grid';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useDataGridManager } from '@/hooks/useDataGridManager';
import { Warehouse } from '@/interface';
import AddWarehouse from '@/components/form/AddWarehouse';

interface WarehouseExtends extends Warehouse {
    isNew?: boolean;
}

const Warehouses = () => {
    const [openAddWarehouse, setOpenAddWarehouse] = React.useState(false);
    const [warehouses, setWarehouses] = React.useState<Warehouse[]>([]);

    React.useEffect(() => {
        const getWarehouses = async () => {
            try {
                const res = await fetch(`/api/warehouse`);
                const data = await res.json();

                if (res.ok) {
                    setRows(data);
                    setWarehouses(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getWarehouses();
    }, []);

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
    } = useDataGridManager<WarehouseExtends>(warehouses, '/api/warehouse');

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Product ID', width: 130 },
        { field: 'name', headerName: 'Name', width: 130, editable: true },
        {
            field: 'location',
            headerName: 'Location',
            width: 380,
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

    return (
        <div className="py-5 pb-10 ">
            <div className="flex flex-row justify-between items-center">
                <div>
                    <h1 className="text-[#010101] font-semibold text-2xl mb-2">
                        Warehouses
                    </h1>
                    <p className="text-[#80888b] font-normal text-base">
                        Lets check your warehouse details
                    </p>
                </div>
                <button
                    onClick={() => setOpenAddWarehouse(true)}
                    className="bg-white rounded-xl shadow-lg hover:drop-shadow-md transform transition-all duration-300 p-4 text-black font-semibold text-base"
                >
                    Add Warehouse
                </button>

                {openAddWarehouse && (
                    <AddWarehouse
                        openAddWarehouse={openAddWarehouse}
                        setOpenAddWarehouse={setOpenAddWarehouse}
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

export default Warehouses;
