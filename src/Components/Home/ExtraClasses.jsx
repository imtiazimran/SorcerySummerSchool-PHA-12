import axios from 'axios';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Title from '../Shared/Title';
import useUserRole from '../Hooks/useUserRole';
import Swal from 'sweetalert2';
import { AuthContext } from '../Authorization/AuthProvider';

const ExtraClasses = () => {
    const [extraClasses, setExtraClasses] = useState([])

    const { user } = useContext(AuthContext);
    const { userRole } = useUserRole()

    useEffect(() => {
        axios.get("https://summer-camp-server-weld.vercel.app/extraClasses")
            .then((res) => {
                setExtraClasses(res.data);
            })
            .catch((error) => {
                console.error("Error fetching reviews: ", error);
            });
    }, []);

    const handleCart = (item) => {
        if (user) {
            const cartItem = {
                user: user.email,
                name: item.name,
                instructor: item.instructorName,
                price: item.price,
                classId: item._id,
            };
            axios.post('https://summer-camp-server-weld.vercel.app/cart', cartItem)
                .then((res) => {
                    if (res.data.insertedId) {
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
            <Title title={"Extra classes"} subtitle={"Check Our Exclusive extra Classes"}></Title>
            <div className='bg-gray-100 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center md:py-11 gap-3'>
                {
                    extraClasses.map((item) => (

                        <div
                            key={item._id}
                            className={`card w-96 p-4 shadow-xl 
                                     ${item.availableSeats === 0 ? 'border-red-500 border shadow-red-500'
                                    : ' shadow-green-500 '
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
                                <p>Instructor: <span className='text-xl'>{item.instructor}</span></p>
                                <p>Available Seats: <span className='text-xl'>{item.availableSeats}</span></p>
                                <p>Total Enrolled: <span className='text-xl'>{item?.enrolled}</span></p>
                                <p>Price: <span className='text-xl text-orange-500'>${item.price}</span></p>
                                <div className="card-actions justify-end">
                                    {/** MAKE THE BUTTON DISABLE FOR ADMIN AND FOR INSTRUCTORS */}
                                    <button disabled={item.availableSeats === 0 || userRole === "Admin" || userRole === "Instructor"} onClick={() => handleCart(item)} className="btn btn-primary">Select Class</button>
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

export default ExtraClasses;