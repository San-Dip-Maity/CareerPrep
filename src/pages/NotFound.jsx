import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-100 mb-4">404</h1>
      <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">
        Oops! The page you're looking for seems to have an issue 😞😞.
      </p>
      <Link to="/" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
