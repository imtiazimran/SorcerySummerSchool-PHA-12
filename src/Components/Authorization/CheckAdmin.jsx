/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import useUserRole from "../Hooks/useUserRole";
import { Navigate } from "react-router-dom";


const CheckAdmin = ({children}) => {
    const {user} = useContext(AuthContext)

    const {userRole} = useUserRole()

    if(user && userRole.role === "admin" ){
        return children
    }

    return <Navigate to="/"></Navigate>
};

export default CheckAdmin;