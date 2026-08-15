import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-8xl font-black tracking-tight text-gray-200 sm:text-9xl">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">Page Not Found</h2>
      <p className="mt-3 max-w-md text-base text-gray-500">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="rounded-full bg-gradient-to-r from-[#FF5E62] to-[#FF9933] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        >
          Go Home
        </Link>
        <Link
          to="/booking"
          className="rounded-full border border-gray-300 px-8 py-3.5 text-sm font-bold text-gray-700 transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white"
        >
          Book a Ride
        </Link>
      </div>
    </div>
  );
}
