import prisma from '../prisma';
import { Product } from '@prisma/client';

export const getAllProducts = async () => {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
                Stock: true,
                Review: true,
            },
        });

        if (!products) return;

        return products;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const createProduct = async (dataProduct: Product) => {
    try {
        const newProduct = await prisma.product.create({
            data: dataProduct,
        });

        if (!newProduct) return;

        return newProduct;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateProduct = async (dataUpdate: Product) => {
    try {
        const updated = await prisma.product.update({
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

export const deleteProduct = async (idProduct: string | undefined) => {
    try {
        const deleted = await prisma.product.delete({
            where: {
                id: idProduct,
            },
        });
        if (!deleted) return;

        return deleted;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getProductById = async (idProduct: string | undefined | null) => {
    try {
        if (!idProduct) throw new Error('Id user is invalid!');

        const foundProduct = await prisma.product.findFirst({
            where: {
                id: idProduct,
            },
            include: {
                category: true,
                Review: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        if (!foundProduct) return;

        return foundProduct;
    } catch (error) {
        console.log(error);
        return error;
    }
};
