import React, { useState, useEffect } from "react";
import { Search, MapPin, Clock } from "lucide-react";
import JobCard from "../components/JobCard";
import JobSearchFilters from "../components/JobSearchFilters";
import { useLocation } from "react-router-dom"; // Import useLocation

const JobSearch = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [sortOption, setSortOption] = useState("popular");

  const locationObj = useLocation(); // Initialize useLocation

  useEffect(() => {
    const params = new URLSearchParams(locationObj.search);
    setJobTitle(params.get("title") || "");
    setLocation(params.get("location") || "");
  }, [locationObj]);

  const jobs = [
    {
      title: "Technical Support Specialist",
      company: "Google Inc.",
      location: "New Delhi, India",
      sift: "Full time",
      salary: "20,000 INR - 25,000 INR",
      applicants: "10+",
      logo: "companiesLogo/google.svg",
    },
    {
      title: "Senior UI/UX Designer",
      company: "Microsoft",
      location: "Boston, USA",
      sift: "Part time",
      salary: "$30,000 - $55,000",
      applicants: "9+",
      logo: "companiesLogo/microsoft.svg",
    },
    {
      title: "Data Scientist",
      company: "Amazon",
      location: "Seattle, USA",
      sift: "Full time",
      salary: "$80,000 - $120,000",
      applicants: "25+",
      logo: "companiesLogo/amazon.svg",
    },
    {
      title: "Backend Developer",
      company: "Facebook",
      location: "Menlo Park, USA",
      sift: "Full time",
      salary: "$90,000 - $140,000",
      applicants: "15+",
      logo: "companiesLogo/facebook.svg",
    },
    {
      title: "IT Support Engineer",
      company: "Wipro",
      location: "Mumbai, India",
      sift: "Full time",
      salary: "22,000 INR - 30,000 INR",
      applicants: "50+",
      logo: "companiesLogo/wipro.svg",
    },
    {
      title: "Blockchain Developer",
      company: "Coinbase",
      location: "San Francisco, USA",
      sift: "Remote",
      salary: "$100,000 - $150,000",
      applicants: "20+",
      logo: "companiesLogo/coinbase.svg",
    },
    {
      title: "Full Stack Developer",
      company: "TCS",
      location: "Hyderabad, India",
      sift: "Full time",
      salary: "40,000 INR - 60,000 INR",
      applicants: "70+",
      logo: "companiesLogo/tcs.svg",
    },
    {
      title: "Project Manager",
      company: "Accenture",
      location: "London, UK",
      sift: "Contract",
      salary: "£50,000 - £75,000",
      applicants: "12+",
      logo: "companiesLogo/accenture.svg",
    },
    {
      title: "AI Engineer",
      company: "Tesla",
      location: "Austin, USA",
      sift: "Full time",
      salary: "$150,000 - $200,000",
      applicants: "8+",
      logo: "companiesLogo/tesla.svg",
    },
    {
      title: "Digital Marketing Specialist",
      company: "Adobe",
      location: "San Jose, USA",
      sift: "Full time",
      salary: "$60,000 - $90,000",
      applicants: "30+",
      logo: "companiesLogo/adobe.svg",
    },
    {
      title: "Cybersecurity Analyst",
      company: "Cisco",
      location: "San Francisco, USA",
      sift: "Full time",
      salary: "$80,000 - $120,000",
      applicants: "10+",
      logo: "companiesLogo/cisco.svg",
    },
    {
      title: "Content Writer",
      company: "Zoho",
      location: "Chennai, India",
      sift: "Full time",
      salary: "15,000 INR - 25,000 INR",
      applicants: "40+",
      logo: "companiesLogo/zoho.svg",
    },
  ];

  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleSearch = () => {
    const filtered = jobs.filter((job) => {
      const matchesTitle = job.title
        .toLowerCase()
        .includes(jobTitle.toLowerCase());
      const matchesLocation = job.location
        .toLowerCase()
        .includes(location.toLowerCase());
      const matchesExperience =
        !experience || job.experience === parseInt(experience); // Experience filter logic
      return matchesTitle && matchesLocation && matchesExperience;
    });
    setFilteredJobs(filtered);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    let sortedJobs = [...filteredJobs];

    switch (e.target.value) {
      case "popular":
        // You can implement your logic for popularity if needed
        break;
      case "recent":
        // Assuming you add a 'date' property to jobs, sort by date
        // sortedJobs.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "salary_high":
        sortedJobs.sort((a, b) => {
          const salaryA = parseInt(a.salary.split(" ")[0].replace(/,/g, "")); // Get the minimum salary
          const salaryB = parseInt(b.salary.split(" ")[0].replace(/,/g, ""));
          return salaryB - salaryA; // Sort descending
        });
        break;
      case "salary_low":
        sortedJobs.sort((a, b) => {
          const salaryA = parseInt(a.salary.split(" ")[0].replace(/,/g, "")); // Get the minimum salary
          const salaryB = parseInt(b.salary.split(" ")[0].replace(/,/g, ""));
          return salaryA - salaryB; // Sort ascending
        });
        break;
      case "applicants":
        sortedJobs.sort((a, b) => {
          const applicantsA = parseInt(a.applicants.replace("+", ""));
          const applicantsB = parseInt(b.applicants.replace("+", ""));
          return applicantsB - applicantsA; // Sort descending
        });
        break;
      case "location":
        sortedJobs.sort((a, b) => a.location.localeCompare(b.location)); // Sort by location alphabetically
        break;
      default:
        break;
    }

    setFilteredJobs(sortedJobs);
  };

  return (
    <div className="container mx-auto px-14 py-8 bg-purple-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 dark:text-white">Job Search</h1>
      <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
        Search for your desired job matching your skills
      </p>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-8">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <label className="sr-only" htmlFor="job-title">
              Enter Job title
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                id="job-title"
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Enter Job title"
                className="w-full pl-10 pr-4 py-2 rounded-md border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-200 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        
          <div className="flex-1">
            <label className="sr-only" htmlFor="location">
              Enter location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                className="w-full pl-10 pr-4 py-2 rounded-md border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-200 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          <div className="flex-1">
            <label className="sr-only" htmlFor="experience">
              Years of experience
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                id="experience"
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Years of experience"
                className="w-full pl-10 pr-4 py-2 rounded-md border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-200 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors dark:bg-purple-500 dark:hover:bg-purple-600"
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Filter</h2>
          <JobSearchFilters
          setExperience={setExperience}
          setSortOption={setSortOption}
          handleSearch={handleSearch}
        />
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
              <option value="applicants">Most Applicants</option>
              <option value="location">Location</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => <JobCard key={index} {...job} />)
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                No jobs found matching your criteria.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
