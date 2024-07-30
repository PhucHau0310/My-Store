'use client';

import useAllUsers from '@/hooks/useAllUsers';
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowModes,
    GridRowModesModel,
    GridToolbar,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import girl1 from '../../../../public/img/girl-1.png';
import React from 'react';
import { User } from '@/interface';

const Users = () => {
    const { users } = useAllUsers();

    React.useEffect(() => {
        setRows(users);
    }, [users]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'User ID', width: 200 },
        {
            field: 'picture',
            headerName: 'Picture',
            width: 100,
            description: 'This column is not sortable.',
            sortable: false,
            editable: false,
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
            description: 'This column is not sortable.',
            sortable: false,
        },
        {
            field: 'username',
            headerName: 'Username',
            width: 130,
            description: 'This column is not sortable.',
            sortable: false,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 180,
        },
        {
            field: 'mobile',
            headerName: 'Contact',
            width: 110,
        },
        {
            field: 'createdAt',
            headerName: 'Joining Date',
            width: 110,
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

    const [rows, setRows] = React.useState<User[]>([]);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
        {}
    );

    console.log({ rows });
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

export default Users;
