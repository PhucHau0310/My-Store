import { getAllUser } from '@/lib/actions/userAction';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const users = await getAllUser();

        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (users) {
            return new NextResponse(JSON.stringify(users), { status: 200 });
        } else {
            return new NextResponse(JSON.stringify({ message: 'Not Users' }), {
                status: 403,
            });
        }
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: 'Failed to get all users' }),
            { status: 500 }
        );
    }
};
