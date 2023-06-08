import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div className="hero min-h-screen bg-green-50">
            <div className="hero-content flex-col md:flex-row ">
                <div className="text-center w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0  max-w-sm w-1/2 shadow-2xl bg-emerald-400">
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
                                <input {...register("password", { required: true })} type="text" placeholder="password" className="input bg-white input-bordered" />
                                {errors.password && <span className="text-red-600 pt-1">This field is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-stone-900 label-text">Confirm Password</span>
                                </label>
                                <input {...register("confirmPassword", { required: true })} type="text" placeholder="confirm password" className="input bg-white input-bordered" />

                                {errors.confirmPassword && <span className="text-red-600 pt-1">This field is required</span>}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Create Acount" />
                            </div>
                        </div>
                        <Link className="text-yellow-700 mx-3" to="/login">Already Have An accound <button className=" btn-link">Login</button></Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;