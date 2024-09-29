import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const JobSearchFilters = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const filterContent = (
    <>
      <div className="mb-4">
        <h3 className="font-semibold mb-2 dark:text-white">Salary Range</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Min"
            className="w-1/2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="text"
            placeholder="Max"
            className="w-1/2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2 dark:text-white">Job Type</h3>
        <div className="space-y-2">
          <label className="flex items-center dark:text-gray-300">
            <input type="checkbox" className="mr-2" defaultChecked />
            <span>All (2567)</span>
          </label>
          <label className="flex items-center dark:text-gray-300">
            <input type="checkbox" className="mr-2" />
            <span>Full-Time (450)</span>
          </label>
          <label className="flex items-center dark:text-gray-300">
            <input type="checkbox" className="mr-2" />
            <span>Part-Time (145)</span>
          </label>
          <label className="flex items-center dark:text-gray-300">
            <input type="checkbox" className="mr-2" />
            <span>Internship (65)</span>
          </label>
          <label className="flex items-center dark:text-gray-300">
            <input type="checkbox" className="mr-2" />
            <span>Contract (12)</span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2 dark:text-white">Work Mode</h3>
        <div className="space-y-2">
          <label className="flex items-center dark:text-gray-300">
            <input type="checkbox" className="mr-2" />
            <span>On-Site</span>
          </label>
          <label className="flex items-center dark:text-gray-300">
            <input type="checkbox" className="mr-2" />
            <span>Remote (180)</span>
          </label>
          <label className="flex items-center dark:text-gray-300">
            <input type="checkbox" className="mr-2" />
            <span>Hybrid (200)</span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2 dark:text-white">Job Functions</h3>
        <div className="space-y-2">
          <label className="flex items-center dark:text-gray-300">
            <input type="checkbox" className="mr-2" />
            <span>Marketing (21)</span>
          </label>
          <label className="flex items-center dark:text-gray-300">
            <input type="checkbox" className="mr-2" />
            <span>Engineering (45)</span>
          </label>
          <label className="flex items-center dark:text-gray-300">
            <input type="checkbox" className="mr-2" />
            <span>Design (71)</span>
          </label>
          <label className="flex items-center dark:text-gray-300">
            <input type="checkbox" className="mr-2" />
            <span>Sales (24)</span>
          </label>
          <label className="flex items-center dark:text-gray-300">
            <input type="checkbox" className="mr-2" />
            <span>Customer Service (109)</span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2 dark:text-white">Experience Level</h3>
        <div className="space-y-2">
          <label className="flex items-center dark:text-gray-300">
            <input type="checkbox" className="mr-2" />
            <span>Fresher/Entry-Level (265)</span>
          </label>
          <label className="flex items-center dark:text-gray-300">
            <input type="checkbox" className="mr-2" />
            <span>Junior (21)</span>
          </label>
          <label className="flex items-center dark:text-gray-300">
            <input type="checkbox" className="mr-2" />
            <span>Mid-Level (212)</span>
          </label>
          <label className="flex items-center dark:text-gray-300">
            <input type="checkbox" className="mr-2" />
            <span>Senior (12)</span>
          </label>
          <label className="flex items-center dark:text-gray-300">
            <input type="checkbox" className="mr-2" />
            <span>Lead/Managerial (24)</span>
          </label>
          <label className="flex items-center dark:text-gray-300">
            <input type="checkbox" className="mr-2" />
            <span>Director/Executive (10)</span>
          </label>
        </div>
      </div>

    </>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Mobile view */}
      <div className="md:hidden">
        <button
          onClick={toggleExpand}
          className="flex items-center justify-between w-full p-4 text-left font-bold dark:text-white"
        >
          <span className="flex items-center">
            <Filter size={20} className="mr-2" />
            Filters
          </span>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4">{filterContent}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block p-4">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Filters</h2>
        {filterContent}
      </div>
    </div>
  );
};

export default JobSearchFilters;
