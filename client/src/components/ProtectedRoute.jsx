import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user); // Use isAuthenticated to check auth status

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;