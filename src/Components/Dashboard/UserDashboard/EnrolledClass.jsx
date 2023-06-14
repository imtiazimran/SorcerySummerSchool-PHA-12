
import axios from 'axios';
import { useTitle } from '../../Hooks/useTitle';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../Authorization/AuthProvider';

const EnrolledClass = () => {
    useTitle("SSS |  ENROLLED CLASS")

    const {user} = useContext(AuthContext)

    const { isLoading, isError, data: paidClass = [], error } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:4214/payment/${user.email}`);
            console.log(res.data)
            return res.data;
        },
    });

    const totalExpence = paidClass.reduce((sum, item)=> sum + item.price, 0)

    if (isLoading) {
        return <div className='w-full  h-screen  flex justify-center items-center'><span className="loading loading-bars loading-lg"></span></div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div>
            <table className="table">
                {/* head */}
                <thead>
                    <tr className="text-xl text-center bg-blue-600 text-white">
                        <th>
                            #
                        </th>
                        <th>Item Names</th>
                        <th>Transcation ID</th>
                        <th>Transcation Email</th>
                        <th>Price</th>
                        <th>Enrollment Date</th>
                    </tr>
                </thead>
                {/* row 1 */}
                <tbody>
                    {
                        paidClass.map((item, i) =>
                            <tr className='text-center' key={item._id}>
                                <th>
                                    {i + 1}
                                </th>
                                <td>
                                    <div className="flex flex-col">
                                        {
                                            item.itemNames.map((name, i) => <h1 className='text-left' key={i}>{i + 1}: {name}</h1>)
                                        }
                                    </div>
                                </td>
                                <td>
                                    {
                                        item.transcationId
                                    }
                                </td>
                                <td>
                                    {
                                        item.email
                                    }
                                </td>
                                <td>${item.price}</td>
                                <td className="text-center"> {formatDate(item.data)}</td>


                            </tr>

                        )
                    }
                </tbody>
                {/* foot */}
                    <tfoot>
                        <tr className="bg-red-600 text-white text-center text-xl">
                            <th>
                                #
                            </th>
                            <th>Items</th>
                            <th>T-ID</th>
                            <th>Total Expence:</th>
                            <th>${totalExpence}</th>
                            <th>Date Of Enroll</th>
                        </tr>
                    </tfoot>

            </table>
        </div>
    );
};

export default EnrolledClass;