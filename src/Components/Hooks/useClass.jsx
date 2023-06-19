
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useClass = () => {
    const accessToken = localStorage.getItem("access-token");
    
    const { isLoading, isError, data: classes = [], error, refetch } = useQuery({
        queryKey: ['populerClass'],
        queryFn: async () => {
            const res = await axios.get('https://summer-camp-server-weld.vercel.app/populerClass',{
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                  }
            });
            return res.data;
        },
    });
    return {isLoading, isError, classes, error, refetch} 
};

export default useClass;