import { useContext } from "react";
import { AuthContext } from "../../Authorization/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";


const SelectedClass = () => {
    const { user } = useContext(AuthContext)

    const { isLoading, isError, data: cart = [], error, refetch } = useQuery({
        queryKey: ["cart"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:4214/cart?email=${user.email}`)
            return res.data
        }
    })

    if (isLoading) {
        return <div className='w-full  h-screen  flex justify-center items-center'><span className="loading loading-bars loading-lg"></span></div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    const handleDelete = (id) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`http://localhost:4214/cart/${id}`)
              .then(data => {
                if (data.data.deletedCount > 0) {
                    refetch()
                }
              });
      
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
          }
        });
      };



const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)
return (
    <div>
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="text-2xl bg-blue-600 text-white rounded">
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Course Name</th>
                            <th>Instructor Name</th>
                            <th>Price</th>
                            <th>
                                <button className="btn btn-circle">PAY</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            cart.map((item, i) => <tr key={item._id}>
                                <th>
                                    {i + 1}
                                </th>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item.instructor}
                                </td>
                                <td>{item.price}</td>
                                <th>
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-ghost bg-red-700 text-white hover:bg-red-900"><FaTrashAlt></FaTrashAlt> </button>
                                </th>
                            </tr>

                            )
                        }
                    </tbody>
                    <tfoot>
                        <tr className="border rounded bg-red-600 text-white">
                            <th></th>
                            <th></th>
                            <th className="text-xl ">Total:</th>
                            <th className="text-xl">${total}</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
);
};

export default SelectedClass;