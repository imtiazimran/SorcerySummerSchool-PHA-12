import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import GoogleLoginButton from "./GoogleLogin";


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <div className="hero min-h-screen bg-slate-100">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <img src="https://i.ibb.co/BZ5pHz2/Authentication-rafiki.png" alt=""/>
                </div>
                <div className="card flex-shrink-0  max-w-sm w-1/2 shadow-2xl pb-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("login", { required: true })} type="text" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", { required: true })} type="text" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                            <input type="submit" value="Login" className="btn btn-primary" />
                            </div>
                        </div>
                        <Link className="text-emerald-300 mx-3" to="/signup">Are You New Here? <button className=" btn-link">Login</button></Link>
                        <div className="divider">OR</div>
                        <GoogleLoginButton></GoogleLoginButton>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;