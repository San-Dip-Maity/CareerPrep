import React, { useEffect, useState } from "react";
import { Search, Loader2, MapPin, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchJobByText } from "../redux/jobSlice";
import JobCard from "../components/JobCard";
import JobSearchFilters from "../components/JobSearchFilters";
import axios from "axios";
import { proxy } from "../utils/constUtils";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const JobSearch = () => {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.job.searchJobByText);
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [sortOption, setSortOption] = useState("popular");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    salaryMin: "",
    salaryMax: "",
    jobType: [],
    experienceLevel: [],
  });

  // Fetch jobs from backend
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        title: jobTitle,
        location: location,
        experience: experience,
        sort: sortOption,
      });
      const response = await axios.get(`${proxy}job/get?${queryParams}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.data.success) {
        setJobs(response.data.jobs);
      }
    } catch (error) {
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [sortOption]);

  const applyFilters = () => {
    return jobs.filter((job) => {
      const matchesSalary =
        (!filters.salaryMin || job.salary >= filters.salaryMin) &&
        (!filters.salaryMax || job.salary <= filters.salaryMax);
      const matchesJobType =
        !filters.jobType.length || filters.jobType.includes(job.jobType);
      const matchesExperience =
        !filters.experienceLevel.length ||
        filters.experienceLevel.includes(job.experienceLevel);
      const matchesSearch =
        job.title.toLowerCase().includes(searchText.toLowerCase()) ||
        job.company.name.toLowerCase().includes(searchText.toLowerCase()) ||
        job.location.toLowerCase().includes(searchText.toLowerCase());

      return (
        matchesSalary && matchesJobType && matchesExperience && matchesSearch
      );
    });
  };

  const filteredJobs = applyFilters();

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const formatSalary = (salary) => {
    if (salary >= 1000000) {
      return `${(salary / 1000000).toFixed(2)}M`;
    } else if (salary >= 1000) {
      return `${(salary / 1000).toFixed(0)}K`;
    }
    return salary.toString();
  };

  return (
    <div className="container mx-auto px-4 md:px-14 py-8 bg-purple-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 dark:text-white">Job Search</h1>
      <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
        Search for your desired job matching your skills
      </p>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-8">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px]">
            <label className="sr-only" htmlFor="job-title">
              Enter Job Title Or Location
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                id="job-title"
                type="text"
                value={searchText}
                onChange={(e) => dispatch(setSearchJobByText(e.target.value))} 
                placeholder="Enter Job Title Or Location"
                className="w-full pl-10 pr-4 py-2 rounded-md border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-200 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row gap-8"
      >
        <div className="w-full md:w-1/4">
          <JobSearchFilters filters={filters} setFilters={setFilters} />
        </div>

        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold dark:text-white">
              All Jobs ({filteredJobs.length})
            </h2>
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white p-1"
            >
              <option value="popular">Popular</option>
              <option value="recent">Most Recent</option>
              <option value="salary_high">Highest Salary</option>
              <option value="salary_low">Lowest Salary</option>
              <option value="applications">Most Applications</option>
              <option value="location">Location</option>
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard
                    key={job._id}
                    id={job._id}
                    title={job.title}
                    company={job.company.name}
                    location={job.location}
                    jobType={job.jobType}
                    salary={formatSalary(job.salary)}
                    experience={job.experience}
                    description={job.description}
                  />
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-300 col-span-2 text-center">
                  No jobs found matching your criteria.
                </p>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default JobSearch;
