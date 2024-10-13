import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 -mt-20">
      <img src="https://res.cloudinary.com/dvodvtbqr/image/upload/v1728742695/404_tsqxmy.png" alt="404" />
      <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">
        Oops! The page you're looking for seems to have an issue 😞😞.
      </p>
      <Link to="/" className="bg-purple-600 text-white px-4 py-1 rounded-md hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
