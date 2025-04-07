import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-10 bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-pink-600">404</h1>
        <h2 className="text-3xl font-semibold mt-4 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Link to="/" className="btn btn-primary px-6 py-3">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
