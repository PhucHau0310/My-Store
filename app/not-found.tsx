import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="bg-black h-screen text-white flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold">404 | Not Found Page</h2>
            <p className="mt-10 mb-5 text-red-400">
                Could not find requested resource !!
            </p>
            <Link
                href="/"
                className="p-4 bg-zinc-700 font-semibold rounded-xl hover:opacity-95"
            >
                Return Home
            </Link>
        </div>
    );
}
