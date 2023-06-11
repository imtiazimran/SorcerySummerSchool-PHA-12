import { useContext } from "react";
import { useTitle } from "../../Hooks/useTitle";
import { AuthContext } from "../../Authorization/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const MyClass = () => {
    useTitle("SSS | SELECTED CLASSES")
    const { user } = useContext(AuthContext)

    const { isLoading, isError, data: myClass = [], error, refetch } = useQuery({
        queryKey: ["myClass"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:4214/addedClass/${user.email}`)
            refetch()
            return res.data
        }
    })
    if (isLoading) {
        return <div className='w-full  h-screen  flex justify-center items-center'><span className="loading loading-bars loading-lg"></span></div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
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
                        myClass.map((item, i) =>
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
                                <td className="text-center">{item.currentStudent}</td>
                                <td className="text-center">Pending{}</td>
                                <th>
                                    <button className="btn btn-success btn-sm text-center">Feedback</button>
                                </th>
                                <th>
                                    <button className="btn btn-primary text-white btn-sm text-center">Updata Class</button>
                                </th>
                            </tr>

                        )
                    }
                </tbody>
                {/* foot */}
                {
                    myClass.length > 10 &&
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
        </div>
    );
};

export default MyClass;