import { getAllBlogs } from '@/lib/actions/blogAction';
import { getAllCategories } from '@/lib/actions/categoryAction';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse(
                JSON.stringify({ message: 'Unauthorized' }),
                { status: 401 }
            );
        }

        const categories = await getAllBlogs();

        if (categories) {
            return new NextResponse(JSON.stringify(categories), {
                status: 200,
            });
        } else {
            return new NextResponse(JSON.stringify({ message: 'Not Blogs' }), {
                status: 403,
            });
        }
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: 'Failed to get all Blogs' }),
            { status: 500 }
        );
    }
};
