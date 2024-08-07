'use client';

import useAllUsers from '@/hooks/useAllUsers';
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
import React from 'react';
import { User } from '@/interface';
import { useDataGridManager } from '@/hooks/useDataGridManager';

interface UserExtend extends User {
    isNew?: boolean;
}

const Users = () => {
    const { users } = useAllUsers();

    React.useEffect(() => {
        setRows(users);
    }, [users]);

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

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'User ID', width: 200 },
        {
            field: 'picture',
            headerName: 'Picture',
            width: 100,
            description: 'This column is not sortable.',
            sortable: false,
            renderCell(params) {
                return (
                    <div className="h-full relative">
                        <Image
                            src={params.row.picture ?? ''}
                            alt="image"
                            width={40}
                            height={40}
                            className="rounded-full absolute left-0 top-1/2 -translate-y-1/2 object-cover"
                        />
                    </div>
                );
            },
            align: 'center',
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 130,
            editable: true,
        },
        {
            field: 'username',
            headerName: 'Username',
            width: 130,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 180,
            editable: true,
        },
        {
            field: 'mobile',
            headerName: 'Contact',
            width: 110,
            description: 'This column is not sortable.',
            sortable: false,
            editable: true,
        },
        {
            field: 'createdAt',
            headerName: 'Joining Date',
            editable: false,
            width: 180,
            renderCell(params) {
                return <p>{convertTimeUs(params.row.createdAt)}</p>;
            },
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 110,
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
    } = useDataGridManager<UserExtend>(users, '/api/user');

    return (
        <div className="py-5 pb-10 ">
            <div className="flex flex-row justify-between items-center">
                <div>
                    <h1 className="text-[#010101] font-semibold text-2xl mb-2">
                        Users
                    </h1>
                    <p className="text-[#80888b] font-normal text-base">
                        Lets check your user details
                    </p>
                </div>
            </div>

            {sureDelete && (
                <div className="fixed z-30 w-[400px] top-10 left-1/2 -translate-x-1/2 bg-white shadow-lg shadow-black p-4 rounded-lg">
                    <p className="font-semibold text-red-400 text-center">
                        Are you sure delete user have ID: {idToDelete} ?
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
                            onClick={() => handleDeleteConfirm}
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

export default Users;
