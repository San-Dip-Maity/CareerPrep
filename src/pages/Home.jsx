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
    <div className="bg-purple-50 dark:bg-gray-900 min-h-screen px-10">
      <main className="container mx-auto px-4 py-8">
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="pr-8">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 dark:text-white">
                  Find a job that aligns with your interests and skills
                </h1>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Thousands of jobs in all the leading sectors are waiting for
                you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
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
                <button className="w-full sm:w-auto bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors duration-300">
                  Find Job
                </button>
              </div>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Suggestion: UI/UX Designer, Programming, Digital Marketing,
                Video, Animation
              </div>
            </motion.div>
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <img
                src="hero1.png"
                alt="hero"
                className="h-[32rem] object-cover rounded-lg pl-24"
              />
            </motion.div>
          </div>
        </motion.section>

        <section className="mb-12">
          <div className="flex flex-col justify-center items-center mb-4 mt-10">
            <h2 className="text-2xl font-semibold dark:text-white">
              Featured Jobs
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
            Choose jobs from the top employers and apply for the same.
          </p>
          </div>
          

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <JobCard
               title="Technical Support Specialist"
               company="Google Inc."
               location="New Delhi, India"
               sift="Full time"
               salary="20,000 INR - 25,000 INR"
               applicants="10+"
               logo="companiesLogo/google.svg"
            />
            <JobCard
              title="Senior UI/UX Designer"
              company="Microsoft"
              location="Boston, USA"
              sift="Part time"
              salary="$30,000 - $55,000"
              applicants="9+"
              logo="companiesLogo/microsoft.svg"
            />
            <JobCard
              title="Marketing Officer"
              company="IBM Co"
              location="Bangalore, India"
              sift="Full time"
              salary="15,000 INR - 35,000 INR"
              applicants="30+"
              logo="companiesLogo/ibm.svg"
            />
          </div>

          <div className="text-center mt-8">
            <Link
              to="/jobsearch"
              className="text-purple-600 dark:text-purple-400 hover:underline"
            >
              View all
            </Link>
          </div>
        </section>

        <section className="mb-12">
        <div className="flex justify-between items-center mb-10">
            <hr className="w-[38%]" />
            <h2 className="text-2xl font-semibold dark:text-white">
            Top companies hiring now
            </h2>
            <hr className="w-[38%]"/>
          </div>
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
