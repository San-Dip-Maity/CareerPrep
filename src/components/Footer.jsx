import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-white dark:bg-gray-800  py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img
                src="logo.png"
                alt="CareerPrep Logo"
                className="h-6 mb-4"
              />
              <p className="text-sm text-gray-600 dark:text-gray-300">Call now: +91 7908729570</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                456 Chandni Chowk Street, Near Red Fort, Old Delhi, New Delhi,
                Delhi 110006, India
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Quick Links</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <li>
                  <Link to="/about" className="hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/mock-interview" className="hover:underline">
                    Mock Interview
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Candidate</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <li>
                  <Link to="/browse-jobs" className="hover:underline">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse-employers" className="hover:underline">
                    Browse Employers
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:underline">
                    Candidate Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/saved-jobs" className="hover:underline">
                    Saved Jobs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Employers</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <li>
                  <Link to="/post-job" className="hover:underline">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link to="/browse-candidates" className="hover:underline">
                    Browse Candidates
                  </Link>
                </li>
                <li>
                  <Link to="/employer-dashboard" className="hover:underline">
                    Employers Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/applications" className="hover:underline">
                    Applications
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300">
            <p>© 2022 CareerPrep - Job Portal. All Rights Reserved</p>
            <div className="mt-4 space-x-4">
              <Link to="/facebook" className="hover:text-purple-600">Facebook</Link>
              <Link to="/youtube" className="hover:text-purple-600">YouTube</Link>
              <Link to="/instagram" className="hover:text-purple-600">Instagram</Link>
              <Link to="/twitter" className="hover:text-purple-600">Twitter</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
