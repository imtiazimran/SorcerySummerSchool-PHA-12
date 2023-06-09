import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import GoogleLoginButton from "./GoogleLogin";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";



const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {login} = useContext(AuthContext)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate()
    
    
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"
    
    const onSubmit = data => {
        login(data.email, data.password)
        .then(()=>{
            navigate(from)
            Swal.fire({
                icon: 'success',
                title: 'Item added to cart!',
                showConfirmButton: false,
                timer: 1500,
            });
        })
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const getToggleIcon = () => {
        return passwordVisible ? <FaEyeSlash /> : <FaEye />;
    };

    return (
        <div className="hero bg-slate-100">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center hidden lg:block w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <img src=" https://i.ibb.co/s6f3qpH/Forgot-password-rafiki.png" alt="" />
                </div>
                <div className="card flex-shrink-0  max-w-sm lg:w-1/2 shadow-2xl pb-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="text" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600 pt-1">This field is required</span>}
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", { required: true })} type={passwordVisible ? "text" : "password"} placeholder="password" className="input input-bordered" />
                                <span className="input-icon -translate-y-1/4" onClick={togglePasswordVisibility}>
                                    {getToggleIcon()}
                                </span>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value="Login" className="btn btn-primary" />
                            </div>
                        </div>
                        <Link className="text-emerald-300 mx-3" to="/signup">Are You New Here? <button className=" btn-link">Register</button></Link>
                        <div className="divider">OR</div>
                        <GoogleLoginButton></GoogleLoginButton>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;