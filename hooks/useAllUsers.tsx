'use client';
import { User } from '@/interface';
import React from 'react';

const useAllUsers = () => {
    const [users, setUsers] = React.useState<User[]>([]);

    React.useEffect(() => {
        const getAllUsers = async () => {
            try {
                const res = await fetch(`/api/user`);
                const data = await res.json();

                if (res.ok) {
                    setUsers(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getAllUsers();
    }, []);
    return { users };
};

export default useAllUsers;
