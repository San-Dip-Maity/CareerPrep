import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, User, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeContext from "../context/ThemeContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // You'll need to implement actual auth state management
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleLogout = () => {
    // Implement your logout logic here
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
    navigate("/");
  };

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
      window.removeEventListener("scroll", handleScroll);
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
          <Link to="/">
            <img
              src={isDarkMode ? "logo-light.png" : "logo-dark.png"}
              alt="CareerPrep Logo"
              className="h-6"
            />
          </Link>
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
                to="/jobsearch"
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
                to="/mockInterview/Dashboard"
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
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white"
                >
                  <User size={20} />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User size={16} className="mr-2" />
                      View Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600">
                <Link to="/login">Login</Link>
              </button>
            )}
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
                  to="/jobsearch"
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
                  to="/mockInterview/Dashboard"
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
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                      onClick={toggleMenu}
                    >
                      <User size={16} className="mr-2" />
                      View Profile
                    </Link>
                    <button
                      className="flex items-center text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
                    onClick={toggleMenu}
                  >
                    <Link to="/login">Login</Link>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
