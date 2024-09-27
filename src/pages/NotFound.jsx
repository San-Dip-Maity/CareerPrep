import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Oops! The page you're looking some issue😞😞.</p>
      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
