'use client';
import { Product } from '@/interface';
import React from 'react';

const useProducts = () => {
    const [products, setProducts] = React.useState<Product[]>([]);
    const [isLoading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/product`);
                const data = await res.json();

                if (res.ok) {
                    setProducts(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);
    return { products, isLoading };
};

export default useProducts;
