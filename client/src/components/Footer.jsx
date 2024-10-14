import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Facebook, Youtube, Instagram, Twitter } from "lucide-react";
import { useSelector } from "react-redux";



const Footer = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <>
      <footer className="bg-white dark:bg-gray-800  py-8 px-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img
                src={isDarkMode ? "https://res.cloudinary.com/dvodvtbqr/image/upload/v1728742692/logo-light_xysuxm.png" : "https://res.cloudinary.com/dvodvtbqr/image/upload/v1728742684/logo-dark_sgs0e3.png"}
                alt="CareerPrep Logo"
                className="h-6"
              />
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">
                Call now: +91 7908729570
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Kolkata, West Bengal, India - 700144
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Quick Links
              </h3>
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
                  <Link to="/mockinterview" className="hover:underline">
                    Mock Interview
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Candidate
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
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
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Employers
              </h3>
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
          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300 flex flex-col items-center justify-center gap-5">
            <div className="mt-4 space-x-4 flex justify-end items-center text-gray-600 dark:text-gray-300">
              <Link to="/facebook" className="hover:text-purple-600">
                <Facebook />
              </Link>
              <Link to="/youtube" className="hover:text-purple-600">
                <Youtube />
              </Link>
              <Link to="/instagram" className="hover:text-purple-600">
                <Instagram />
              </Link>
              <Link to="/twitter" className="hover:text-purple-600">
                <Twitter />
              </Link>
            </div>
            <p>© 2024 CareerPrep - Job Portal. All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
