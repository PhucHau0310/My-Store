import { Category } from '@/interface';
import prisma from '../prisma';

export const getAllCategories = async () => {
    try {
        const categories = await prisma.category.findMany();

        if (!categories) return;

        return categories;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const createCategory = async (dataCategory: Category) => {
    try {
        const newCategory = await prisma.category.create({
            data: dataCategory,
        });

        if (!newCategory) return;

        return newCategory;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateCategory = async (dataUpdate: Category) => {
    try {
        const updated = await prisma.category.update({
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

export const deleteCategory = async (idCategory: string | undefined) => {
    try {
        const deleted = await prisma.category.delete({
            where: {
                id: idCategory,
            },
        });
        if (!deleted) return;

        return deleted;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getCategoryById = async (
    idCategory: string | undefined | null
) => {
    try {
        if (!idCategory) throw new Error('Id user is invalid!');

        const foundCategory = await prisma.category.findFirst({
            where: {
                id: idCategory,
            },
        });

        if (!foundCategory) return;

        return foundCategory;
    } catch (error) {
        console.log(error);
        return error;
    }
};
