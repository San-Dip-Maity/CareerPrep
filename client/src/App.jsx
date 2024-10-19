import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
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
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getUser } from "./redux/authSlice";

const Layout = () => {
  return (
    <div className="bg-purple-50 dark:bg-gray-900 min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getUser());
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
          element: <Profile />,
        },
        {
          path: "/profile/:id",
          element: <UserProfile />,
        },
        {
          path: "/jobsearch",
          element: <JobSearch />,
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
          element: <MockInterview />,
        },
        {
          path: "/mockInterview/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/mockInterview/startInterview",
          element: <StartInterview />,
        },
        {
          path: "/login",
          element: <LoginPage />, // Pass setAuth to handle login
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
      <Toaster position="bottom-right" />
    </>
  );
};

export default App;
