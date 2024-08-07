import { createOrder } from '@/lib/actions/orderAction';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse(
                JSON.stringify({ message: 'Unauthorized' }),
                { status: 401 }
            );
        }

        const data = await req.json();

        // Ensure that carts data is included in the request
        if (!data.carts || !Array.isArray(data.carts)) {
            return new NextResponse(
                JSON.stringify({ message: 'Invalid cart data' }),
                { status: 400 }
            );
        }

        const newOrder = await createOrder(data, data.carts);

        return new NextResponse(
            JSON.stringify({
                message: 'Create new order success',
                order: newOrder,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({
                message: 'Failed to create new order',
                error: 'error',
            }),
            { status: 500 }
        );
    }
};
