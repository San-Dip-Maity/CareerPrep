import React from 'react';
import { motion } from 'framer-motion';


const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const CompanyCard = ({ company }) => (
  <motion.div
    variants={itemVariants}
    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
  >
    <div className="flex items-center space-x-4">
      <div className="w-16 h-16 flex-shrink-0">
        <img
          src={company.logo}
          alt={company.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {company.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {company.location}
        </p>
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          {company.website}
        </a>
      </div>
    </div>
    <p className="mt-4 text-gray-600 dark:text-gray-300">
      {company.description}
    </p>
  </motion.div>
);

export default CompanyCard;