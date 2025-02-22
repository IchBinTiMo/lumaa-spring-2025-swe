import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { JSX } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    return useAuth() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
