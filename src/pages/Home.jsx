import React, { useState } from "react";
import { motion } from "framer-motion";
import JobCard from "../components/JobCard";
import { Link } from "react-router-dom";

const CompanyLogo = ({ name }) => (
  <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded">
    <img
      src={`/companiesLogo/${name.toLowerCase()}.svg`}
      alt={`${name} logo`}
      className="h-8"
    />
  </div>
);

export default function Home() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="bg-purple-50 dark:bg-gray-900 min-h-screen pb-6">
      <main className="container mx-auto px-4 py-8">
        <motion.section
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4 dark:text-white">
            Find a job that aligns with your interests and skills
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Thousands of jobs in all the leading sectors are waiting for you.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              placeholder="Job title, Keyword..."
              className="w-full sm:w-64 p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full sm:w-64 p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button className="w-full sm:w-auto bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600">
              Find Job
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Suggestion: UI/UX Designer, Programming, Digital Marketing, Video,
            Animation
          </div>
        </motion.section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Featured Jobs</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Choose jobs from the top employers and apply for the same.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <JobCard
              title="Technical Support Specialist"
              company="Google Inc."
              location="New Delhi, India"
              type="PART-TIME"
              salary="Salary: 20,000 INR - 25,000 INR"
              applicants="10+"
            />
            <JobCard
              title="Senior UI/UX Designer"
              company="Apple"
              location="Boston, USA"
              type="FULL-TIME"
              salary="Salary: $30,000 - $55,000"
              applicants="9+"
            />
            <JobCard
              title="Marketing Officer"
              company="Intel Corp"
              location="Bangalore, India"
              type="PART-TIME"
              salary="Salary: 15,000 INR - 35,000 INR"
              applicants="30+"
            />
          </div>

          <div className="text-center mt-8">
            <Link to="#" className="text-purple-600 dark:text-purple-400 hover:underline">
              View all
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-8 dark:text-white">
            Top companies hiring now
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <CompanyLogo name="Google" />
            <CompanyLogo name="Microsoft" />
            <CompanyLogo name="Flipkart" />
            <CompanyLogo name="YouTube" />
            <CompanyLogo name="IBM" />
          </div>
        </section>
      </main>
    </div>
  );
}