import {
    createOrUpdateUser,
    deleteUser,
    getUserById,
} from '@/lib/actions/userAction';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        if (!params.id) throw new Error('Id User is not invalid!');

        const { userId } = auth();

        if (!userId) {
            return new NextResponse(
                JSON.stringify({ message: 'Unauthorized' }),
                { status: 401 }
            );
        }

        const user = await getUserById(params.id);

        if (!user) {
            return new NextResponse(
                JSON.stringify({ message: 'Not Found User' }),
                { status: 403 }
            );
        }

        return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: `Failed to get user by ID: ${params.id}`,
            }),
            {
                status: 500,
            }
        );
    }
};

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        if (!params.id) throw new Error('Id User is not invalid!');

        const { userId } = auth();

        if (!userId) {
            return new NextResponse(
                JSON.stringify({ message: 'Unauthorized' }),
                { status: 401 }
            );
        }

        const userDeleted = await deleteUser(params.id);

        if (!userDeleted) {
            return new NextResponse(
                JSON.stringify({ message: 'Error to delete user' }),
                { status: 403 }
            );
        }

        return new NextResponse(
            JSON.stringify({ message: 'Deleted user successfully' }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: `Failed to get user by ID: ${params.id}`,
            }),
            {
                status: 500,
            }
        );
    }
};

export const PUT = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        if (!params.id) throw new Error('Id User is not invalid!');

        const { userId } = auth();

        if (!userId) {
            return new NextResponse(
                JSON.stringify({ message: 'Unauthorized' }),
                { status: 401 }
            );
        }

        const dataUpdate = await req.json();
        const updated = await createOrUpdateUser(dataUpdate);

        if (!updated) {
            return new NextResponse(
                JSON.stringify({ message: 'Error to update user' }),
                { status: 403 }
            );
        }

        return new NextResponse(
            JSON.stringify({ message: 'Updated user successfully' }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: `Failed to get user by ID: ${params.id}`,
            }),
            {
                status: 500,
            }
        );
    }
};
