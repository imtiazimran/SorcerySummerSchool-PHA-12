/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useRef } from "react";
import { useTitle } from "../../Hooks/useTitle";
import { AuthContext } from "../../Authorization/AuthProvider";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import useClass from "../../Hooks/useClass";

const ManageClass = () => {
    useTitle("SSS | MANAGE CLASSES")

    const formRef = useRef(null);
    const [isDisabled, setIsDispabled] = useState(false)

    const [feedbackClass, setFeedbackClass] = useState([])

    const { isLoading, classes, refetch } = useClass()
    console.log(classes)
    if (isLoading) {
        return <div className='w-full  h-screen  flex justify-center items-center'><span className="loading loading-bars loading-lg"></span></div>;
    }


    // State to control the modal visibility
    // const { register, handleSubmit } = useForm(); // Form hook to handle form submission


    const onSubmit = (e) => {
        setIsDispabled(true)
       e.preventDefault()
       const adminMessage = e.target.feedback.value
       axios.post(`http://localhost:4214/class/${feedbackClass._id}/feedback`, 
       {adminMessage}
       )
       .then(res =>{
        refetch()
        if (res.data.modifiedCount > 0) {
            refetch()
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Feedback Sended',
                showConfirmButton: false,
                timer: 1500
            })
        }
        setIsDispabled(false)
        formRef.current.reset();
       })
       

    };

    const handleApprove = (item) => {
        axios.patch(`http://localhost:4214/class/approve/${item._id}`)
            .then(res => {
                window.my_modal_5.close()
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Class Approved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    const handleDeny = (item) => {
        axios.patch(`http://localhost:4214/class/deny/${item._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: 'top-center',
                        icon: 'warning',
                        title: 'Class Denied',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const handleUpdate = (id) => {
        const targetedClass = classes.find((item) => item._id === id);
        setFeedbackClass(targetedClass)
        window.my_modal_5.showModal()

    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr className="text-xl bg-blue-600 text-white">
                        <th>
                            #
                        </th>
                        <th>Class Image</th>
                        <th>Class Info</th>
                        <th>Instructor Info</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                {/* row 1 */}
                <tbody>
                    {
                        classes.filter((item) => item.status).map((item, i) =>
                            <tr key={item._id}>
                                <th>
                                    {i + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">Available Seat: {item.availableSeats}</span>
                                </td>
                                <td>
                                    {item.instructorName}
                                    <br />
                                    <span className="badge badge-ghost badge-sm"> Email: {item.instructorEmail}</span>
                                </td>
                                <td>${item.price}</td>
                                <td className="text-center">{item.status}</td>

                                {/** TODO: make the buttons dynamic 1 */}
                                <th>
                                    <button disabled={item.status === "approved" || item.status === "denied"} id="update-class" className="btn btn-primary text-white btn-sm text-center" onClick={() => handleApprove(item)}>Approve</button>
                                </th>
                                <th>
                                    <button disabled={item.status === "approved" || item.status === "denied"} id="deny-class" className="btn btn-error text-white btn-sm text-center" onClick={() => handleDeny(item)}>Deny</button>

                                </th>
                                <th>
                                    <button className="btn btn-success btn-sm text-center" onClick={() => handleUpdate(item._id)}>Feedback</button>
                                </th>
                            </tr>

                        )
                    }
                </tbody>
                {/* foot */}
                {
                    classes.length > 10 &&
                    <tfoot>
                        <tr className="bg-red-600 text-white text-xl">
                            <th>
                                #
                            </th>
                            <th>Class Image</th>
                            <th>Class Info</th>
                            <th>Instructor Info</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tfoot>
                }

            </table>


            <dialog method="dialog" id="my_modal_5" className="modal modal-bottom sm:modal-middle rounded">
                <form ref={formRef} onSubmit={onSubmit} className="w-2/4 mx-auto p-5 bg-white rounded shadow-xl">
                    
                    <textarea name="feedback" className="textarea w-full textarea-primary" placeholder="Write Your Feedback"></textarea>
                    <br />
                    <button disabled={isDisabled} className='btn btn-primary text-white w-full' type="submit">{
                        isDisabled ? <span className="loading loading-infinity loading-lg"></span>
                            : "Send Feedback"
                    }</button>

                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <span onClick={() => window.my_modal_5.close()} className="btn">Close</span>
                    </div>
                </form>
            </dialog>


        </div>
    );
};

export default ManageClass;