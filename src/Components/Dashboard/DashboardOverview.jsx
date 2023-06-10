import { useContext } from "react";
import { AuthContext } from "../Authorization/AuthProvider";


const DashboardOverview = () => {
    const {user} = useContext(AuthContext)
    // TODO: make the admin dynamic 
    // const user = true
    return (
        <div>
            {
                user.role === "admin" && 
                    <h3 className="text-xl">welcome Mr.Admin</h3>
                
            }
            {
                user.role === "instructors" && 
                <h3 className="text-xl">Welcome Mr.Instructor</h3>
            }
            {
                user && user.role ||
                <h3 className="text-xl">Welcome Back {user.displayName}</h3>
            }

        </div>
    );
};

export default DashboardOverview;