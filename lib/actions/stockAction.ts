import { Category } from '@/interface';
import prisma from '../prisma';
import { Stock } from '@prisma/client';

export const getAllStocks = async () => {
    try {
        const stocks = await prisma.stock.findMany();

        if (!stocks) return;

        return stocks;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const createStock = async (dataStock: Stock) => {
    try {
        const newStock = await prisma.stock.create({
            data: dataStock,
        });

        if (!newStock) return;

        return newStock;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateStock = async (dataUpdate: Stock) => {
    try {
        const updated = await prisma.stock.update({
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

export const deleteStock = async (idStock: string | undefined) => {
    try {
        const deleted = await prisma.stock.delete({
            where: {
                id: idStock,
            },
        });
        if (!deleted) return;

        return deleted;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getStockById = async (idStock: string | undefined | null) => {
    try {
        if (!idStock) throw new Error('Id stock is invalid!');

        const foundStock = await prisma.stock.findFirst({
            where: {
                id: idStock,
            },
        });

        if (!foundStock) return;

        return foundStock;
    } catch (error) {
        console.log(error);
        return error;
    }
};
