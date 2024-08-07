import { createProduct } from '@/lib/actions/productAction';
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
        const created = await createProduct(data);

        if (!created) {
            return new NextResponse(JSON.stringify({ message: 'Failed' }), {
                status: 403,
            });
        }

        return new NextResponse(
            JSON.stringify({ message: 'Created Product Success' }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to create product' }),
            { status: 500 }
        );
    }
};
