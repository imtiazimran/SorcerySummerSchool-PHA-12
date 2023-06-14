import { useContext } from "react";
import { AuthContext } from "../Authorization/AuthProvider";
import useUserRole from "../Hooks/useUserRole";


const DashboardOverview = () => {
    const {user} = useContext(AuthContext)
    // TODO: make the admin dynamic 
        const {userRole} = useUserRole()
    return (
        <div>
            {
                userRole.role === "admin" && 
                    <h3 className="text-xl">welcome Mr.Admin</h3>
                
            }
            {
                userRole.role === "instructors" && 
                <h3 className="text-xl">Welcome Mr.Instructor</h3>
            }
            {
                user && !userRole &&
                <h3 className="text-xl">Welcome Back {user.displayName}</h3>
            }

        </div>
    );
};

export default DashboardOverview;