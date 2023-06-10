
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useClass = () => {
    const { isLoading, isError, data: classes = [], error, refetch } = useQuery({
        queryKey: ['populerClass'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:4214/populerClass');
            return res.data;
        },
    });
    return [isLoading, isError, classes, error, refetch] 
};

export default useClass;