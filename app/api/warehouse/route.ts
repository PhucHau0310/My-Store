import { getAllWarehouses } from '@/lib/actions/warehouseAction';
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

        const warehouses = await getAllWarehouses();

        if (warehouses) {
            return new NextResponse(JSON.stringify(warehouses), {
                status: 200,
            });
        } else {
            return new NextResponse(
                JSON.stringify({ message: 'Not Warehouses' }),
                {
                    status: 403,
                }
            );
        }
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: 'Failed to get all Warehouses' }),
            { status: 500 }
        );
    }
};
