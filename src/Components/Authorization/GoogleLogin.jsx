
import { useContext } from 'react';// Replace with your actual auth context
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
    const { googleLogin } = useContext(AuthContext);

    const navigate = useNavigate()

    // Callback function called on successful login
    const handleSuccess = async () => {
        googleLogin()
        .then(res =>{
            const user = res.user;
            console.log(user)
            navigate('/')
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
