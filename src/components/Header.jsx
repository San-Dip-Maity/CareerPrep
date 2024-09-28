import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeContext from "../context/ThemeContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);;


  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll)
    };
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-10 transition-all duration-300 px-10 ${
          isScrolled
            ? "bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-md"
            : "bg-white dark:bg-gray-800"
        }`}
      >
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <img 
            src={isDarkMode ? "logo-light.png" : "logo-dark.png"} 
            alt="CareerPrep Logo" 
            className="h-6"
          />
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/jobs"
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                }
              >
                Find Jobs
              </NavLink>
              <NavLink
                to="/Employers"
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                }
              >
                Employers
              </NavLink>
              <NavLink
                to="/MockInterview"
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                }
              >
                Mock Interview
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                }
              >
                About Us
              </NavLink>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isDarkMode ? (
                <Sun size={20} className="text-gray-200" />
              ) : (
                <Moon size={20} className="text-gray-800" />
              )}
            </button>

            <button className="text-purple-600 dark:text-purple-400 border border-purple-600 dark:border-purple-400 px-4 py-2 rounded hover:bg-purple-600 hover:text-white dark:hover:bg-purple-500 dark:hover:text-white">
              Contact Us
            </button>
            <button href="/login" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600">
              <Link to='/login'>Login</Link>
            </button>
          </div>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X size={24} className="text-gray-800 dark:text-gray-200" />
            ) : (
              <Menu size={24} className="text-gray-800 dark:text-gray-200" />
            )}
          </button>
        </nav>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-md"
            >
              <div className="flex flex-col space-y-4 p-4 mt-16">
                <Link
                  to="/"
                  className="text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
                <Link
                  to="/jobs"
                  className="text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                  onClick={toggleMenu}
                >
                  Find Jobs
                </Link>
                <Link
                  to="/employers"
                  className="text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                  onClick={toggleMenu}
                >
                  Employers
                </Link>
                <Link
                  to="/mockinterview"
                  className="text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                  onClick={toggleMenu}
                >
                  Mock Interview
                </Link>
                <Link
                  to="/about"
                  className="text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                  onClick={toggleMenu}
                >
                  About Us
                </Link>
                <button
                  onClick={() => {
                    toggleDarkMode();
                    toggleMenu();
                  }}
                  className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                </button>
                <button 
                  className="text-purple-600 dark:text-purple-400 border border-purple-600 dark:border-purple-400 px-4 py-2 rounded hover:bg-purple-600 hover:text-white dark:hover:bg-purple-500"
                  onClick={toggleMenu}
                >
                  Contact Us
                </button>
                <button 
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
                  onClick={toggleMenu}
                >
                  Login
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;