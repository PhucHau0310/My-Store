import { Review } from '@prisma/client';
import prisma from '../prisma';

export const getAllReviews = async () => {
    try {
        const reviews = await prisma.review.findMany({
            include: {
                user: true,
            },
        });

        if (!reviews) return;

        return reviews;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const createReview = async (dataReview: Review) => {
    try {
        const newReview = await prisma.review.create({
            data: dataReview,
        });

        if (!newReview) return;

        return newReview;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateReview = async (dataReview: Review) => {
    try {
        const updated = await prisma.review.update({
            where: {
                id: dataReview.id,
            },
            data: dataReview,
        });
        if (!updated) return;

        return updated;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const deleteReview = async (idReview: string | undefined) => {
    try {
        const deleted = await prisma.review.delete({
            where: {
                id: idReview,
            },
        });
        if (!deleted) return;

        return deleted;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getReviewById = async (idReview: string | undefined | null) => {
    try {
        if (!idReview) throw new Error('Id user is invalid!');

        const foundReview = await prisma.review.findFirst({
            where: {
                id: idReview,
            },
        });

        if (!foundReview) return;

        return foundReview;
    } catch (error) {
        console.log(error);
        return error;
    }
};
