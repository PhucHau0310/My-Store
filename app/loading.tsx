import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="fixed z-50 top-3 right-3">
            <CircularProgress />
        </div>
    );
}
