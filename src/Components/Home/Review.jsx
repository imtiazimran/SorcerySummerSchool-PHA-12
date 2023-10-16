import React, { useRef, useState, useEffect } from 'react';
import Title from '../Shared/Title';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../Authorization/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';

const Review = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset } = useForm();
    const closeModal = useRef(null);
    const [loading, setLoading] = useState(false)   
    
    // Add state to store the review data
    const [reviews, setReviews] = useState([]);
    const [currentReviewIndex, setCurrentReviewIndex] = useState(1);
    // Fetch the review data from the API
    useEffect(() => {
        axios.get("https://summer-camp-server-weld.vercel.app/reviews")
            .then((res) => {
                setReviews(res.data);
            })
            .catch((error) => {
                console.error("Error fetching reviews: ", error);
            });
    }, []);


    const onSubmit = (data) => {
        setLoading(true)
        const review = {
            ...data,
            rating: parseInt(data.rating),
            user: user.email,
        };
        {
            user ? 
            axios.post("https://summer-camp-server-weld.vercel.app/review", review)
                .then((res) => {
                    if (res.data.insertedId) {
                        setLoading(false)
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Review Submitted',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        reset()
                    } else {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'error',
                            title: 'Error While Posting Review',
                            showConfirmButton: "OK",
                        });
                    }
                    handleCloseModal();
                })
                :
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'Please Log In to Add Review',
                    showConfirmButton: "OK",
                });
        } 
    };

    const handleCloseModal = () => {
        if (closeModal.current) {
            closeModal.current.close();
        }
    };
    return (
        <div>
            <Title title={"Review"} subtitle={"See the reviews from our previous students"} />
            <div className='w-1/5 mx-auto my-5'>
                <button onClick={() => document.getElementById('addReviewModal').showModal()} className='btn btn-outline'>Add Review</button>
            </div>

            {/* Render review cards dynamically */}
            {reviews.length > 0 && (
                <div className="carousel w-full mx-auto">
                    <div className="carousel w-full mx-auto">
                        {reviews.map((review, index) => (
                            <div
                                key={review._id}
                                id={`slide${index}`}
                                className={`carousel-item justify-center py-10 relative w-full ${currentReviewIndex === index ? 'active' : ''}`}
                            >
                                <div className="card w-3/5 mx-auto card-side bg-base-100 shadow-xl">

                                    <div className="card-body">
                                        <h2 className="card-title">{review.name}</h2>
                                        <p>{review.review}</p>
                                        <div className="rating">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <input
                                                    key={i}
                                                    type="radio"
                                                    name={`rating-${index}`}
                                                    className="mask mask-star"
                                                    checked={i + 1 === parseInt(review.rating, 10)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a
                                        onClick={() => setCurrentReviewIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length)}
                                        href={`#slide${(index - 1 + reviews.length) % reviews.length}`}
                                        className="btn btn-circle"
                                    >
                                        ❮
                                    </a>
                                    <a
                                        onClick={() => setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length)}
                                        href={`#slide${(index + 1) % reviews.length}`}
                                        className="btn btn-circle"
                                    >
                                        ❯
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            )}

            <dialog ref={closeModal} id="addReviewModal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className="modal-action">
                        <button onClick={handleCloseModal} className="btn btn-sm btn-outline absolute right-2 top-2">Close</button>
                        <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
                            <input required {...register('name')} type="text" placeholder="Your Name" className="input input-bordered w-full max-w-xs" />
                            <textarea required {...register('review')} className="textarea textarea-bordered w-4/5 my-5" placeholder="Your Review"></textarea>
                            <select required {...register('rating')} className="select select-bordered w-full max-w-xs block">
                                <option disabled selected>Ratings</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                            <div className='flex gap-3 my-4'>
                                <button disabled={loading} className="btn">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Review;
