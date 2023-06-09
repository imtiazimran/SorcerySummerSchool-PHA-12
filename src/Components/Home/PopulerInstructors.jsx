
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Title from '../Shared/Title';

const PopulerInstructors = () => {
    const { isLoading, isError, data: PopulerInstructors = [], error } = useQuery({
        queryKey: ['Instructors'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:4214/instructors');
            console.log(res);
            return res.data;
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <Title title={"popular instructors"} subtitle={"get the chance to learn from our popular instructors"}></Title>
            <div className='bg-red-100 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center px-4 md:py-11 gap-3 '>
                {PopulerInstructors.map((item) => (

                    <div key={item._id} className="card w-96 p-4 shadow-xl">
                        <figure>
                            <div className='h-[250px]'>
                                <img
                                    className='w-full h-full'
                                    src={item.image}
                                />
                            </div>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-2xl">{item.name}!</h2>
                            <p className='text-stone-700'>Specialty:  <span className='text-xl text-slate-700 font-semibold'>{item.specialty}</span></p>
                            <p className='text-stone-700'>Number Of Student: <span className='text-xl text-slate-700 font-semibold'>{item.numberOfStudents}</span> </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopulerInstructors;
