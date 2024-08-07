import { getAllCategories } from '@/lib/actions/categoryAction';
import { getAllDiscounts } from '@/lib/actions/discountAction';
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

        const promotions = await getAllDiscounts();

        if (promotions) {
            return new NextResponse(JSON.stringify(promotions), {
                status: 200,
            });
        } else {
            return new NextResponse(
                JSON.stringify({ message: 'Not Promotions' }),
                {
                    status: 403,
                }
            );
        }
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: 'Failed to get all Promotions' }),
            { status: 500 }
        );
    }
};
