
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Title from '../Shared/Title';

const PopulerClass = () => {
    const { isLoading, isError, data: populerClass = [], error } = useQuery({
        queryKey: ['populerClass'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:4214/populerClass');
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
            <Title title={"popular classes"} subtitle={"so much to learn but we have the best classes among all, see our popular classes"}></Title>
            <div className='bg-gray-100 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center md:py-11 gap-3'>
                {populerClass.map((item) => (

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
                            <p>{item.tutorialDescription}</p>
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

export default PopulerClass;
