const ProtectedRoute = ({children}) => {

        if (isAuth === null) return null;
        return isAuth ? children : <Navigate to="/login" />;
};
export default ProtectedRoute;