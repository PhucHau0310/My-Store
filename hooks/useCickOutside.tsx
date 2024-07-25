'use client';

import { useEffect, useRef, useState } from 'react';

const useClickOutside = (initialIsVisible: boolean) => {
    const [isVisible, setIsVisible] = useState(initialIsVisible);
    const ref = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return { ref, isVisible, setIsVisible };
};

export default useClickOutside;
