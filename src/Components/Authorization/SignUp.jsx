import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from "./GoogleLogin";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./../../App.css"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from "axios";
import Swal from "sweetalert2";


const SignUp = () => {

    const [passwordVisible, setPasswordVisible] = useState(false);

    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signUp } = useContext(AuthContext)
    const onSubmit = data => {
        if (data.password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        if (!/[A-Z]/.test(data.password)) {
            toast.error('Password must contain at least one capital letter');
            return;
        }

        if (!/[!@#$%^&*]/.test(data.password)) {
            toast.error('Password must contain at least one special character');
            return;
        }




        signUp(data.email, data.password)
            .then(res => {
                const loggeduser = res.user;
                const user = { name: data.name, email: loggeduser.email, image: data.photo }
                Swal.fire({
                    icon: 'success',
                    title: 'Login Success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                axios.post('http://localhost:4214/user', user)
                .then(res => {
                        navigate('/')
                        console.log(res.data)
                    })
            })
            .catch(err => console.log(err));

    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const getToggleIcon = () => {
        return passwordVisible ? <FaEyeSlash /> : <FaEye />;
    };


    return (
        <div className="hero min-h-screen bg-green-100">
            <ToastContainer />
            <div className="hero-content flex-col md:flex-row ">
                <div className="hidden lg:block text-center w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Register Now!</h1>
                    <img src="https://i.ibb.co/BZ5pHz2/Authentication-rafiki.png" alt="" />
                </div>
                <div className="card flex-shrink-0  max-w-sm lg:w-1/2 shadow-2xl bg-emerald-100">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-stone-900 label-text">Name</span>
                                </label>
                                <input {...register("name", { required: true })} type="text" placeholder="Name" className="input bg-white input-bordered" />

                                {errors.name && <span className="text-red-600 pt-1">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-stone-900 label-text">Photo URL</span>
                                </label>
                                <input {...register("photo", { required: true })} type="text" placeholder="Photo URL" className="input bg-white input-bordered" />
                                {errors.photo && <span className="text-red-600 pt-1">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-stone-900 label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="text" placeholder="email" className="input bg-white input-bordered" />
                                {errors.email && <span className="text-red-600 pt-1">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-stone-900 label-text">Password</span>
                                </label>
                                <input {...register("password", { required: true })} type={passwordVisible ? "text" : "password"} placeholder="password" className="input bg-white input-bordered" />
                                {errors.password && <span className="text-red-600 pt-1">This field is required</span>}

                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="text-stone-900 label-text">Confirm Password</span>
                                </label>
                                <input {...register("confirmPassword", { required: true })} type={passwordVisible ? "text" : "password"} placeholder="confirm password" className="input bg-white input-bordered" />
                                <span className="input-icon translate-y-3/4" onClick={togglePasswordVisibility}>
                                    {getToggleIcon()}
                                </span>
                                {errors.confirmPassword && <span className="text-red-600 pt-1">This field is required</span>}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Create Acount" />
                            </div>
                        </div>
                        <Link className="text-yellow-700 mx-3" to="/login">Already Have An account? <button className=" btn-link">Login</button></Link>
                        <div className="divider">OR</div>
                        <GoogleLoginButton></GoogleLoginButton>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;