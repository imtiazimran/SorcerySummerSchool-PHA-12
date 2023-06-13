import { Link, Outlet } from "react-router-dom";
import Navbar from "../../Components/Shared/Navbar"

const user = {role: "admin"}

const Dashboard = () => {
    // TODO: make user dynamically admin or instructor or normall use
    return (
        <div>
        <Navbar></Navbar>
            <div >
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-center justify-center">

                        {/* Page content here */}


                        <Outlet></Outlet>

                    </div>
                    <div className="drawer-side ">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 h-full bg-blue-600 text-white text-2xl">
                            {/* Sidebar content here */}
                            {
                                user.role === "admin" &&
                                <div>
                                    <li><Link to="manageClass">Manage Classes</Link></li>
                                    <li><Link to="manageUsers">Manage Users</Link></li>
                                </div>
                            }
                            {
                                user.role === "instructor" &&
                                <div>
                                    <li><Link to="addClass">Add Class</Link></li>
                                    <li><Link to="myClass">My Classes</Link></li>
                                </div>
                            }

                            {
                                user.role ||
                                <div>
                                    <li><Link to="selectedClass">My Selected Items</Link></li>
                                    <li><Link to="enrolledClass">My Enrolled Class</Link></li>
                                </div>
                            }

                            <div className="divider"></div>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/instructors">Instructors</Link></li>
                            <li><Link to="/class">Class</Link></li>
                        </ul>
                    </div>
                </div>




            </div>
        </div>
    );
};

export default Dashboard;