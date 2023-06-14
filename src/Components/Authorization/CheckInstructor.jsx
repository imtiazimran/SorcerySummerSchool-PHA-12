/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useUserRole from "../Hooks/useUserRole";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";


const CheckInstructor = ({children}) => {
    const {user} = useContext(AuthContext)

    const {userRole} = useUserRole()

    if(user && userRole.role === "instructor" ){
        return children
    }

    return <Navigate to="/"></Navigate>
};

export default CheckInstructor;