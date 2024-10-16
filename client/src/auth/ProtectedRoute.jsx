import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {

        if (isAuth === null) return null;
        return isAuth ? children : <Navigate to="/login" />;
};
export default ProtectedRoute;