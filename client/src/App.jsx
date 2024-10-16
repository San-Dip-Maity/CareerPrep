import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Employers } from "./pages/Employers";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import JobSearch from "./pages/JobSearch";
import Contact from "./pages/Contact";
import { RingLoader } from "react-spinners";
import MockInterview from "./pages/MockInterview";
import Dashboard from "./pages/interview/Dashboard";
import StartInterview from "./pages/interview/StartInterview";
import UserProfile from "./pages/UserProfile";
import Profile from "./pages/Profile";
import {Toaster} from "react-hot-toast";


const Layout = () => {
  return (
    <div className="bg-purple-50 dark:bg-gray-900 min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

// ProtectedRoute component to restrict access to authenticated users
const ProtectedRoute = ({ isAuth, children }) => {
  if (isAuth === null) return null; // Still checking auth state
  return isAuth ? children : <Navigate to="/login" />;
};

const App = () => {
  const [isAuth, setAuth] = useState(null); // Authentication state
  const [loading, setLoading] = useState(true);

  // Simulate authentication check
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if the user is authenticated (can be from localStorage or API call)
      const storedAuth = localStorage.getItem("isAuth"); // Example: stored auth state
      setAuth(storedAuth === "true"); // Assuming the auth state is saved as a boolean string
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute isAuth={isAuth}>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile/:id",
          element: (
            <ProtectedRoute isAuth={isAuth}>
              <UserProfile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/jobsearch",
          element: (
            <ProtectedRoute isAuth={isAuth}>
              <JobSearch />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Employers",
          element: <Employers />,
        },
        {
          path: "/About",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/mockInterview",
          element: (
            <ProtectedRoute isAuth={isAuth}>
              <MockInterview />
            </ProtectedRoute>
          ),
        },
        {
          path: "/mockInterview/dashboard",
          element: (
            <ProtectedRoute isAuth={isAuth}>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/mockInterview/startInterview",
          element: (
            <ProtectedRoute isAuth={isAuth}>
              <StartInterview />
            </ProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: <LoginPage setAuth={setAuth} />, // Pass setAuth to handle login
        },
        {
          path: "/signup",
          element: <SignupPage />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
          <RingLoader color="#7d02e1" loading={loading} size={100} />
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
      <Toaster position="top-right" />
    </>
  );
};

export default App;
