import { getAllOrders } from '@/lib/actions/orderAction';
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

        const orders = await getAllOrders();

        if (orders) {
            return new NextResponse(JSON.stringify(orders), {
                status: 200,
            });
        } else {
            return new NextResponse(JSON.stringify({ message: 'Not Orders' }), {
                status: 403,
            });
        }
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: 'Failed to get all Orders' }),
            { status: 500 }
        );
    }
};
