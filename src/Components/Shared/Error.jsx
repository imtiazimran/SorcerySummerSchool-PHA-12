import { Link } from "react-router-dom";


const Error404 = () => {
    return (
        <div className="flex justify-center items-center text-center">
            <div className="w-3/4 mx-auto relative">
            <Link to="/"><p className="absolute bg-blue-700 px-3 py-2 rounded text-white top-1/2 left-1/2">Home</p></Link>
                <img src="https://i.ibb.co/MpvyQ96/undraw-Page-not-found-re-e9o6.png" alt="404 Error" />
                <p className="text-2xl text-rose-500 font-bold -m-16">The page you are looking for could not be found.</p>
            </div>
        </div>
    );
};

export default Error404;
