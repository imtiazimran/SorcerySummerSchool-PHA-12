/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const PrivetRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
        if (user) {
            // Redirect to the page
            return children;
        }

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    return <Navigate to="/login"></Navigate>;
};

export default PrivetRoute;
