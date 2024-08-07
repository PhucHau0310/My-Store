import { getAllCategories } from '@/lib/actions/categoryAction';
import { getAllStocks } from '@/lib/actions/stockAction';
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

        const stocks = await getAllStocks();

        if (stocks) {
            return new NextResponse(JSON.stringify(stocks), {
                status: 200,
            });
        } else {
            return new NextResponse(JSON.stringify({ message: 'Not Stocks' }), {
                status: 403,
            });
        }
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: 'Failed to get all Stocks' }),
            { status: 500 }
        );
    }
};
