/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from "react";
import { useTitle } from "../../Hooks/useTitle";
import { AuthContext } from "../../Authorization/AuthProvider";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import useClass from "../../Hooks/useClass";

const imgHostingApi = import.meta.env.VITE_updateImg_api
const ManageClass = () => {
    useTitle("SSS | MANAGE CLASSES")
    const { user } = useContext(AuthContext)
    const [isDisabled, setIsDispabled] = useState(false)

    const imgHostingLink = `https://api.imgbb.com/1/upload?key=${imgHostingApi}`

    const [classToUpdate, setClassToUpdate] = useState([])

   const {isLoading,  classes,  refetch} = useClass()
   console.log(classes)
    if (isLoading) {
        return <div className='w-full  h-screen  flex justify-center items-center'><span className="loading loading-bars loading-lg"></span></div>;
    }

   
    // State to control the modal visibility
    // const { register, handleSubmit } = useForm(); // Form hook to handle form submission


    const onSubmit = (e) => {
        setIsDispabled(true)
        e.preventDefault()
        const form = e.target;
        const name = form.className.value;
        const price = form.price.value;
        const seats = form.availableSeats.value
        const details = form.details.value
        const classImg = form.ClassImg.files[0];
console.log("fanction is hitting")
        const formData = new FormData()
        formData.append("image", classImg)
        fetch(imgHostingLink, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgRes => {
                if (imgRes.success) {
                    const imgURL = imgRes.data.display_url;
                    const updatedValue = {
                        name: name,
                        instructorName: user.displayName,
                        instructorEmail: user.email,
                        availableSeats: parseFloat(seats),
                        price: price,
                        details,
                        image: imgURL,
                        status: "pending",
                    }
                    axios.patch(`http://localhost:4214/update-class/${classToUpdate._id}`, updatedValue)
                        .then(res =>{
                            setIsDispabled(false)
                            if(res.data.modifiedCount>0){
                                // TODO: form reset korte hobe
                                window.my_modal_5.close()
                                refetch()
                                Swal.fire({
                                    position: 'top-center',
                                    icon: 'success',
                                    title: 'Your Class Is Updated',
                                    showConfirmButton: false,
                                    timer: 1500
                                  })
                            }
                        })
                }
            })


    };

    const handleUpdate = (id) => {
        const targetedClass = classes.find((item) => item._id === id);
        setClassToUpdate(targetedClass)
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
                        <th>Price</th>
                        <th>Total Student</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                {/* row 1 */}
                <tbody>
                    {
                        classes.map((item, i) =>
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
                                <td>${item.price}</td>
                                <td className="text-center">{item.enrolled}</td>
                                <td className="text-center">{item.status}</td>

                                {/** TODO: make the buttons dynamic 1 */}
                                <th>
                                    <button className="btn btn-success btn-sm text-center">Feedback</button>
                                </th>
                                <th>
                                    <button id="update-class" className="btn btn-primary text-white btn-sm text-center" onClick={() => handleUpdate(item._id)}>Updata Class</button>
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
                            <th></th>
                            <th>Class Image</th>
                            <th>Class Info</th>
                            <th>Price</th>
                            <th>Current Student</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tfoot>
                }

            </table>


            <dialog method="dialog" id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <form onSubmit={onSubmit} className="w-2/4 mx-auto p-5 bg-white rounded shadow-xl">
                    <div className='md:flex gap-4'>
                        <div className="mb-4 md:w-1/2">
                            <label className="block mb-2 font-bold text-gray-700" htmlFor="className">
                                Class Name
                            </label>
                            <input
                                className="w-full px-3 py-2 border  input-bordered input-primary  rounded-lg focus:outline-none focus:border-blue-500"
                                type="text"
                                id="className"
                                name="className"
                                defaultValue={classToUpdate.name}
                            />
                        </div>

                        <div className="mb-4 md:w-1/2">
                            <label className="block mb-2 font-bold text-gray-700" htmlFor="classImg">
                                Class Image
                            </label>
                            <input
                                className="w-full px-3 py-2 border  input-bordered input-primary  rounded-lg focus:outline-none focus:border-blue-500"
                                type="file"
                                id="classImg"
                                name="ClassImg"
                                required
                            />
                        </div>

                    </div>

                    <div className="md:flex gap-4">
                        <div className="mb-4 md:w-1/2">
                            <label className="block mb-2 font-bold text-gray-700" htmlFor="instructorName">
                                Instructor Name
                            </label>
                            <input
                                defaultValue={user.displayName}
                                readOnly
                                className="w-full px-3 py-2 border  input-bordered input-primary  rounded-lg focus:outline-none focus:border-blue-500"
                                type="text"
                                id="instructorName"

                            />
                        </div>

                        <div className="mb-4 md:w-1/2">
                            <label className="block mb-2 font-bold text-gray-700" htmlFor="instructorEmail">
                                Instructor Email
                            </label>
                            <input
                                defaultValue={user.email}
                                readOnly
                                className="w-full px-3 py-2 border  input-bordered input-primary  rounded-lg focus:outline-none focus:border-blue-500"
                                type="email"
                                id="instructorEmail"
                            />
                        </div>

                    </div>

                    <div className="md:flex gap-4">

                        <div className="mb-4 md:w-1/2">
                            <label className="block mb-2 font-bold text-gray-700" htmlFor="availableSeat">
                                Available Seat
                            </label>
                            <input
                                className="w-full px-3 py-2 border  input-bordered input-primary  rounded-lg focus:outline-none focus:border-blue-500"
                                type="number"
                                id="availableSeat"
                                name="availableSeats"
                                defaultValue={classToUpdate.availableSeats}
                            />
                        </div>

                        <div className="mb-4 md:w-1/2">
                            <label className="block mb-2 font-bold text-gray-700" htmlFor="price">
                                Price
                            </label>
                            <input
                                className="w-full px-3 py-2 border  input-bordered input-primary  rounded-lg focus:outline-none focus:border-blue-500"
                                type="number"
                                id="price"
                                name="price"
                                defaultValue={classToUpdate.price}
                            />
                        </div>
                    </div>
                    <textarea name="details" className="textarea w-full textarea-primary" placeholder="Details About Course"></textarea>
                    <br />
                    <button disabled={isDisabled} className='btn btn-primary text-white w-full' type="submit">{
                        isDisabled ? <span className="loading loading-infinity loading-lg"></span>
                        : "Submit Update"
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