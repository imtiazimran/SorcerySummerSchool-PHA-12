import { useContext } from "react";
import { AuthContext } from "../Authorization/AuthProvider";
import SelectedClass from "./UserDashboard/SelectedClass";
import { Link } from "react-router-dom";


const Dashboard = () => {
    const {user} = useContext(AuthContext)
    return (
        <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            
            
            {/* admin dashboard */}
            {
                user.role  === "admin" && <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                        <h1 className="text-xl font-bold">select your routes</h1>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <Link to="/selected class">Selected Class</Link>
                        <Link to="/enrolledClass">Enrolled Class</Link>
                    </ul>
                
                </div>
                </div>
            }
            {/* normal user content */}
            {
                user && <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                
                    <SelectedClass></SelectedClass>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <Link to="/selected class">Selected Class</Link>
                        <Link>Enrolled Class</Link>
                    </ul>
                
                </div>
                </div>
            }
            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

        </div>
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}
                <Link to="/selected class">Selected Class</Link>
                <Link>Enrolled Class</Link>
            </ul>

        </div>
    </div>
    );
};

export default Dashboard;