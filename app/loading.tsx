import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="fixed top-3 right-3 z-20">
            <CircularProgress />
        </div>
    );
}
