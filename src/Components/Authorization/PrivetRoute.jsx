/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";


const PrivetRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)

    if (loading) {
        return <div className='w-full  h-screen  flex justify-center items-center'><span className="loading loading-bars loading-lg"></span></div>;
    }
    if(user){
        return children;
    }

    return <Navigate to="/login"></Navigate>;
};

export default PrivetRoute;