import { createCategory } from '@/lib/actions/categoryAction';
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
        const created = await createCategory(data);

        if (!created) {
            return new NextResponse(JSON.stringify({ message: 'Failed' }), {
                status: 403,
            });
        }

        return new NextResponse(
            JSON.stringify({ message: 'Created Category Success' }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to create category' }),
            { status: 500 }
        );
    }
};
