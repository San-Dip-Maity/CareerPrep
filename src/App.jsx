import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import { Employers } from "./pages/Employers";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./context/ThemeContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

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
        path: "/jobs",
        element: <Jobs />,
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
  return (
    <>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
