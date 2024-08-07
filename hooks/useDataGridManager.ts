'use client';

import { useState } from 'react';
import {
    GridEventListener,
    GridRowEditStopReasons,
    GridRowId,
    GridRowModel,
    GridRowModes,
    GridRowModesModel,
} from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { resStatus } from '@/lib/redux/slices/statusSlice';
import { deleteObject, getStorage, ref } from 'firebase/storage';

interface DataItem {
    id: string;
    [key: string]: any;
}

export function useDataGridManager<T extends DataItem>(
    initialRows: T[],
    apiEndpoint: string
) {
    const [rows, setRows] = useState<T[]>(initialRows);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [sureDelete, setSureDelete] = useState(false);
    const [idToDelete, setIdToDelete] = useState<GridRowId | null>(null);
    const dispatch = useDispatch();

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

    const handleSaveClick = (id: GridRowId) => async () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        });
        const editedRow = rows.find((row) => row.id === id);
        if (editedRow) {
            try {
                const { isNew, ...dataUpdate } = editedRow;
                const res = await fetch(`${apiEndpoint}/${editedRow.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataUpdate),
                });
                const data = await res.json();
                dispatch(
                    resStatus({ status: res.status, message: data.message })
                );
            } catch (error) {
                console.error(`Failed to update ${apiEndpoint}:`, error);
                dispatch(
                    resStatus({
                        status: 500,
                        message: `Failed to update ${apiEndpoint}`,
                    })
                );
            }
        }
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setSureDelete(true);
        setIdToDelete(id);
    };

    const handleDeleteConfirm = async () => {
        if (idToDelete) {
            try {
                // Lấy thông tin về category cần xóa
                // const categoryRes = await fetch(`${apiEndpoint}/${idToDelete}`);
                // const categoryData = await categoryRes.json();

                // Tìm category trong state rows
                const categoryToDelete = rows.find(
                    (row) => row.id === idToDelete
                );

                if (!categoryToDelete) {
                    throw new Error('Category not found in local state');
                }

                // Xóa dữ liệu từ API
                const deleteRes = await fetch(`${apiEndpoint}/${idToDelete}`, {
                    method: 'DELETE',
                });
                const deleteData = await deleteRes.json();

                if (!deleteRes.ok) {
                    throw new Error(
                        deleteData.message ||
                            'Failed to delete category from API'
                    );
                }

                // Xóa file từ Firebase Storage nếu có

                if (apiEndpoint.includes('/category')) {
                    if (categoryToDelete.image) {
                        const storage = getStorage();
                        const fileRef = ref(storage, categoryToDelete.image);
                        await deleteObject(fileRef);
                    }
                } else {
                    if (categoryToDelete.picture) {
                        const storage = getStorage();
                        const fileRef = ref(storage, categoryToDelete.image);
                        await deleteObject(fileRef);
                    }
                }

                // Cập nhật state và gửi thông báo
                setRows(rows.filter((row) => row.id !== idToDelete));
                dispatch(
                    resStatus({
                        status: deleteRes.status,
                        message: deleteData.message,
                    })
                );
            } catch (error) {
                console.error(
                    `Failed to delete ${apiEndpoint} or file:`,
                    error
                );
                dispatch(
                    resStatus({
                        status: 500,
                        message: `Failed to delete ${apiEndpoint} or associated file`,
                    })
                );
            } finally {
                setSureDelete(false);
                setIdToDelete(null);
            }
        }
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
        const editedRow = rows.find((row) => row.id === id);
        if (editedRow?.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = async (newRow: GridRowModel) => {
        // const updatedRow = { ...newRow, isNew: false } as T;
        const updatedRow = { ...newRow, isNew: false } as any;
        try {
            const { isNew, ...dataUpdate } = updatedRow;
            await fetch(`${apiEndpoint}/${updatedRow.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataUpdate),
            });
            setRows(
                rows.map((row) => (row.id === newRow.id ? updatedRow : row))
            );
            return updatedRow;
        } catch (error) {
            console.error(`Failed to update ${apiEndpoint}:`, error);
            throw error;
        }
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    return {
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
    };
}
