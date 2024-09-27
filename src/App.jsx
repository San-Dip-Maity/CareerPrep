import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import { Employers } from "./pages/Employers";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const Layout = () => {
  return (
    <div>
     <Header/>
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
        path: "*",
        element: <NotFound />,
      }
    ],
  },
]);


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
