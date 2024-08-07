import prisma from '../prisma';
import { Post } from '@prisma/client';

export const getAllBlogs = async () => {
    try {
        const blogs = await prisma.post.findMany({
            include: {
                author: true,
            },
        });

        if (!blogs) return;

        return blogs;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const createBlog = async (dataBlog: Post) => {
    try {
        const newBlog = await prisma.post.create({
            data: dataBlog,
        });

        if (!newBlog) return;

        return newBlog;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateBlog = async (dataUpdate: Post) => {
    try {
        const updated = await prisma.post.update({
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

export const deleteBlog = async (idBlog: string | undefined) => {
    try {
        const deleted = await prisma.post.delete({
            where: {
                id: idBlog,
            },
        });
        if (!deleted) return;

        return deleted;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getBlogById = async (idBlog: string | undefined | null) => {
    try {
        if (!idBlog) throw new Error('Id blog is invalid!');

        const foundCategory = await prisma.post.findFirst({
            where: {
                id: idBlog,
            },
        });

        if (!foundCategory) return;

        return foundCategory;
    } catch (error) {
        console.log(error);
        return error;
    }
};
