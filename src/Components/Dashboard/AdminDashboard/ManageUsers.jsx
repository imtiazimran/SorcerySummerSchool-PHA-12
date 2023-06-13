import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ManageUsers = () => {

    const { isLoading, isError, data: users = [], error } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axios.get('http://localhost:4214/user')
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
                    <tr className="text-xl text-center bg-blue-600 text-white">
                        <th>
                            #
                        </th>
                        <th>User Image</th>
                        <th>User Info</th>
                        <th>Role</th>
                        <th className="text-green-400">Total Users:</th>
                        <th className="text-green-400">{users.length}</th>
                    </tr>
                </thead>
                {/* row 1 */}
                <tbody>
                    {
                        users.map((item, i) =>
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
                                    <span className="badge badge-ghost badge-sm">Email: {item.email}</span>
                                </td>
                                <td>Student</td>

                                {/** TODO: make the buttons dynamic 1 */}
                                <th>
                                    <button className="btn btn-success btn-sm text-center">Make Instructor</button>
                                </th>
                                <th>
                                    <button className="btn btn-primary text-white btn-sm text-center"> Make Admin</button>
                                </th>
                            </tr>

                        )
                    }
                </tbody>
                {/* foot */}
                {
                    users.length > 10 &&
                    <tfoot>
                        <tr className="bg-red-600 text-white text-xl">
                            <th></th>
                            <th>User Image</th>
                            <th>User Info</th>
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

export default ManageUsers;