
import { useContext } from 'react';// Replace with your actual auth context
import { AuthContext } from './AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const GoogleLoginButton = () => {
    const { googleLogin } = useContext(AuthContext);
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"
console.log(from)
    const navigate = useNavigate()

    // Callback function called on successful login
    const handleSuccess = async () => {
        googleLogin()
        .then(res =>{
            const loggeduser = res.user;
            const user = {name: loggeduser.displayName, email: loggeduser.email, image: loggeduser.imgURL}
            Swal.fire({
                icon: 'success',
                title: 'Login Success',
                showConfirmButton: false,
                timer: 1000,
            });
            axios.post('https://summer-camp-server-weld.vercel.app/user', user )
                .then(res =>{
                    console.log(res.data)
                })
            navigate(from)
        })
        .catch(err =>console.log(err))
    };

    // Callback function called on failed login


    return (
        <div className='flex items-center justify-center py-3'>
            <button
                onClick={handleSuccess}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Sign in with Google
            </button>
        </div>
    );
};

export default GoogleLoginButton;
