import {
    deleteProduct,
    getProductById,
    updateProduct,
} from '@/lib/actions/productAction';
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
        const updated = await updateProduct(data);

        if (!updated) {
            return new NextResponse(JSON.stringify({ message: 'Failed' }), {
                status: 403,
            });
        }

        return new NextResponse(
            JSON.stringify({ message: 'Updated Product Success' }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to update Product' }),
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

        const deleted = await deleteProduct(params.id);

        if (!deleted) {
            return new NextResponse(JSON.stringify({ message: 'Failed' }), {
                status: 403,
            });
        }

        return new NextResponse(
            JSON.stringify({ message: 'Deleted Product Success' }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to update Product' }),
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

        const foundProduct = await getProductById(params.id);

        if (!foundProduct) {
            return new NextResponse(JSON.stringify({ message: 'Failed' }), {
                status: 403,
            });
        }

        return new NextResponse(
            JSON.stringify({
                message: 'Get Product Success',
                product: foundProduct,
            }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Failed to get Product' }),
            { status: 500 }
        );
    }
};
