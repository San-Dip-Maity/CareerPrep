import React from "react";
import { motion } from "framer-motion";

const JobCard = ({ title, company, location, type, salary, applicants }) => (
  <motion.div 
    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
    whileHover={{ scale: 1.04 }}
    transition={{ type: "tween", stiffness: 100 }}
  >
    <h3 className="text-lg font-semibold dark:text-white">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-300">{company}</p>
    <p className="text-sm text-gray-600 dark:text-gray-300">{location}</p>
    <p className="text-sm text-green-600 dark:text-green-400">{type}</p>
    <p className="text-sm dark:text-gray-200">{salary}</p>
    <p className="text-sm text-gray-600 dark:text-gray-300">{applicants} applicants</p>
    <div className="mt-2 flex justify-between">
      <button className="text-purple-600 dark:text-purple-400 hover:underline">View details</button>
      <button className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600">Apply now</button>
    </div>
  </motion.div>
);

export default JobCard;