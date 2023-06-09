
import useClass from '../Hooks/useClass';
import Title from '../Shared/Title';

const Classes = () => {
    const  [isLoading, isError, classes, error] = useClass()

    if (isLoading) {
        return <div className='w-full  h-screen  flex justify-center items-center'><span className="loading loading-bars loading-lg"></span></div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }


    return (
        <div>
            <Title title={"popular classes"} subtitle={"so much to learn but we have the best classes among all, see our popular classes"}></Title>
            <div className='bg-gray-100 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center md:py-11 gap-3'>
                {classes.map((item) => (

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
                            <h2 className="card-title">{item.name}!</h2>
                            <p>Details: {item.tutorialDescription}</p>
                            <p>Instructor: <span className='text-xl'>{item.instructorName}</span></p>
                            <p>Available Seats: <span className='text-xl'>{item.availableSeats}</span></p>
                            <p>Price: <span className='text-xl text-orange-500'>${item.price}</span></p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Add To Cart</button>
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

export default Classes;