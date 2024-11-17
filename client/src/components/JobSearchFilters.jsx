import React, { useState } from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const JobSearchFilters = ({ filters, setFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filterContent = (
    <>
      <div className="mb-4">
        <h3 className="font-semibold mb-2 dark:text-white">Salary Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.salaryMin || ""}
            onChange={(e) =>
              handleFilterChange("salaryMin", e.target.value)
            }
            className="w-1/2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.salaryMax || ""}
            onChange={(e) =>
              handleFilterChange("salaryMax", e.target.value)
            }
            className="w-1/2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2 dark:text-white">Job Type</h3>
        <div className="space-y-2">
          {["Full-Time", "Part-Time", "Internship", "Contract"].map((type) => (
            <label key={type} className="flex items-center dark:text-gray-300">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.jobType?.includes(type)}
                onChange={(e) => {
                  const selectedTypes = filters.jobType || [];
                  handleFilterChange(
                    "jobType",
                    e.target.checked
                      ? [...selectedTypes, type]
                      : selectedTypes.filter((t) => t !== type)
                  );
                }}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2 dark:text-white">Experience Level</h3>
        <div className="space-y-2">
          {["Entry-Level", "Junior", "Mid-Level", "Senior"].map((level) => (
            <label key={level} className="flex items-center dark:text-gray-300">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.experienceLevel?.includes(level)}
                onChange={(e) => {
                  const selectedLevels = filters.experienceLevel || [];
                  handleFilterChange(
                    "experienceLevel",
                    e.target.checked
                      ? [...selectedLevels, level]
                      : selectedLevels.filter((l) => l !== level)
                  );
                }}
              />
              <span>{level}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
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
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4">{filterContent}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="hidden md:block p-4">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Filters</h2>
        {filterContent}
      </div>
    </div>
  );
};

export default JobSearchFilters;
