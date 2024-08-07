'use client';

import { User } from '@/interface';
import React from 'react';

const useOneUser = (idUser: string | null | undefined) => {
    const [user, setUser] = React.useState<User | null>(null);

    React.useEffect(() => {
        const getUserById = async () => {
            try {
                if (!idUser) throw new Error('Id user is invalid!');

                const res = await fetch(`/api/user/${idUser}`);
                const data = await res.json();

                if (res.ok) {
                    setUser(data);
                } else {
                    throw new Error('Failed to get user by ID');
                }
            } catch (error) {
                console.log(error);
            }
        };

        getUserById();
    }, []);
    return { user };
};

export default useOneUser;
