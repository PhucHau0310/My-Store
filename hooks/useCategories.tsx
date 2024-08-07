'use client';
import { Category } from '@/interface';
import React from 'react';

const useCategories = () => {
    const [categories, setCategories] = React.useState<Category[]>([]);

    React.useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await fetch(`/api/category`);
                const data = await res.json();

                if (res.ok) {
                    setCategories(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getCategories();
    }, []);
    return { categories };
};

export default useCategories;
