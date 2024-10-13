import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Profile = () => {
  return (
    <>
      <div className="bg-purple-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4">
        <motion.div
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-center mb-6 dark:text-white">
            No User Profile Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
            It looks like you're not logged in or we couldn't find your profile.
            Please log in to view your profile or create a new account.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/login"
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition-colors duration-300"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition-colors duration-300"
            >
              Sign Up
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Profile;
