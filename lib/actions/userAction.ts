import prisma from '../prisma';

interface User {
    id: string;
    name: string;
    email: string;
    picture: string;
    username: string;
    mobile?: string;
    password?: string;
}

export const createOrUpdateUser = async (dataUser: User) => {
    try {
        const createdUser = await prisma.user.findFirst({
            where: {
                id: dataUser.id,
            },
        });

        if (!createdUser) {
            const newUser = await prisma.user.create({
                data: dataUser,
            });

            return newUser;
        } else {
            const updateUser = await prisma.user.update({
                where: {
                    id: dataUser.id,
                },
                data: dataUser,
            });

            return updateUser;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const deleteUser = async (idUser: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: idUser,
            },
        });

        if (!user) {
            console.log(`User with ID ${idUser} not found`);
            return null; // hoặc trả về một thông báo phù hợp
        }

        const userDeleted = await prisma.user.delete({
            where: {
                id: idUser,
            },
        });

        return userDeleted;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getAllUser = async () => {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
        console.log(error);
        return error;
    }
};
