import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">

      {/* Icon */}
      <div className="bg-red-100 p-6 rounded-full shadow-lg animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v3m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.665 1.732-2.997L13.732 4.003c-.77-1.334-2.694-1.334-3.464 0L4.34 17.003C3.57 18.335 4.532 20 6.072 20z"
          />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-4xl mt-6 font-extrabold text-red-600 tracking-wide">
        403 — Forbidden
      </h1>

      {/* Description */}
      <p className="text-gray-700 text-lg text-center max-w-md mt-3">
        You don't have permission to access this page.  
        If you think this is a mistake, please contact the administrator.
      </p>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <Link
          to="/"
          className="px-6 py-2 bg-red-600 text-white rounded-xl text-lg font-semibold 
          hover:bg-red-700 transition-all duration-300 shadow-lg"
        >
          Go Home
        </Link>

        <Link
          to="/dashboard"
          className="px-6 py-2 bg-gray-800 text-white rounded-xl text-lg font-semibold 
          hover:bg-gray-900 transition-all duration-300 shadow-lg"
        >
          Go Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
