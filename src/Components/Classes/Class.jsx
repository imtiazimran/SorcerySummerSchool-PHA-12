
import axios from 'axios';
import useClass from '../Hooks/useClass';
import Title from '../Shared/Title';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../Authorization/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTitle } from '../Hooks/useTitle';

const Classes = () => {
    useTitle("SSS |  CLASSES")
    const [isLoading, isError, classes, error, refetch] = useClass()
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const from = useLocation()
    if (isLoading) {
        return <div className='w-full  h-screen  flex justify-center items-center'><span className="loading loading-bars loading-lg"></span></div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }


    const handleCart = (item) => {
        if (user) {
            const cartItem = {
                user: user.email,
                name: item.name,
                instructor: item.instructorName,
                price: item.price,
                classId: item._id,
            };
console.log(item)
            axios.post('http://localhost:4214/cart', cartItem)
                .then((res) => {
                    if (res.data.insertedId) {
                        refetch()
                        Swal.fire({
                            icon: 'success',
                            title: 'Item added to cart!',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                    console.log(res.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        else {// Set the from state to '/classes'
            Swal.fire({
                icon: 'error',
                title: 'User not found',
                text: 'Please login to add items to the cart.',
                confirmButtonText: 'Login',
            })
            .then(() => {
                navigate('/login', { state: { from } });
            });
        }
    };


    return (
        <div>
            <Title title={"popular classes"} subtitle={"so much to learn but we have the best classes among all, see our popular classes"}></Title>
            <div className='bg-gray-100 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center md:py-11 gap-3'>
                { 
                    classes.filter((item)=> item.status !== "pending").map((item) => (

                    <div key={item._id} className={`card w-96 p-4 shadow-xl ${item.availableSeats === 0 ? 'border-red-500 border shadow-red-500' : ' shadow-green-500 '
                        }`}>
                        
                        <figure>
                            <div className='h-[250px]'>
                                <img
                                    className='w-full h-full'
                                    src={item.image}
                                />
                            </div>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{item.name}!</h2>
                            <p>Details: {item.tutorialDescription}</p>
                            <p>Instructor: <span className='text-xl'>{item.instructorName}</span></p>
                            <p>Available Seats: <span className='text-xl'>{item.availableSeats}</span></p>
                            <p>Price: <span className='text-xl text-orange-500'>${item.price}</span></p>
                            <div className="card-actions justify-end">
                            {/**TODO: MAKE THE BUTTON DISABLE FOR ADMIN AND FOR INSTRUCTORS */}
                                <button disabled={item.availableSeats === 0} onClick={() => handleCart(item)} className="btn btn-primary">Add To Cart</button>
                            </div>
                            <ul>

                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Classes;
