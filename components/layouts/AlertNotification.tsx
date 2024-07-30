'use client';

import { resStatus } from '@/lib/redux/slices/statusSlice';
import { Alert } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

const AlertNotification = ({
    status,
    message,
}: {
    status: number | null;
    message: string | null;
}) => {
    const dispatch = useDispatch();
    const [timeRemaining, setTimeRemaining] = React.useState(3);

    React.useEffect(() => {
        let interval: NodeJS.Timeout;

        if (status) {
            setTimeRemaining(3);
            interval = setInterval(() => {
                setTimeRemaining((currentTime) => {
                    if (currentTime <= 1) {
                        dispatch(resStatus({ status: null, message: null }));
                        clearInterval(interval);
                        return 3;
                    }
                    return currentTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [status, dispatch]);
    return (
        <div className="fixed z-50 left-0 right-0 w-[300px] mt-2 bg-white mx-auto">
            <Alert
                variant="outlined"
                severity={status === 200 ? 'success' : 'error'}
            >
                {message} ({timeRemaining})
            </Alert>
        </div>
    );
};

export default AlertNotification;
