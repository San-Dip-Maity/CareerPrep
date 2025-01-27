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
import ProtectedRoute from "./components/ProtectedRoute";
import CompanyCreate from "./components/Admin/CompanyCreate";
import Companies from "./pages/Companies";
import CompanyEdit from "./components/Admin/CompanyEdit";
import JobDetails from "./components/JobDetails";
import SavedJobs from "./pages/SavedJobs";
import Applications from "./components/Admin/Applications";

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
  }, [loading, dispatch]);

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
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile/:id",
          element: (
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/company",
          element: (
            <ProtectedRoute allowedRoles={['recruiter']}>
              <CompanyCreate />
            </ProtectedRoute>
          ),
        },
        {
          path: "/company/:id",
          element: (
            <ProtectedRoute allowedRoles={['recruiter']}>
              <Companies />
            </ProtectedRoute>
          ),
        },
        {
          path: "/company/edit/:id", 
          element :(
            <ProtectedRoute allowedRoles={['recruiter']}>
              <CompanyEdit />
            </ProtectedRoute>
          )
        },
        {
          path: "/jobsearch",
          element: (
            <ProtectedRoute>
              <JobSearch />
            </ProtectedRoute>
          ),
        },
        {
          path: "/jobsearch/jobDetails/:id",
          element: (
            <ProtectedRoute>
              <JobDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/savedJobs/:id",
          element: (
            <ProtectedRoute >
              <SavedJobs />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Employers",
          element: (
            <ProtectedRoute allowedRoles={['recruiter']}>
              <Employers />
            </ProtectedRoute>
          ),
        },
        {
          path: "/applications",
          element: (
            <ProtectedRoute allowedRoles={['recruiter']}>
              <Applications />
            </ProtectedRoute>
          ),
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
            <ProtectedRoute allowedRoles={['student']}>
              <MockInterview />
            </ProtectedRoute>
          ),
        },
        {
          path: "/mockInterview/dashboard",
          element: (
            <ProtectedRoute allowedRoles={['student']}>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/mockInterview/startInterview",
          element: (
            <ProtectedRoute allowedRoles={['student']}>
              <StartInterview />
            </ProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: <LoginPage />,
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
