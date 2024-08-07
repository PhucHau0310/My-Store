import { Category } from '@/interface';
import prisma from '../prisma';
import { Promotion } from '@prisma/client';

export const getAllDiscounts = async () => {
    try {
        const discounts = await prisma.promotion.findMany();

        if (!discounts) return;

        return discounts;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const createDiscount = async (dataCategory: Promotion) => {
    try {
        const newPromotion = await prisma.promotion.create({
            data: dataCategory,
        });

        if (!newPromotion) return;

        return newPromotion;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateDiscount = async (dataUpdate: Promotion) => {
    try {
        const updated = await prisma.promotion.update({
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

export const deleteDiscount = async (idPromotion: string | undefined) => {
    try {
        const deleted = await prisma.promotion.delete({
            where: {
                id: idPromotion,
            },
        });
        if (!deleted) return;

        return deleted;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getPromotionById = async (
    idPromotion: string | undefined | null
) => {
    try {
        if (!idPromotion) throw new Error('Id user is invalid!');

        const foundPromotion = await prisma.promotion.findFirst({
            where: {
                id: idPromotion,
            },
        });

        if (!foundPromotion) return;

        return foundPromotion;
    } catch (error) {
        console.log(error);
        return error;
    }
};
