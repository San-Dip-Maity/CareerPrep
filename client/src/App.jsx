import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Employers } from "./pages/Employers";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./context/ThemeContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import JobSearch from "./pages/JobSearch";
import Contact from "./pages/Contact";
import { RingLoader } from "react-spinners";
import Dashboard from "./pages/interview/Dashboard";


const Layout = () => {
  return (
    <div className="bg-purple-50 dark:bg-gray-900 min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

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
        path: "/mockInterview/Dashboard",
        element: <Dashboard />,
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

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer); 
  });

  return (
    <>
      <ThemeProvider>
        {loading ? (
          <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <RingLoader color="#7d02e1" loading={loading} size={100} />
          </div>
        ) : (
          <RouterProvider router={router} />
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
