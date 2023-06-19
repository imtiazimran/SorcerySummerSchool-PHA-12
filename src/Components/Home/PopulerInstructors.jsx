
import useInstructors from '../Hooks/useInstructors';
import Title from '../Shared/Title';

const PopulerInstructors = () => {
   
    const {isLoading, isError, instructors, error} = useInstructors()

    if (isLoading) {
        return <div className='w-full  h-screen  flex justify-center items-center'><span className="loading loading-bars loading-lg"></span></div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    const PopulerInstructors = instructors.slice(0, 6);

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
