import { Warehouse } from '@/interface';
import prisma from '../prisma';

export const getAllWarehouses = async () => {
    try {
        const warehouses = await prisma.warehouse.findMany();

        if (!warehouses) return;

        return warehouses;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const createWarehouse = async (dataWarehouse: Warehouse) => {
    try {
        const newWarehouse = await prisma.warehouse.create({
            data: dataWarehouse,
        });

        if (!newWarehouse) return;

        return newWarehouse;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateWarehouse = async (dataUpdate: Warehouse) => {
    try {
        const updated = await prisma.warehouse.update({
            where: {
                id: dataUpdate.id,
            },
            data: dataUpdate,
        });
        if (!updated) return;

        return updated;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const deleteWarehouse = async (idWarehouse: string | undefined) => {
    try {
        const deleted = await prisma.warehouse.delete({
            where: {
                id: idWarehouse,
            },
        });
        if (!deleted) return;

        return deleted;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getWarehouseById = async (
    idWarehouse: string | undefined | null
) => {
    try {
        if (!idWarehouse) throw new Error('Id user is invalid!');

        const foundWarehouse = await prisma.warehouse.findFirst({
            where: {
                id: idWarehouse,
            },
        });

        if (!foundWarehouse) return;

        return foundWarehouse;
    } catch (error) {
        console.log(error);
        return error;
    }
};
