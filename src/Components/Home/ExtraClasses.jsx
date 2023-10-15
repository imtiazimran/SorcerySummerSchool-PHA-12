import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Title from '../Shared/Title';
import useUserRole from '../Hooks/useUserRole';

const ExtraClasses = () => {
    const [extraClasses, setExtraClasses] = useState([])

    const {userRole} = useUserRole()

    useEffect(() => {
        axios.get("https://summer-camp-server-weld.vercel.app/extraClasses")
            .then((res) => {
                setExtraClasses(res.data);
            })
            .catch((error) => {
                console.error("Error fetching reviews: ", error);
            });
    }, []);
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