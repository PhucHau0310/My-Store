import {
    deleteCategory,
    getCategoryById,
    updateCategory,
} from '@/lib/actions/categoryAction';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse(
                JSON.stringify({ message: 'Unauthorized' }),
                { status: 401 }
            );
        }

        const data = await req.json();
        const updated = await updateCategory(data);

        if (!updated) {
            return new NextResponse(JSON.stringify({ message: 'Failed' }), {
                status: 403,
            });
        }

        return new NextResponse(
            JSON.stringify({ message: 'Updated Category Success' }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to update category' }),
            { status: 500 }
        );
    }
};

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse(
                JSON.stringify({ message: 'Unauthorized' }),
                { status: 401 }
            );
        }

        const deleted = await deleteCategory(params.id);

        if (!deleted) {
            return new NextResponse(JSON.stringify({ message: 'Failed' }), {
                status: 403,
            });
        }

        return new NextResponse(
            JSON.stringify({ message: 'Deleted Category Success' }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to update category' }),
            { status: 500 }
        );
    }
};

export const GET = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse(
                JSON.stringify({ message: 'Unauthorized' }),
                { status: 401 }
            );
        }

        const foundCategory = await getCategoryById(params.id);

        if (!foundCategory) {
            return new NextResponse(JSON.stringify({ message: 'Failed' }), {
                status: 403,
            });
        }

        return new NextResponse(
            JSON.stringify({ message: 'Get Category Success' }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to get category' }),
            { status: 500 }
        );
    }
};
