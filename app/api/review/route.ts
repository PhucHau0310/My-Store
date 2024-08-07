import { getAllCategories } from '@/lib/actions/categoryAction';
import { getAllReviews } from '@/lib/actions/reviewAction';
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

        const reviews = await getAllReviews();

        if (reviews) {
            return new NextResponse(JSON.stringify(reviews), {
                status: 200,
            });
        } else {
            return new NextResponse(
                JSON.stringify({ message: 'Not Reviews' }),
                {
                    status: 403,
                }
            );
        }
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: 'Failed to get all Reviews' }),
            { status: 500 }
        );
    }
};
