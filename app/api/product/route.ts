import { getAllProducts } from '@/lib/actions/productAction';
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

        const products = await getAllProducts();

        if (products) {
            return new NextResponse(JSON.stringify(products), {
                status: 200,
            });
        } else {
            return new NextResponse(
                JSON.stringify({ message: 'Not Products' }),
                {
                    status: 403,
                }
            );
        }
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: 'Failed to get all products' }),
            { status: 500 }
        );
    }
};
