import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, User, LogOut, Save } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, setTheme, detectSystemTheme } from "../redux/themeSlice";
import { logout, clearAllUserErrors } from "../redux/authSlice";
import { toast } from "react-hot-toast";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
    navigate("/");
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
  }, [dispatch, error, loading, isAuthenticated]);

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      dispatch(setTheme(savedTheme === "dark"));
    } else {
      dispatch(detectSystemTheme());
    }

    const systemThemeListener = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    systemThemeListener.addEventListener("change", (e) => {
      dispatch(setTheme(e.matches));
    });

    return () => {
      systemThemeListener.removeEventListener("change", (e) => {
        dispatch(setTheme(e.matches));
      });
    };
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleViewProfile = () => {
    if (user && user.id) {
      navigate(`/profile/${user.id}`);
    } else {
      navigate("/profile");
    }
    setIsUserMenuOpen(false);
  };

  const showCompanies = () => {
    if (user && user.role === "recruiter") {
      navigate(`/company/${user.id}`);
    } else {
      toast.error("Only admins can view companies.");
    }
    setIsMenuOpen(false);
  };

  const handaleSavedJobs = () => {
    if (user && user.id) {
      navigate(`/savedJobs/${user.id}`);
    } else {
      navigate("/savedJobs");
    }
    setIsUserMenuOpen(false);
  };

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
              src={
                isDarkMode
                  ? "https://res.cloudinary.com/dvodvtbqr/image/upload/v1728742692/logo-light_xysuxm.png"
                  : "https://res.cloudinary.com/dvodvtbqr/image/upload/v1728742684/logo-dark_sgs0e3.png"
              }
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
              {isAuthenticated && user && user.role === "student" && (
                <>
                  {" "}
                  <NavLink
                    to="/mockInterview"
                    className={({ isActive }) =>
                      isActive
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                    }
                    onClick={toggleMenu}
                  >
                    Mock Interview
                  </NavLink>
                </>
              )}
              {user && user.role === "recruiter" && (
                <>
                  <NavLink
                    to="/employers"
                    className={({ isActive }) =>
                      isActive
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                    }
                  >
                    Post Job
                  </NavLink>
                  <NavLink
                    to={`/company/${user.id}`}
                    onClick={showCompanies}
                    className={({ isActive }) =>
                      isActive
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                    }
                  >
                    Company
                  </NavLink>
                  <NavLink
                    to={`/applications`}
                    className={({ isActive }) =>
                      isActive
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                    }
                  >
                    Applications
                  </NavLink>
                </>
              )}
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
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                }
              >
                Contact Us
              </NavLink>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user && (
              <Link
                to={`/savedjobs/${user.id}`}
                onClick={handaleSavedJobs}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Save size={22} className="text-gray-600 dark:text-gray-300" />
              </Link>
            )}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isDarkMode ? (
                <Sun size={20} className="text-gray-200" />
              ) : (
                <Moon size={20} className="text-gray-800" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white"
                >
                  {user?.profilePhoto ? (
                    <img
                      src={user.profilePhoto}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover hover:shadow-xl border-solid border-2 border-purple-600"
                    />
                  ) : (
                    <User size={20} />
                  )}
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1">
                    <button
                      onClick={handleViewProfile}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <User size={16} className="mr-2" />
                      View Profile
                    </button>
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
              <div className="flex items-center justify-center gap-3">
                <Link to="/login">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600">
                    SignUp
                  </button>
                </Link>
              </div>
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
                {isAuthenticated && user && user.role === "student" && (
                  <>
                    {" "}
                    <NavLink
                      to="/mockInterview"
                      className={({ isActive }) =>
                        isActive
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                      }
                      onClick={toggleMenu}
                    >
                      Mock Interview
                    </NavLink>
                  </>
                )}
                {user && user.role === "recruiter" && (
                  <>
                    <NavLink
                      to="/employers"
                      onClick={toggleMenu}
                      className={({ isActive }) =>
                        isActive
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                      }
                    >
                      Employers
                    </NavLink>
                    <NavLink
                      to={`/company/${user.id}`}
                      onClick={showCompanies}
                      className={({ isActive }) =>
                        isActive
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                      }
                    >
                      Company
                    </NavLink>
                  </>
                )}
                <NavLink
                  to="/about"
                  className="text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                  onClick={toggleMenu}
                >
                  About Us
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                  }
                >
                  Contact Us
                </NavLink>
                <button
                  onClick={() => {
                    dispatch(toggleTheme());
                    toggleMenu();
                  }}
                  className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                </button>

                {isAuthenticated ? (
                  <>
                    <button
                    onClick={handaleSavedJobs}
                    className="flex items-center text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400">
                      <Save size={16} className="mr-2" />
                      Saved Jobs
                    </button>
                    <button
                      onClick={() => {
                        handleViewProfile();
                        toggleMenu();
                      }}
                      className="flex items-center text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      <User size={16} className="mr-2" />
                      View Profile
                    </button>
                    <button
                      className="flex items-center text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                      onClick={() => {
                        logoutHandler();
                        toggleMenu();
                      }}
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex items-center justify-center gap-6">
                    <Link to="/login">
                      <button
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
                        onClick={toggleMenu}
                      >
                        Login
                      </button>
                    </Link>
                    <Link to="/signup">
                      <button
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
                        onClick={toggleMenu}
                      >
                        SignUp
                      </button>
                    </Link>
                  </div>
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
