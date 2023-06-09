import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Authorization/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
   
    const handleLogOut = ()=>{
        logOut()
    }

    return (
        <div className="navbar bg-white px-10 h-11">
            <div className="navbar-start">
                <div className="dropdown">
                    <label
                        tabIndex={0}
                        className="btn bg-red-400 lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                </div>
                <Link to="/" className="normal-case text-xl">SorcerySummerSchool</Link>
            </div>
            <div className="navbar-center text-blue-700 font-semibold text-xl hidden lg:flex gap-3">
                <Link className="hover:text-blue-900 hover:bg-white md:px-3 rounded">Home</Link>
                <Link className="hover:text-blue-900 hover:bg-white px-3 rounded">Instructors</Link>
                <Link className="hover:text-blue-900 hover:bg-white px-3 rounded">Class</Link>
                <Link className="hover:text-blue-900 hover:bg-white px-3 rounded">Dashboard</Link>
            </div>
            <div className="navbar-end ">
                {user ? (
                    <div className="avatar flex gap-5">
                    <button onClick={handleLogOut} className="btn btn-outline btn-accent">Log Out</button>
                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user.photoURL} />
                        </div>
                    </div>
                ) : (
                    <Link to="/login">
                        <button className="btn btn-outline btn-accent">Login</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
